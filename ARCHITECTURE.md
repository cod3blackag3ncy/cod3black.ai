# Architecture & Design Decisions

## Overview

This project is built around three core principles:

1. **Real Production Code** - Not tutorial code. Real error handling, validation, cost tracking.
2. **Provider Agnostic** - Swap OpenAI, Anthropic, Gemini without changing app logic.
3. **Cost Aware** - Every API call tracks tokens, cost, and latency.

## Component Breakdown

```
User Request
    ↓
Next.js App Router
    ↓
┌─────────────────┴──────────────────┐
│                                    │
Static Pages          API Routes
(Home, Capabilities,  (/api/demo)
Projects)                  ↓
                  Input Validation
                          ↓
                  Provider Routing
                          ↓
                  ┌────────┴────────┬────────┐
                  ↓                 ↓        ↓
              OpenAI          Anthropic   Gemini
                  ↓                 ↓        ↓
                  └────────┬────────┴────────┘
                           ↓
                  Schema Validation
                  (Zod)
                           ↓
                  Response + Metadata
```

## Key Files

### `lib/ai.ts` - Core AI Interface

Provides a unified interface for all AI providers:

```typescript
// Unified interface
async function inference(request: AIInferenceRequest): Promise<AIInferenceResponse>

// Tracks metadata
{
  content: string,
  tokensUsed: number,
  cost: number,
  latencyMs: number,
  provider: "openai" | "anthropic" | "gemini"
}
```

**Why this pattern:**
- Provider swap doesn't require app changes
- Cost tracking is centralized
- Latency measurement is consistent

### `app/api/demo/route.ts` - Demo Endpoint

Demonstrates a production API pattern:

```
1. Parse + validate input (Zod)
2. Build prompt with system context
3. Call AI provider
4. Parse response
5. Validate against schema
6. Return typed response + metadata
```

**Error handling:**
- Missing API key → 503 (Service Unavailable)
- Invalid input → 400 (Bad Request)
- Schema mismatch → 500 (Internal Error)

### `app/demo/page.tsx` - Interactive Demo

Client component that:
1. Accepts user input
2. Calls `/api/demo` endpoint
3. Displays structured response
4. Shows real metrics (latency, cost, tokens)

**Why client component:**
- Real-time interactivity
- Form state management
- Immediate feedback

## Adding a New Demo Endpoint

### Step 1: Create a new schema (`lib/schemas.ts`)

```typescript
import { z } from "zod";

export const SentimentAnalysisSchema = z.object({
  sentiment: z.enum(["positive", "negative", "neutral"]),
  score: z.number().min(0).max(1),
  explanation: z.string(),
});
```

### Step 2: Create API route (`app/api/sentiment/route.ts`)

```typescript
import { NextRequest, NextResponse } from "next/server";
import { inference, validateStructuredOutput } from "@/lib/ai";
import { SentimentAnalysisSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  const response = await inference({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: "Analyze sentiment and respond with JSON matching the schema.",
      },
      { role: "user", content: text },
    ],
    responseFormat: "json",
  });

  const parsed = validateStructuredOutput(response.content, SentimentAnalysisSchema);

  return NextResponse.json({
    success: true,
    data: parsed,
    metadata: {
      tokensUsed: response.tokensUsed,
      cost: response.cost,
      latencyMs: response.latencyMs,
    },
  });
}
```

### Step 3: Create UI page (`app/sentiment/page.tsx`)

```typescript
"use client";
import { useState } from "react";

export default function SentimentDemo() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/sentiment", {
      method: "POST",
      body: JSON.stringify({ text: input }),
    });
    setResponse(await res.json());
  }

  return (
    // UI code here
  );
}
```

## Switching Providers

### Option 1: Environment Variables

In Vercel dashboard:
```env
NEXT_PUBLIC_AI_PROVIDER=anthropic
NEXT_PUBLIC_AI_MODEL=claude-3-opus-20240229
ANTHROPIC_API_KEY=sk_ant_...
```

No code changes needed.

### Option 2: Runtime Selection

Modify `lib/ai.ts`:

```typescript
export function getDefaultProvider(): AIProvider {
  // Check user preference, feature flag, or cost optimization
  if (usesCheaperModel()) return "gpt-3.5";
  if (needsHighQuality()) return "gpt-4";
  return (process.env.NEXT_PUBLIC_AI_PROVIDER as AIProvider) || "openai";
}
```

## Cost Optimization Patterns

### Pattern 1: Model Selection by Use Case

```typescript
function selectModel(useCase: "fast" | "accurate" | "cheap") {
  switch (useCase) {
    case "fast": return "gpt-3.5-turbo"; // $0.0015/1K tokens
    case "accurate": return "gpt-4-turbo"; // $0.03/1K tokens
    case "cheap": return "claude-3-haiku"; // $0.008/1K tokens
  }
}
```

### Pattern 2: Prompt Optimization

```typescript
// Wrong: Too many tokens
const prompt = `The user asked: "${userInput}". Please analyze this deeply...`;

// Right: Minimal, explicit
const prompt = `Analyze: "${userInput.slice(0, 100)}"\nFormat: JSON`;
```

### Pattern 3: Caching Identical Requests

```typescript
const cache = new Map();

function getCacheKey(prompt: string): string {
  return crypto.createHash("sha256").update(prompt).digest("hex");
}

async function inferenceWithCache(request) {
  const key = getCacheKey(JSON.stringify(request));
  if (cache.has(key)) return cache.get(key);

  const result = await inference(request);
  cache.set(key, result);
  return result;
}
```

## Error Handling Patterns

### Pattern 1: Provider Fallback

```typescript
async function inferenceWithFallback(request) {
  try {
    return await callOpenAI(request);
  } catch (error) {
    console.log("OpenAI failed, trying Anthropic");
    return await callAnthropic(request);
  }
}
```

### Pattern 2: Graceful Degradation

```typescript
async function inferenceWithTimeout(request, timeoutMs = 5000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), timeoutMs)
  );

  try {
    return await Promise.race([inference(request), timeout]);
  } catch {
    return defaultResponse(); // Fallback response
  }
}
```

### Pattern 3: Retry with Backoff

```typescript
async function inferenceWithRetry(request, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await inference(request);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
```

## Deployment Architecture

### Development
```
Local machine
    ↓
npm run dev
    ↓
http://localhost:3000
```

### Production
```
GitHub repository
    ↓
git push
    ↓
Vercel webhook
    ↓
npm run build
    ↓
Deploy to edge network
    ↓
https://your-domain.com
```

## Monitoring & Observability

### What to Track

1. **Cost per request** - Sum of token costs
2. **Latency** - Time from request to response
3. **Error rate** - Failed requests / total requests
4. **Provider availability** - Which provider succeeded

### Implementation

```typescript
interface RequestMetrics {
  timestamp: Date;
  provider: string;
  model: string;
  tokensUsed: number;
  cost: number;
  latencyMs: number;
  success: boolean;
  errorMessage?: string;
}

async function logMetrics(metrics: RequestMetrics) {
  // Send to logging service
  // (DataDog, Sentry, custom database, etc.)
  console.log(metrics);
}
```

## Testing

### Test the API Locally

```bash
# Start server
npm run dev

# Test API endpoint
curl -X POST http://localhost:3000/api/demo \
  -H "Content-Type: application/json" \
  -d '{"topic": "test", "style": "casual"}'
```

### Test Schema Validation

```typescript
import { validateStructuredOutput, CaptionResponseSchema } from "@/lib/ai";

// This should pass
const valid = validateStructuredOutput(
  '{"caption": "Hello", "hashtags": [], "tone": "casual", "engagementScore": 50}',
  CaptionResponseSchema
);

// This should throw
try {
  const invalid = validateStructuredOutput(
    '{"caption": "Hello"}', // Missing required fields
    CaptionResponseSchema
  );
} catch (e) {
  console.log("Validation caught the error:", e.message);
}
```

## Next Steps

1. **Add caching** for frequently-used prompts
2. **Implement rate limiting** on API endpoints
3. **Add request logging** to a database
4. **Set up monitoring alerts** (cost spikes, error rates)
5. **Add more demo endpoints** (sentiment, classification, extraction)
6. **Implement user authentication** if needed
7. **Add API authentication** (API keys for third-party use)

---

This architecture is designed to scale from side project to production system without major refactoring.
