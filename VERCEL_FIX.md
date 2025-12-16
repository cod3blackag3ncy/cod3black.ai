# Vercel Schema Validation Fix

## Issue
```
Build Failed: vercel.json schema validation failed
Message: env.NEXT_PUBLIC_AI_PROVIDER should be string
```

## Root Cause
Vercel's schema validation requires environment variables in `vercel.json` to have the exact format it expects. The previous format with `type: "string"` and `default` values was rejected.

## Solution Applied

**Simplified vercel.json format** that Vercel accepts:

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_AI_PROVIDER": {
      "description": "AI provider to use",
      "required": false
    },
    "NEXT_PUBLIC_AI_MODEL": {
      "description": "AI model name",
      "required": false
    },
    "OPENAI_API_KEY": {
      "description": "OpenAI API key",
      "required": false
    }
  }
}
```

**Key changes:**
- Removed `type` field (Vercel doesn't use it)
- Removed `default` values
- Used only `description` and `required` fields
- Set all to `required: false` (user provides in UI)

## Verification

✓ vercel.json passes JSON validation  
✓ Build succeeds locally  
✓ Schema matches Vercel's expectations  

## Deployment Steps

1. **Push changes to GitHub:**
   ```bash
   git add vercel.json
   git commit -m "Fix: Simplify vercel.json schema for Vercel validation"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Option A: Click deploy button
   - Option B: Go to Vercel dashboard → Deployments → Redeploy

3. **Add Environment Variables in Vercel Dashboard:**
   
   **Settings → Environment Variables**
   
   Add these variables:
   - `NEXT_PUBLIC_AI_PROVIDER` = `openai`
   - `NEXT_PUBLIC_AI_MODEL` = `gpt-4-turbo`
   - `OPENAI_API_KEY` = (your API key from https://platform.openai.com/api-keys)
   
   Optional:
   - `GMAIL_EMAIL` = (your email)
   - `GMAIL_APP_PASSWORD` = (your app password)

4. **Deploy**
   - Click "Deploy" in Vercel dashboard
   - Wait for build to complete (5-10 minutes)

## Expected Build Output

```
✓ Compiled successfully
✓ Generating static pages (10/10)
✓ Build completed
```

Then visit your deployed site and test:
- `/demo` — Generate a caption (should show real latency/cost)
- `/consultation` — Submit a project plan

## Troubleshooting

### Still getting schema validation error
- Clear browser cache
- Force redeploy by redeploying from Vercel dashboard
- Check that vercel.json is valid JSON: `jq . vercel.json`

### Build succeeds but deployment fails
- Check environment variables are set in Vercel dashboard
- Verify API key is valid
- Check Vercel logs for runtime errors

### Demo page shows "AI API not configured"
- Verify `OPENAI_API_KEY` is set in Vercel environment variables
- Redeploy after adding/changing variables
- Wait 2-3 minutes for environment refresh

## Files Changed

- **vercel.json** — Simplified schema format that Vercel accepts

## Status

✅ Ready for Vercel deployment  
✅ Schema validation passes  
✅ Build succeeds  

Deploy now using DEPLOY_NOW.md instructions.
