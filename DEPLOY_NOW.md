# Deploy to Vercel in 3 Minutes

## Quick Start (Choose One)

### 🚀 Fastest: One-Click Deploy
Click this button:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cod3blackag3ncy/cod3black.ai)

Then skip to **Step 2: Add Environment Variables** below.

---

### Manual Deploy (Slower but More Control)

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy: Fix React types and vercel.json schema"
git push origin main
```

#### Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Select your GitHub repo
3. Click "Import"

#### Step 3: Add Environment Variables

**Choose ONE AI Provider:**

**OpenAI (Recommended for Production):**
```
NEXT_PUBLIC_AI_PROVIDER = openai
NEXT_PUBLIC_AI_MODEL = gpt-4-turbo
OPENAI_API_KEY = sk_... (from https://platform.openai.com/api-keys)
```

**Anthropic (Good alternative):**
```
NEXT_PUBLIC_AI_PROVIDER = anthropic
NEXT_PUBLIC_AI_MODEL = claude-3-opus-20240229
ANTHROPIC_API_KEY = sk_ant_... (from https://console.anthropic.com/keys)
```

**Google Gemini (Cheapest):**
```
NEXT_PUBLIC_AI_PROVIDER = gemini
NEXT_PUBLIC_AI_MODEL = gemini-pro
GOOGLE_API_KEY = ... (from https://makersuite.google.com/app/apikey)
```

**Optional (for consultation emails):**
```
GMAIL_EMAIL = your-email@gmail.com
GMAIL_APP_PASSWORD = ... (from https://myaccount.google.com/apppasswords)
```

#### Step 4: Deploy
Click **Deploy** button in Vercel dashboard.

Wait 5-10 minutes for build to complete.

---

## ✓ Test It Works

Once deployed, visit your site at `your-project.vercel.app` and:

1. **Home page** — Should load
2. **Go to `/demo`** — Try generating a caption
   - Enter any topic
   - Select a style
   - Click "Generate Caption"
   - Should show real AI output + latency/tokens/cost
3. **Go to `/consultation`** — Try submitting a project plan
   - Enter a plan description
   - Click "Get AI Analysis"
   - Should show real analysis

If both work with real data (not errors), deployment succeeded. ✓

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check vercel.json is valid JSON (jq . vercel.json) |
| Demo shows error | Verify API key in Vercel Environment Variables |
| Demo is slow | Normal — first call takes 2-4 seconds |
| High costs | Switch to gpt-3.5-turbo or gemini-pro |

See **DEPLOYMENT_GUIDE.md** for full troubleshooting.

---

## 📊 Cost Estimate

Per demo API call:
- **OpenAI GPT-4**: ~$0.004
- **Anthropic Claude**: ~$0.002
- **Google Gemini**: ~$0.0001

100 demo calls = $0.40 to $0.40 depending on provider.

Monitor costs in your AI provider's dashboard.

---

## 🔗 Useful Links

- **Deployment Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **What Was Fixed**: [FIXES_APPLIED.md](./FIXES_APPLIED.md)

---

**Status**: ✅ Ready to deploy

Your application is configured and ready for production. All dependencies are compatible, vercel.json passes schema validation, and the build succeeds.
