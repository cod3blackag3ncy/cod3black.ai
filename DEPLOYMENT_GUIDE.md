# Deployment Guide

## Prerequisites

- GitHub account with repo access
- Vercel account (free tier works)
- At least one AI API key (OpenAI, Anthropic, or Google)

## Quick Deploy to Vercel

### Option 1: One-Click Deploy
Click the button below or visit: https://vercel.com/new/clone?repository-url=https://github.com/cod3blackag3ncy/cod3black.ai

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cod3blackag3ncy/cod3black.ai)

### Option 2: Manual Deploy

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Fix: Update React types and vercel.json schema"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Select your GitHub repo
   - Click "Import"

3. **Configure Environment Variables**
   
   In the Vercel dashboard, go to **Settings → Environment Variables** and add:

   **Required (choose one AI provider):**
   
   **For OpenAI:**
   ```
   NEXT_PUBLIC_AI_PROVIDER=openai
   NEXT_PUBLIC_AI_MODEL=gpt-4-turbo
   OPENAI_API_KEY=sk_your_openai_key_here
   ```

   **For Anthropic:**
   ```
   NEXT_PUBLIC_AI_PROVIDER=anthropic
   NEXT_PUBLIC_AI_MODEL=claude-3-opus-20240229
   ANTHROPIC_API_KEY=sk_ant_your_key_here
   ```

   **For Google Gemini:**
   ```
   NEXT_PUBLIC_AI_PROVIDER=gemini
   NEXT_PUBLIC_AI_MODEL=gemini-pro
   GOOGLE_API_KEY=your_google_key_here
   ```

   **Optional (for consultation email notifications):**
   ```
   GMAIL_EMAIL=your-email@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_app_password
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Site goes live at `your-project.vercel.app`

## Environment Variables Explained

### Public Variables (safe to expose)
- `NEXT_PUBLIC_AI_PROVIDER` — Which AI provider to use (openai, anthropic, gemini)
- `NEXT_PUBLIC_AI_MODEL` — Model name for that provider

### Secret Variables (keep private)
- `OPENAI_API_KEY` — OpenAI authentication
- `ANTHROPIC_API_KEY` — Anthropic authentication
- `GOOGLE_API_KEY` — Google authentication
- `GMAIL_EMAIL` — Email for notifications
- `GMAIL_APP_PASSWORD` — Gmail app password (NOT regular password)

## Getting API Keys

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Sign in / create account
3. Create new API key
4. Copy and paste into `OPENAI_API_KEY`

### Anthropic
1. Go to https://console.anthropic.com/keys
2. Create new API key
3. Copy and paste into `ANTHROPIC_API_KEY`

### Google Gemini
1. Go to https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy and paste into `GOOGLE_API_KEY`

### Gmail (for consultation emails)
1. Enable 2-factor authentication: https://myaccount.google.com/security
2. Go to https://myaccount.google.com/apppasswords
3. Create app password for "Mail" and "Windows Computer"
4. Copy the 16-character password
5. Use as `GMAIL_APP_PASSWORD`

## Deployment Checklist

- [ ] GitHub repo is public (or private with Vercel access)
- [ ] At least one AI API key obtained
- [ ] Environment variables set in Vercel dashboard
- [ ] Build succeeds in Vercel logs
- [ ] Demo page loads and accepts input
- [ ] Demo API call returns real data (with latency/tokens/cost)
- [ ] Consultation page loads and form submits

## Troubleshooting Deployment

### Build Fails with "env validation error"
- Ensure all env vars in `vercel.json` have `type: "string"`
- Check that variable names match exactly

### Demo page shows "AI API not configured"
- Verify API key is set in Vercel Environment Variables
- Ensure variable name matches: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GOOGLE_API_KEY`
- Redeploy after adding/changing variables

### Consultation emails not sending
- Gmail credentials are optional (system gracefully fails)
- If you want them, ensure both `GMAIL_EMAIL` and `GMAIL_APP_PASSWORD` are set
- Use app-specific password, NOT your Gmail password
- Check Vercel logs for email errors

### High API costs after deployment
- Every demo call costs ~$0.004 (GPT-4)
- Monitor usage in your AI provider's dashboard
- Consider switching to cheaper model (gpt-3.5-turbo: $0.0005)
- Add rate limiting in production if needed

## Post-Deployment

1. **Monitor costs**
   - OpenAI: https://platform.openai.com/usage/overview
   - Anthropic: https://console.anthropic.com/dashboard
   - Google: https://console.cloud.google.com/billing

2. **View logs**
   - Vercel: Dashboard → Project → Deployments → Logs
   - Real-time logs at `/function/route-name` tab

3. **Update your portfolio**
   - Change `cod3black.ai` domain references if needed
   - Update contact email in footer
   - Add your projects to `/projects` page

## Reverting to Local Development

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your API keys
npm run dev
```

Visit `http://localhost:3000` — runs locally with your keys.

## Custom Domain Setup

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Follow DNS instructions
4. CNAME or A record configuration (shown in dashboard)

## Next Steps

- Add more AI demos under `/app/api/`
- Customize `/capabilities` and `/projects` pages
- Set up analytics (Google Analytics, Vercel Analytics)
- Add your own case studies
- Consider caching common requests to reduce costs

---

**Questions?** Check TROUBLESHOOTING.md or EMAIL_SETUP.md for detailed guides.
