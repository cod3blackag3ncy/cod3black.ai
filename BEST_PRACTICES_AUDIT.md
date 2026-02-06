# C3BAI Best Practices Audit Report
**Date:** Feb 5, 2026  
**Site:** https://c3bai.vercel.app

---

## Summary

| Category | Status | Priority |
|----------|--------|----------|
| Security Headers | ⚠️ Incomplete | HIGH |
| API Security | ⚠️ Needs hardening | HIGH |
| PWA Manifest | ✅ Good | LOW |
| Service Worker | ✅ Good (v7 network-first) | DONE |
| Content Accuracy | ⚠️ Inconsistencies | MEDIUM |
| Code Quality | ⚠️ Minor issues | LOW |

---

## 1. Security Headers (HIGH PRIORITY)

### Current State
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: SAMEORIGIN
- ⚠️ X-XSS-Protection: 1; mode=block (deprecated, can be harmful)

### Missing Headers (Add to next.config.js)
```javascript
// Add these to your header blocks:
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains'
},
{
  key: 'Referrer-Policy',
  value: 'strict-origin-when-cross-origin'
},
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=(), payment=()'
},
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; frame-ancestors 'self'; upgrade-insecure-requests"
}
```

### Fix: X-XSS-Protection
Change from `'1; mode=block'` to `'0'` (deprecated header can cause issues)

### Missing: Static Asset Caching for Next.js
```javascript
{
  source: '/_next/static/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    }
  ]
}
```

---

## 2. API Security (/api/inquiry) (HIGH PRIORITY)

### Current State
- ✅ Rate limiting implemented
- ✅ Input sanitization (basic)
- ✅ Email validation
- ✅ Error handling

### Issues

#### A. In-Memory Rate Limiting Won't Work on Vercel
The `Map<string, RateLimitEntry>` is stored in memory but Vercel serverless functions don't share memory across instances. Each request may hit a different instance.

**Fix Options:**
1. Use Vercel KV or Upstash Redis for rate limiting
2. Use Vercel Firewall rate limiting (no code change)
3. Add Cloudflare Turnstile/hCaptcha for bot protection

#### B. HTML Email Injection Risk
User input is interpolated directly into HTML emails without proper escaping:
```typescript
// Current (vulnerable):
<strong>"${formData.projectName}"</strong>
href="${formData.website}"

// User could submit website as: javascript:alert(1)
// Or projectName with quotes to break HTML attributes
```

**Fix:**
```typescript
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeUrl(url: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    return parsed.href;
  } catch {
    return '';
  }
}
```

#### C. Missing Origin Validation
Add CSRF protection by checking Origin header:
```typescript
const origin = request.headers.get('origin');
const allowedOrigins = ['https://c3bai.vercel.app', 'http://localhost:3000'];
if (!origin || !allowedOrigins.includes(origin)) {
  return Response.json({ error: 'Invalid origin' }, { status: 403 });
}
```

#### D. Consider Adding Honeypot Field
Add a hidden field that bots will fill but humans won't:
```typescript
if (rawPayload.website2) { // honeypot field
  return Response.json({ success: true }); // silent fail for bots
}
```

---

## 3. PWA Manifest (LOW PRIORITY)

### Current State
- ✅ All required fields present
- ✅ Icons with proper purposes
- ✅ Screenshots for both form factors

### Recommended Additions
```json
{
  "id": "/",
  "lang": "en-US",
  "display_override": ["standalone", "minimal-ui"]
}
```

---

## 4. Content Accuracy Issues (MEDIUM PRIORITY)

### A. PROJECTS_DEEP_DIVE.md - Section Mismatch
**Line 162-228:** Section titled "Taste of Gratitude - Food Ordering System" but content describes a project management tool (Kanban boards, WebSockets, task management).

**Fix:** Either:
1. Rename section to match content (project management tool)
2. Replace content with actual food ordering system description

### B. Project Hours Discrepancy
User-provided hours vs. documented hours:

| Project | User Says | Docs Say | Discrepancy |
|---------|-----------|----------|-------------|
| Beltline Golf | 124 hrs | 80 hrs (~$10K) | 44 hrs |
| TradeAlerts | 13 hrs | 13 hrs | ✅ Match |
| Taste of Gratitude | 80 hrs | 120 hrs ($15K) | 40 hrs |
| Image-to-SVG | 26 hrs | 40 hrs ($5K) | 14 hrs |

**Recommendation:** Update docs to reflect actual hours worked.

---

## 5. Code Quality Issues (LOW PRIORITY)

### A. Docs Pages - fs.readFileSync
File: `app/docs/*/page.tsx`

**Issues:**
1. Synchronous file read blocks the event loop
2. No explicit runtime declaration
3. `<li>` elements rendered without parent `<ul>`

**Recommended Fix:**
```typescript
export const runtime = 'nodejs';
export const dynamic = 'force-static'; // since markdown doesn't change

// Use async read
import { readFile } from 'fs/promises';

export default async function Page() {
  const markdown = await readFile(filePath, 'utf8');
  // ...
}
```

---

## 6. What's Already Done Well ✅

1. **Privacy:** Phone number removed from public UI, only in post-submission emails
2. **Legal:** FAQ updated with correct license vs ownership language
3. **Service Worker v7:** Network-first for HTML ensures fresh content
4. **Caching Headers:** No-cache for HTML pages in next.config.js
5. **Rate Limiting:** Basic protection exists (needs hardening)
6. **Input Validation:** Required fields checked, email regex validation
7. **Error Handling:** Graceful failures with user-friendly messages

---

## Action Items (Priority Order)

### ✅ COMPLETED

- [x] Add missing security headers to next.config.js (HSTS, CSP, Referrer-Policy, Permissions-Policy)
- [x] Fix X-XSS-Protection to '0'
- [x] Add /_next/static caching header
- [x] Add HTML escaping for email templates (`escapeHtml()` function)
- [x] Add URL validation for href attributes (`sanitizeUrl()` function)
- [x] Fix PROJECTS_DEEP_DIVE.md content mismatch (Taste of Gratitude now describes food ordering)
- [x] Update project hours to match actuals (Beltline 124hrs, ToG 80hrs, Image-to-SVG 26hrs)
- [x] Add Origin validation to API route (CSRF protection)
- [x] Add honeypot fields for spam protection (website2, phone2)
- [x] Move rate limiting to Upstash Redis (with in-memory fallback for dev)
- [x] Convert docs pages to async with force-static
- [x] Use react-markdown for proper markdown rendering

### Setup Required: Upstash Redis

To enable distributed rate limiting on Vercel, add these environment variables:

1. Go to https://upstash.com and create a free Redis database
2. Copy the REST URL and Token
3. Add to Vercel Environment Variables:
   - `UPSTASH_REDIS_REST_URL` = your-redis-url
   - `UPSTASH_REDIS_REST_TOKEN` = your-redis-token

Without these, the rate limiter falls back to in-memory (works for dev, not production).

### Optional Future Improvements
- [ ] Add Cloudflare Turnstile for stronger bot protection
- [ ] Add PWA manifest enhancements (id, lang)
- [ ] Implement nonce-based CSP for stricter security

---

## Quick Wins Script

Run these changes to address the highest-priority security items immediately.

```bash
# After implementing the header changes, redeploy:
cd ~/c3bai
git add -A
git commit -m "security: add HSTS, CSP, Referrer-Policy headers"
git push
```
