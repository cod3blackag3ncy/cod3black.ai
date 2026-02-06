/**
 * Rate Limiting for API Routes
 * 
 * Uses Upstash Redis for distributed rate limiting that works on Vercel serverless.
 * Falls back to in-memory rate limiting for local development.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// In-memory fallback for development (when Redis is not configured)
const inMemoryStore = new Map<string, { count: number; resetAt: number }>();

function getInMemoryRateLimit(identifier: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  const entry = inMemoryStore.get(key);
  
  if (!entry || entry.resetAt <= now) {
    inMemoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
  }
  
  if (entry.count >= limit) {
    return { success: false, limit, remaining: 0, reset: entry.resetAt };
  }
  
  entry.count += 1;
  return { success: true, limit, remaining: limit - entry.count, reset: entry.resetAt };
}

// Create Upstash rate limiter if credentials are available
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 requests per minute
    analytics: true,
    prefix: 'c3bai:ratelimit',
  });
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  // Use Upstash if configured, otherwise fall back to in-memory
  if (ratelimit) {
    const result = await ratelimit.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  }
  
  // Fallback for local development
  return getInMemoryRateLimit(identifier, 5, 60 * 1000);
}

export function isRateLimitConfigured(): boolean {
  return ratelimit !== null;
}
