export default function Projects() {
  const projects = [
    {
      name: "PaparizeMe",
      url: "https://paparize.me",
      tagline: "Creator-brand AI platform",
      description:
        "Multimodal content analysis and generation for influencers and creators. Analyzes brand voice, generates captions, suggests posting times, detects content trends.",
      aiUsage: [
        "Vision API for image analysis and aesthetic scoring",
        "LLM for caption generation (tuned to brand voice)",
        "Sentiment analysis for audience engagement prediction",
        "Content moderation against brand guidelines",
      ],
      architecture: {
        input: "User uploads image + brief context",
        processing:
          "Vision → extract features → LLM → generate captions → moderation",
        output: "Captions, hashtags, posting time recommendation, engagement prediction",
      },
      metrics: "100K+ users, 5M+ captions generated, <800ms inference latency",
      status: "Production",
      statusColor: "bg-green-900 border-green-700",
    },
    {
      name: "Taste of Gratitude",
      url: "https://tasteofgratitude.shop",
      tagline: "E-commerce platform",
      description:
        "Full-featured e-commerce shop with product management, shopping cart, checkout flow, and order processing. Clean, conversion-optimized design with seamless user experience.",
      aiUsage: [
        "Product recommendation engine",
        "Inventory optimization algorithms",
        "Customer behavior analytics",
        "Automated email marketing flows",
      ],
      architecture: {
        input: "Customer browsing and purchase data",
        processing:
          "Data collection → ML analysis → personalization → targeted recommendations",
        output: "Personalized shopping experience, optimized inventory, increased conversions",
      },
      metrics: "Live storefront, optimized checkout, mobile-responsive",
      status: "Production",
      statusColor: "bg-green-900 border-green-700",
    },
    {
      name: "Trade Alerts",
      url: "https://trade-alerts.vercel.app",
      tagline: "Real-time trading signals platform",
      description:
        "Automated trading signal generation and alerting system. Monitors market conditions, analyzes patterns, and delivers actionable trade alerts in real-time.",
      aiUsage: [
        "Pattern recognition for trade setups",
        "Risk/reward analysis and position sizing",
        "Market sentiment analysis",
        "Real-time alert delivery system",
      ],
      architecture: {
        input: "Live market data feeds",
        processing:
          "Data ingestion → pattern analysis → signal validation → alert dispatch",
        output: "Trade alerts, risk metrics, performance tracking",
      },
      metrics: "Real-time alerts, backtested strategies, low-latency execution",
      status: "Production",
      statusColor: "bg-green-900 border-green-700",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-mono font-bold mb-6 leading-tight">
        Production <span className="text-blue-400">Projects</span>
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mb-24">
        Real systems solving real problems. Real inference. Real impact.
      </p>

      <div className="space-y-12">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="border border-slate-800 rounded-lg p-8 hover:border-slate-600 transition"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-mono font-bold mb-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                  >
                    {project.name}
                  </a>
                </h2>
                <p className="text-slate-400">{project.tagline}</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded text-sm font-mono border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition"
                >
                  Visit Site →
                </a>
                <div
                  className={`px-3 py-1 rounded text-sm font-mono border ${project.statusColor}`}
                >
                  {project.status}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 mb-8">{project.description}</p>

            {/* Grid: AI Usage + Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* AI Usage */}
              <div>
                <h4 className="text-sm font-mono font-bold text-blue-400 mb-4 uppercase">
                  AI & LLM Usage
                </h4>
                <ul className="space-y-3">
                  {project.aiUsage.map((use, i) => (
                    <li key={i} className="text-slate-300 text-sm flex gap-3">
                      <span className="text-blue-400 flex-shrink-0">→</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture */}
              <div>
                <h4 className="text-sm font-mono font-bold text-blue-400 mb-4 uppercase">
                  Architecture
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-blue-300 text-xs font-mono mb-1">
                      INPUT
                    </p>
                    <p className="text-slate-300 text-sm">
                      {project.architecture.input}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-xs font-mono mb-1">
                      PIPELINE
                    </p>
                    <p className="text-slate-300 text-sm">
                      {project.architecture.processing}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-xs font-mono mb-1">
                      OUTPUT
                    </p>
                    <p className="text-slate-300 text-sm">
                      {project.architecture.output}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-slate-900 border border-slate-800 rounded px-4 py-3">
              <p className="text-slate-300 text-sm">
                <span className="font-mono font-bold text-blue-400">
                  METRICS:
                </span>{" "}
                {project.metrics}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* More info */}
      <div className="mt-24 bg-slate-900 border border-slate-800 rounded-lg p-12">
        <h2 className="text-2xl font-mono font-bold mb-6">What This Tells You</h2>
        <ul className="space-y-4 text-slate-300">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold flex-shrink-0">→</span>
            <span>
              We've shipped AI to production. Multiple times. Different use cases.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold flex-shrink-0">→</span>
            <span>
              We understand e-commerce, creator platforms, and trading systems.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold flex-shrink-0">→</span>
            <span>
              We measure what matters: latency, cost, uptime, accuracy.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold flex-shrink-0">→</span>
            <span>
              Production means 99.9% uptime, not 99%. Error handling. Retries.
              Monitoring.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
