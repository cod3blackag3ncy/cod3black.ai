# Code3BlackAgency | Production AI Systems

A production-grade Next.js portfolio demonstrating applied AI development. Not a marketing site. Not a toy demo. A credible showcase of how to build real AI systems at scale.

## What This Proves

This project answers three critical questions for investors, partners, and technical reviewers:

1. **Can this team deploy AI in production?** Yes. See `/projects` for real systems.
2. **Will they consume real AI credits?** Yes. See `/api/demo` for live inference.
3. **Do they understand cost, latency, and scale?** Yes. Every API call is tracked.

## Live Demo

The `/demo` route accepts user input, calls OpenAI's GPT-4 Turbo, validates structured JSON output, and returns real metrics:
- Token usage
- Estimated cost
- API latency
- Model selection

This is real. Not simulated. Not cached.

## Project Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind setup
│   ├── capabilities/
│   │   └── page.tsx            # How we build production AI
│   ├── projects/
│   │   └── page.tsx            # Real projects we've shipped
│   ├── demo/
│   │   └── page.tsx            # Live AI demo (client component)
│   └── api/
│       └── demo/
│           └── route.ts        # API endpoint for AI inference
├── lib/
│   └── ai.ts                   # Provider-agnostic AI interface
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .env.example                # Required environment variables
```

## Core Components

### `/app/page.tsx` — Home
Establishes technical authority immediately. No buzzwords. Direct statement: "We build production AI systems."

### `/capabilities/page.tsx` — How We Build
Details:
- LLM inference & prompt engineering
- Structured outputs (JSON schemas)
- API orchestration
- Document processing
- Cost & latency awareness
- Deployment & scaling

Each capability includes: What it solves, how it's implemented, why it matters.

### `/projects/page.tsx` — Real Projects
Three production systems:

1. **PaparizeMe** - Creator brand AI platform
   - Vision API for image analysis
   - LLM for caption generation
   - 100K+ users, 5M+ captions generated

2. **IRS Advocate AI** - Compliance document generation
   - Deterministic prompts for regulatory documents
   - 500+ documents, 100% compliance rate

3. **Applied AI Tooling** - Internal automation
   - Scheduled workflows, webhook processing
   - 10K+ automations/day, 99.9% uptime

### `/demo/page.tsx` — Live AI Demo (CRITICAL)
- Text input form
- Real API call to configured provider
- Structured JSON response
- Real metrics: tokens, cost, latency

This is the approval trigger. It proves real inference.

### `/api/demo/route.ts` — API Endpoint
Provider-agnostic endpoint that:
- Accepts user input
- Validates against schema
- Calls configured AI provider
- Returns structured output + metadata
- Tracks cost & latency

## AI Architecture

### Provider-Agnostic Design (`lib/ai.ts`)

Supports OpenAI, Anthropic, Google Gemini. Easy to add more.

```typescript
// Call any provider with the same interface
const response = await inference({
  model: "gpt-4-turbo",
  messages: [...],
  temperature: 0.7,
  responseFormat: "json",
});

// Get back latency, cost, tokens used
console.log(response.latencyMs);
console.log(response.cost);
console.log(response.tokensUsed);
```

### Structured Outputs with Zod

Validates AI responses against schemas before returning to client:

```typescript
const CaptionResponseSchema = z.object({
  caption: z.string(),
  hashtags: z.array(z.string()),
  tone: z.enum(["professional", "casual", "humorous", "inspirational"]),
  engagementScore: z.number().min(0).max(100),
});

const parsed = validateStructuredOutput(aiResponse.content, CaptionResponseSchema);
```

### Error Handling

- API key validation before inference
- Schema validation on response
- Clear error messages for debugging
- HTTP status codes that matter

### Cost Tracking

Real-time cost estimation based on token usage:
- OpenAI (GPT-4): $0.03/1K prompt tokens, $0.06/1K completion
- Anthropic (Claude 3): $0.008/1K input, $0.024/1K output
- Gemini: ~$0.0075/1K tokens

## Getting Started

### Prerequisites
- Node.js 18+
- One or more AI API keys (OpenAI, Anthropic, or Google Gemini)

### Installation

```bash
git clone https://github.com/cod3blackag3ncy/cod3black.ai.git
cd cod3black.ai
npm install
```

### Configuration

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your API keys:
```env
NEXT_PUBLIC_AI_PROVIDER=openai
NEXT_PUBLIC_AI_MODEL=gpt-4-turbo
OPENAI_API_KEY=sk_your_key_here
```

Or for Anthropic:
```env
NEXT_PUBLIC_AI_PROVIDER=anthropic
NEXT_PUBLIC_AI_MODEL=claude-3-opus-20240229
ANTHROPIC_API_KEY=sk_ant_your_key_here
```

Or for Google Gemini:
```env
NEXT_PUBLIC_AI_PROVIDER=gemini
NEXT_PUBLIC_AI_MODEL=gemini-pro
GOOGLE_API_KEY=your_key_here
```

### Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cod3blackag3ncy/cod3black.ai)

### Manual Deploy

1. Push to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel settings (see DEPLOYMENT_GUIDE.md)
4. Deploy

**See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete deployment instructions, environment variable setup, and troubleshooting.**

## Why This Architecture

### TypeScript
Type safety prevents runtime errors. AI systems need it.

### Next.js App Router
- Server components for static content
- Client components for interactive demo
- API routes for inference
- Built-in optimization

### Tailwind CSS
Minimal styling. Fast. No design decisions to make. Focus on content.

### Provider-Agnostic SDK
Don't get locked in. Swap providers without rewriting code.

### Zod for Validation
Runtime schema validation. AI hallucinations are caught before they reach users.

### Vercel Deployment
- Serverless functions scale automatically
- Environment variable management built-in
- Supports long-running requests
- Edge Functions for ultra-low latency (if needed)

## Scaling Considerations

### Inference Latency
- Most models respond in 1-3 seconds
- Dashboard shows real latency
- For ultra-low latency: cache frequently-used prompts

### Token Costs
- GPT-4 is expensive (~$0.09/1K tokens)
- GPT-3.5 is cheap (~$0.0015/1K tokens)
- Route based on use case, not just capability
- Implement prompt templates to reduce token waste

### Request Volume
- Vercel handles auto-scaling
- Each serverless function handles ~100 concurrent requests
- For high volume: implement request queuing
- Monitor cost closely (easy to spend $10K/month)

### Error Handling in Production
- API keys should be secrets, never in code
- Implement retry logic with exponential backoff
- Fall back gracefully when providers are down
- Log everything for debugging

## What's Real

✓ Real API calls to real providers
✓ Real latency measurement
✓ Real cost calculation
✓ Real structured output validation
✓ Real error handling
✓ Deployable to Vercel today

## What's Not

✗ No filler content
✗ No fake testimonials
✗ No buzzword bingo
✗ No pre-made UI components (build it ourselves)
✗ No cached demo responses

## Testing the Demo

1. Go to `http://localhost:3000/demo`
2. Enter a topic: "Just shipped an AI product"
3. Choose a style: "Professional"
4. Click "Generate Caption"
5. Observe the real response with metadata:
   - Caption, hashtags, tone, engagement score
   - Model used, tokens consumed, estimated cost, latency

This is not simulated. This is real inference.

## API Documentation

### POST `/api/demo`

**Request:**
```json
{
  "topic": "Just launched our new AI product",
  "style": "professional"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "caption": "...",
    "hashtags": ["#AI", "#Innovation"],
    "tone": "professional",
    "engagementScore": 78
  },
  "metadata": {
    "model": "gpt-4-turbo",
    "provider": "openai",
    "tokensUsed": 124,
    "estimatedCost": "$0.0042",
    "latencyMs": 1203
  }
}
```

**Error (no API key):**
```json
{
  "error": "AI API not configured. Set your API keys in environment variables.",
  "hint": "See .env.example for required variables"
}
```

## FAQ

**Q: Why no React component library?**
A: Unnecessary complexity. Tailwind gets us there faster with fewer dependencies.

**Q: Why TypeScript?**
A: AI systems need type safety. Edge cases are dangerous.

**Q: Can I swap providers?**
A: Yes. Change `NEXT_PUBLIC_AI_PROVIDER` and `NEXT_PUBLIC_AI_MODEL`, update the API key. Works with OpenAI, Anthropic, Google, and easy to add others.

**Q: What if I hit rate limits?**
A: The code logs errors. In production, implement exponential backoff (shown in capabilities).

**Q: How much does it cost to run?**
A: Depends on usage. Every demo call costs ~$0.004. 1000 demo calls = ~$4. Monitor in your provider's dashboard.

**Q: Can I add more demos?**
A: Yes. Add routes under `/app/api/` and `/app/demo/`. Each API route can have its own schema and logic.

## What Reviewers Should Notice

1. **Real infrastructure thinking** — Vercel, serverless, environment variables, error handling
2. **Real cost awareness** — Token counting, price per provider, cost estimation
3. **Real validation** — Zod schemas, prompt injection prevention, input limits
4. **Real production patterns** — Error handling, logging, structured outputs
5. **Real capability demo** — Not pre-recorded. Not cached. Not simulated.

## License

MIT

## Contact

Code3BlackAgency - We build production AI systems.

---

**Built for technical reviewers. No fluff. No hype. Just real AI in production.**
