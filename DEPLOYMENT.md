# Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Easiest)

1. Click the button below (when on GitHub):
```
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cod3blackag3ncy/cod3black.ai&env=NEXT_PUBLIC_AI_PROVIDER,NEXT_PUBLIC_AI_MODEL,OPENAI_API_KEY&envDescription=AI%20configuration%20and%20API%20keys)
```

2. Vercel will ask for:
   - `NEXT_PUBLIC_AI_PROVIDER` - Set to `openai` (or your choice)
   - `NEXT_PUBLIC_AI_MODEL` - Set to `gpt-4-turbo`
   - `OPENAI_API_KEY` - Your OpenAI API key

3. Click deploy. Done.

### Option 2: Manual Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Paste: `https://github.com/cod3blackag3ncy/cod3black.ai`
4. Select Next.js as the framework (auto-detected)
5. Under "Environment Variables", add:
   ```
   NEXT_PUBLIC_AI_PROVIDER=openai
   NEXT_PUBLIC_AI_MODEL=gpt-4-turbo
   OPENAI_API_KEY=sk_your_key_here
   ```
6. Click "Deploy"

### Option 3: CLI Deploy

```bash
npm install -g vercel
vercel --prod
```

When prompted, add your environment variables:
- `NEXT_PUBLIC_AI_PROVIDER=openai`
- `NEXT_PUBLIC_AI_MODEL=gpt-4-turbo`
- `OPENAI_API_KEY=sk_your_key_here`

## Environment Variables

Required variables (add in Vercel dashboard):

```env
# Provider selection (required)
NEXT_PUBLIC_AI_PROVIDER=openai

# Model selection (required)
NEXT_PUBLIC_AI_MODEL=gpt-4-turbo

# API Keys (one of these required based on provider)
OPENAI_API_KEY=sk_your_key_here
# OR
ANTHROPIC_API_KEY=sk_ant_your_key_here
# OR
GOOGLE_API_KEY=your_google_key_here
```

## Getting API Keys

### OpenAI
1. Go to https://platform.openai.com
2. Click "API keys" in the sidebar
3. Create a new secret key
4. Copy and paste into `OPENAI_API_KEY`

### Anthropic
1. Go to https://console.anthropic.com
2. Click "API Keys"
3. Create a new API key
4. Copy and paste into `ANTHROPIC_API_KEY`

### Google Gemini
1. Go to https://makersuite.google.com/app/apikey
2. Create or select a project
3. Click "Create API Key"
4. Copy and paste into `GOOGLE_API_KEY`

## After Deployment

1. Vercel will provide a URL like `https://cod3black-ai.vercel.app`
2. Visit the home page to verify it's live
3. Go to `/demo` and test the live AI endpoint
4. Check that you see real latency and cost metrics

## Monitoring Costs

The demo endpoint logs real costs. Monitor your AI provider's dashboard:

- **OpenAI**: https://platform.openai.com/account/billing/overview
- **Anthropic**: https://console.anthropic.com/usage
- **Google**: https://console.cloud.google.com/billing

## Scaling Considerations

### For High Traffic

1. **Vercel automatically scales** serverless functions
2. Each function can handle ~100 concurrent requests
3. No additional setup needed for baseline traffic

### For Cost Control

1. Consider using GPT-3.5 instead of GPT-4 for lower costs
2. Set reasonable `maxTokens` limits in API requests
3. Monitor usage daily during initial launch

### For Ultra-Low Latency

Enable Vercel Edge Functions:
1. Modify `app/api/demo/route.ts` to export a runtime config
2. Add request caching for identical inputs
3. Use region-specific endpoints

## Custom Domain

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain (e.g., `ai.yourcompany.com`)
3. Update DNS records as instructed
4. HTTPS is automatic

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` → automatic deployment
- Every pull request → preview deployment
- Automatic rollback if build fails

## Troubleshooting

### "AI API not configured" error
Check that your API key is set in Vercel:
1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Verify the API key is there

### Slow responses
Check your API provider's status:
- OpenAI: https://status.openai.com
- Anthropic: https://status.anthropic.com
- Google: https://status.cloud.google.com

### Build fails
Run locally to debug:
```bash
npm install
npm run build
```

Check TypeScript errors:
```bash
npx tsc --noEmit
```

## Production Checklist

- [ ] API key is set in Vercel environment variables
- [ ] Domain is custom (not vercel.app) if using in production
- [ ] You've tested the `/demo` endpoint and it works
- [ ] You're monitoring API costs daily
- [ ] You have error notifications set up
- [ ] You've read the README for what this project is

## Support

If deployment fails, check:
1. Node.js version (must be 18+)
2. API key format (no extra spaces)
3. Vercel build logs for specific errors
4. GitHub repo is public (not private)

---

That's it. Your production AI portfolio is live.
