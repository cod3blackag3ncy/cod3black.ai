export default function Capabilities() {
  const capabilities = [
    {
      title: "LLM Inference & Prompt Engineering",
      description:
        "Call any model through a unified interface. GPT-4, Claude 3, Gemini Pro. Deterministic temperature settings. Structured output validation.",
      implementation: [
        "Provider-agnostic SDK wrapper",
        "Request/response logging for cost tracking",
        "Automatic retry with exponential backoff",
        "Token counting before inference",
      ],
      whyItMatters:
        "Production systems need flexibility. Vendor lock-in kills agility. We route, we track, we optimize.",
      example: "API route accepts model selection → validates prompt → calls provider → logs tokens → returns structured output",
    },
    {
      title: "Structured Outputs & JSON Schemas",
      description:
        "Not just text. Validated, schema-compliant outputs. Zod schemas for runtime validation.",
      implementation: [
        "Prompt templates with schema injection",
        "Post-response validation and retries",
        "Type-safe TypeScript interfaces",
        "Fallback to null instead of hallucinated data",
      ],
      whyItMatters:
        "Downstream systems need predictable data. Unparseable JSON in production = pager at 3am. We don't do that.",
      example: "Generator accepts form → instructs model to output JSON → validates against schema → returns typed object or error",
    },
    {
      title: "API Orchestration & Rate Limiting",
      description:
        "Chain multiple AI calls. Handle rate limits. Implement intelligent caching and deduplication.",
      implementation: [
        "Sequential or parallel API calls with fan-in",
        "Rate limit detection and backoff",
        "Request deduplication based on hash",
        "Cache layer with TTL",
      ],
      whyItMatters:
        "Real workflows need multiple steps. Rate limits are real. Costs explode without intelligence.",
      example: "Extract content → analyze sentiment → generate response → moderate output → return final result",
    },
    {
      title: "Document Processing",
      description:
        "OCR, PDF parsing, form extraction, compliance analysis. Deterministic pipeline.",
      implementation: [
        "Image preprocessing and normalization",
        "Prompt templates for structured extraction",
        "Field-level validation and type coercion",
        "Audit trail with timestamps",
      ],
      whyItMatters:
        "IRS documents aren't jokes. Bad extraction = compliance failure. We extract with confidence.",
      example: "File upload → OCR/parsing → extract fields → validate against schema → generate output doc",
    },
    {
      title: "Cost & Latency Awareness",
      description:
        "Every API call is tracked. Model selection optimizes for cost or speed based on use case.",
      implementation: [
        "Real-time token counting",
        "Cost calculation per inference",
        "Latency measurement and logging",
        "Model recommendation engine",
      ],
      whyItMatters:
        "Sending everything to GPT-4 is expensive. GPT-3.5 is fast but dumb. We measure both and decide.",
      example: "Dashboard shows cost/token, latency/model, suggests cheaper alternatives",
    },
    {
      title: "Deployment & Scaling",
      description:
        "Serverless-first. Auto-scaling. No containers to manage.",
      implementation: [
        "Vercel serverless functions",
        "Environment-based configuration",
        "Request queuing for spike handling",
        "Monitoring and alerting hooks",
      ],
      whyItMatters:
        "AI workloads are bursty. Containers don't scale. Serverless does.",
      example: "Traffic spike → auto-scale → handle 1000 requests → return to baseline → pay only for what you used",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-mono font-bold mb-6 leading-tight">
        How We Build <span className="text-blue-400">Production AI</span>
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mb-24">
        Not theories. Not tutorials. Real patterns from real systems handling
        real constraints.
      </p>

      <div className="space-y-16">
        {capabilities.map((cap, idx) => (
          <div
            key={idx}
            className="border-l-4 border-blue-400 pl-8 pb-12 last:pb-0"
          >
            <h2 className="text-2xl font-mono font-bold mb-3">{cap.title}</h2>
            <p className="text-slate-300 mb-6">{cap.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-sm font-mono font-bold text-blue-300 mb-3 uppercase">
                  How It Works
                </h4>
                <ul className="space-y-2">
                  {cap.implementation.map((item, i) => (
                    <li
                      key={i}
                      className="text-slate-400 text-sm flex gap-2"
                    >
                      <span className="text-blue-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-mono font-bold text-blue-300 mb-3 uppercase">
                  Why It Matters
                </h4>
                <p className="text-slate-400 text-sm">{cap.whyItMatters}</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded p-4">
              <p className="text-sm text-slate-300 font-mono">{cap.example}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-slate-900 border border-slate-800 rounded-lg p-12">
        <h2 className="text-2xl font-mono font-bold mb-6">The Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-mono font-bold text-blue-400 mb-3">Frontend</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Next.js 15 (App Router)</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind for minimal, fast UI</li>
              <li>Zero external component libraries</li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono font-bold text-blue-400 mb-3">Backend</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Serverless API routes</li>
              <li>Provider-agnostic AI SDKs</li>
              <li>Zod for runtime validation</li>
              <li>Environment-based configuration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono font-bold text-blue-400 mb-3">
              Infrastructure
            </h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Vercel for deployment</li>
              <li>Edge functions where applicable</li>
              <li>Environment variables for secrets</li>
              <li>Request logging and monitoring</li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono font-bold text-blue-400 mb-3">
              AI Providers
            </h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>OpenAI (GPT-4, GPT-3.5)</li>
              <li>Anthropic (Claude 3)</li>
              <li>Google Gemini</li>
              <li>Easy to swap or add more</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
