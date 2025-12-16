import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {/* Hero */}
      <div className="mb-24">
        <h1 className="text-5xl font-mono font-bold mb-6 leading-tight">
          We build{" "}
          <span className="text-blue-400">production AI systems</span>.
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mb-8">
          Not marketing AI. Not toy demos. Systems that consume real compute,
          handle real constraints, and solve real problems at scale.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/demo"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-mono transition"
          >
            Live Demo
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 border border-slate-600 hover:border-slate-400 rounded font-mono transition"
          >
            View Projects
          </Link>
          <Link
            href="/consultation"
            className="px-6 py-3 border border-blue-600 hover:border-blue-400 text-blue-400 rounded font-mono transition"
          >
            Free Consultation
          </Link>
        </div>
      </div>

      {/* What we do */}
      <div className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg font-mono font-bold mb-3 text-blue-400">
            LLM Inference
          </h3>
          <p className="text-slate-400">
            Real API calls to GPT-4, Claude, Gemini. Structured outputs. Latency
            tracking. Cost awareness. Provider-agnostic routing.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-mono font-bold mb-3 text-blue-400">
            Document Processing
          </h3>
          <p className="text-slate-400">
            OCR, parsing, compliance extraction. Deterministic prompts. JSON
            schemas. Audit trails for production systems.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-mono font-bold mb-3 text-blue-400">
            Automation Workflows
          </h3>
          <p className="text-slate-400">
            Scheduled tasks. Webhook handlers. Multi-step orchestration. Queue
            management. Error recovery and monitoring.
          </p>
        </div>
      </div>

      {/* Key facts */}
      <div className="mb-24 bg-slate-900 border border-slate-800 rounded-lg p-12">
        <h2 className="text-2xl font-mono font-bold mb-8">The Reality Check</h2>
        <ul className="space-y-4 text-slate-300">
          <li className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>
              We don't hide latency. Every demo shows real response times.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>We think in tokens, costs, and rate limits. You should too.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>
              Deterministic outputs when they matter. Sampling when they don't.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>
              Production means error handling, retries, and graceful degradation.
            </span>
          </li>
        </ul>
      </div>

      {/* Consultation CTA */}
      <div className="mb-24 bg-blue-900/20 border border-blue-700 rounded-lg p-12">
        <h2 className="text-2xl font-mono font-bold mb-6">
          Have a Project You Want to Build?
        </h2>
        <p className="text-slate-300 max-w-2xl mb-8">
          Submit your plan for free AI analysis. We'll assess feasibility, AI
          integration opportunities, complexity, and realistic investment needed.
          Perfect for founders and CTOs evaluating their next move.
        </p>
        <Link
          href="/consultation"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded font-mono transition"
        >
          Get Free Analysis
        </Link>
      </div>

      {/* Live Demo CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-mono font-bold mb-6">
          Ready to see what production AI looks like?
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Try our live demo. It's not fancy. It's real.
        </p>
        <Link
          href="/demo"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded font-mono transition"
        >
          Run the Demo
        </Link>
      </div>
    </div>
  );
}
