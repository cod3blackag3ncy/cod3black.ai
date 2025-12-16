# START HERE

Welcome to Code3BlackAgency's production AI portfolio. Read this file first.

## What This Is

A **production-grade Next.js application** that demonstrates real AI capability:
- Real API calls to OpenAI, Anthropic, or Google
- Real latency and cost tracking
- Real error handling
- Real deployment readiness

Not a tutorial. Not a toy. A credible showcase for investors and partners.

## The Quick Version (5 minutes)

1. **Install & Configure**
   ```bash
   npm install
   cp .env.example .env.local
   ```

2. **Add Your API Key to `.env.local`**
   ```bash
   # Edit .env.local and make sure these lines exist:
   NEXT_PUBLIC_AI_PROVIDER=openai
   NEXT_PUBLIC_AI_MODEL=gpt-4-turbo
   OPENAI_API_KEY=sk_your_actual_key_here
   ```
   
   ⚠️ **Important:** Replace `sk_your_actual_key_here` with your real key from https://platform.openai.com/api-keys

3. **Run Locally**
   ```bash
   npm run dev
   # Go to http://localhost:3000/demo
   ```

4. **See It Work**
   - Enter a topic
   - Click "Generate"
   - See real AI response + cost + latency

5. **Deploy**
   ```bash
   vercel --prod
   ```

Done.

**Troubleshooting:** If you get "AI API not configured" error, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## The Important Pages

**/ — Home**
- "We build production AI systems"
- No fluff, no hype
- Links to everything

**/capabilities**
- How we actually build AI systems
- 6 core capabilities
- Real implementation details

**/projects**
- 3 real projects we've shipped
- PaparizeMe, IRS Advocate AI, AI Tooling
- Real metrics, real status

**/demo ← THE APPROVAL TRIGGER**
- Interactive AI demo
- Enter text, get response
- See tokens, cost, latency
- This page proves everything

## Documentation Map

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **This File** | Overview | 5 min |
| **QUICKSTART.md** | Setup guide | 5 min |
| **README.md** | Full documentation | 15 min |
| **DEPLOYMENT.md** | How to deploy | 10 min |
| **ARCHITECTURE.md** | Design patterns | 15 min |
| **FILE_MANIFEST.md** | File listing | 5 min |

## What Makes This Real

✓ **Real inference** — Calls actual AI providers with real keys
✓ **Real costs** — Shows actual token usage and calculated costs
✓ **Real latency** — Measures actual response time in milliseconds
✓ **Real validation** — Validates responses against schemas before returning
✓ **Real errors** — Handles errors properly (400, 500, 503)
✓ **Real TypeScript** — Strict mode, no `any` types
✓ **Real deployment** — Works on Vercel with zero changes

## What You Should Do Next

### To Demo It
1. `npm run dev`
2. Go to `http://localhost:3000/demo`
3. Generate a caption
4. Show the cost & latency to someone

### To Deploy It
1. Read `DEPLOYMENT.md`
2. Add API key to Vercel
3. `vercel --prod`
4. Share the URL

### To Extend It
1. Read `ARCHITECTURE.md`
2. Copy `/api/demo/route.ts`
3. Create your own endpoint
4. See examples in that file

### To Understand It
1. Start with `README.md`
2. Read `ARCHITECTURE.md` for design decisions
3. Look at `/lib/ai.ts` for the core logic
4. Review `/app/api/demo/route.ts` for an example endpoint

## Technology Stack

- **Framework**: Next.js 15 (latest)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS (minimal)
- **Validation**: Zod (runtime type checking)
- **Deployment**: Vercel (serverless)
- **AI**: OpenAI, Anthropic, Google (swappable)

All battle-tested, all production-ready.

## File Structure

```
cod3black.ai/
├── README.md                    # Full documentation
├── QUICKSTART.md                # 5-min setup
├── DEPLOYMENT.md                # Vercel guide
├── ARCHITECTURE.md              # Design patterns
├── START_HERE.md                # This file
│
├── app/
│   ├── page.tsx                # Home
│   ├── capabilities/page.tsx    # Capabilities
│   ├── projects/page.tsx        # Projects
│   ├── demo/page.tsx            # Interactive demo ← Go here first
│   ├── api/demo/route.ts        # AI endpoint
│   └── layout.tsx               # Root layout
│
├── lib/
│   └── ai.ts                    # Provider-agnostic AI
│
└── [config files]               # next.config, tsconfig, etc.
```

## Getting API Keys

**OpenAI:**
- Go to https://platform.openai.com/api-keys
- Create a key
- Add to `.env.local` as `OPENAI_API_KEY=sk_...`

**Anthropic:**
- Go to https://console.anthropic.com/keys
- Create a key
- Add to `.env.local` as `ANTHROPIC_API_KEY=sk_ant_...`

**Google Gemini:**
- Go to https://makersuite.google.com/app/apikey
- Create a key
- Add to `.env.local` as `GOOGLE_API_KEY=...`

## Common Questions

**Q: Can I use this to impress investors?**
A: Yes. This is exactly what it's built for. Demo the `/demo` page.

**Q: Can I swap AI providers?**
A: Yes. Change `.env.local` variable `NEXT_PUBLIC_AI_PROVIDER` and the API key.

**Q: Is this production-ready?**
A: Yes. It deploys to Vercel with zero changes. Has proper error handling.

**Q: Can I add more demos?**
A: Yes. Copy `/api/demo/route.ts`, modify the schema, create a new page. See `ARCHITECTURE.md`.

**Q: How much does it cost to run?**
A: Each API call costs $0.003-$0.01. Depends on the model and input size.

**Q: Can I use this for my own product?**
A: Yes. The code is yours. Modify it however you want.

## The Demo Page (Most Important)

Go to `/demo` and you'll see:

1. **Input Form**
   - Text area for topic
   - Style selector (casual, professional, humorous, inspirational)

2. **AI Response**
   - Generated caption
   - Suggested hashtags
   - Tone classification
   - Engagement score (0-100)

3. **Metadata**
   - Model used
   - Provider (openai, anthropic, gemini)
   - Tokens consumed
   - Estimated cost
   - Latency in milliseconds

This single page proves:
- You can call AI APIs
- You track costs
- You measure performance
- You validate responses
- You handle errors

It's the approval trigger.

## Deployment in 2 Minutes

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# When prompted, add:
NEXT_PUBLIC_AI_PROVIDER=openai
NEXT_PUBLIC_AI_MODEL=gpt-4-turbo
OPENAI_API_KEY=sk_your_key_here

# Done. Your app is live at vercel.com
```

## What's Next?

1. **Right now**: Read `QUICKSTART.md` (5 min)
2. **Then**: Run locally and test `/demo` (5 min)
3. **Then**: Deploy to Vercel (2 min)
4. **Then**: Share the URL with reviewers

Total time: ~20 minutes from zero to live.

## Support

- **Setup help**: See `QUICKSTART.md`
- **Deployment help**: See `DEPLOYMENT.md`
- **Understanding the code**: See `README.md` and `ARCHITECTURE.md`
- **API details**: See `README.md` section "API Documentation"

---

**You're ready. Build confidence. Get approvals.**
