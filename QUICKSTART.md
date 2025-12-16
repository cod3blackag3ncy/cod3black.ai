# Quick Start Guide

Get the Code3BlackAgency AI portfolio running in 5 minutes.

## Prerequisites

- Node.js 18+
- One AI API key (OpenAI, Anthropic, or Google Gemini)

## 1. Clone and Install

```bash
git clone https://github.com/cod3blackag3ncy/cod3black.ai.git
cd cod3black.ai
npm install
```

## 2. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

**For OpenAI:**
```env
NEXT_PUBLIC_AI_PROVIDER=openai
NEXT_PUBLIC_AI_MODEL=gpt-4-turbo
OPENAI_API_KEY=sk_your_key_here
```

**For Anthropic:**
```env
NEXT_PUBLIC_AI_PROVIDER=anthropic
NEXT_PUBLIC_AI_MODEL=claude-3-opus-20240229
ANTHROPIC_API_KEY=sk_ant_your_key_here
```

**For Google Gemini:**
```env
NEXT_PUBLIC_AI_PROVIDER=gemini
NEXT_PUBLIC_AI_MODEL=gemini-pro
GOOGLE_API_KEY=your_key_here
```

## 3. Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 4. Test the Demo

1. Go to http://localhost:3000/demo
2. Enter a topic: "Just shipped an AI product"
3. Choose a style: "Professional"
4. Click "Generate Caption"
5. See real metrics: latency, tokens, cost

## 5. Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Follow the prompts to add environment variables.

Done. Your production AI portfolio is live.

## What You're Looking At

- **Home** (`/`) - Technical authority statement
- **Capabilities** (`/capabilities`) - How we build production AI
- **Projects** (`/projects`) - Real systems we've shipped
- **Demo** (`/demo`) - Live AI inference (the approval trigger)

## Project Structure

```
app/                    # Next.js App Router
├── page.tsx            # Home
├── capabilities/       # Capabilities page
├── projects/           # Projects page
├── demo/               # Interactive demo UI
└── api/demo/           # API endpoint

lib/
└── ai.ts               # Provider-agnostic AI interface

README.md               # Full documentation
DEPLOYMENT.md           # Deployment guide
ARCHITECTURE.md         # Design decisions
QUICKSTART.md           # This file
```

## Key Features

✓ Real API calls to real AI providers
✓ Provider-agnostic (swap OpenAI/Anthropic/Gemini)
✓ Structured JSON output validation (Zod)
✓ Real latency & cost tracking
✓ Production error handling
✓ Vercel-ready
✓ TypeScript for type safety

## Common Tasks

### Change AI Provider

Edit `.env.local`:
```env
NEXT_PUBLIC_AI_PROVIDER=anthropic
NEXT_PUBLIC_AI_MODEL=claude-3-haiku-20240307
ANTHROPIC_API_KEY=your_key
```

Restart dev server. No code changes needed.

### Add a New Demo Endpoint

1. Create schema in `lib/ai.ts` or new `lib/schemas.ts`
2. Create API route at `app/api/yourfeature/route.ts`
3. Create UI page at `app/yourfeature/page.tsx`

See `ARCHITECTURE.md` for examples.

### Monitor Costs

Check your AI provider's dashboard:
- OpenAI: https://platform.openai.com/account/billing
- Anthropic: https://console.anthropic.com/usage
- Google: https://console.cloud.google.com/billing

The demo endpoint logs real costs. Each call costs $0.003-$0.01.

### Debug API Issues

```bash
# Check environment variables are loaded
node -e "console.log(process.env.OPENAI_API_KEY)"

# Test the API directly
curl -X POST http://localhost:3000/api/demo \
  -H "Content-Type: application/json" \
  -d '{"topic":"test"}'

# Check TypeScript for errors
npx tsc --noEmit
```

## Troubleshooting

**"AI API not configured" error**
- Check `.env.local` exists and has your API key
- Restart `npm run dev`
- Check the key format (no extra spaces)

**Slow responses**
- OpenAI models take 1-3 seconds usually
- Check provider status page
- Try a smaller model (gpt-3.5-turbo instead of gpt-4)

**Build fails locally**
- Delete `node_modules` and `.next`
- Run `npm install` again
- Run `npm run build`

## Next Steps

1. Read `README.md` for full documentation
2. Check `ARCHITECTURE.md` for design patterns
3. Review `DEPLOYMENT.md` for production deployment
4. Explore the code in `/app` and `/lib`

## Need Help?

- **Documentation**: See `README.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Code**: Read `/lib/ai.ts` and `/app/api/demo/route.ts`

---

Your production AI portfolio is ready to demo, evaluate, and deploy.
