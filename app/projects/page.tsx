export default function Projects() {
  const projects = [
    {
      name: "PaparizeMe",
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
      name: "IRS Advocate AI",
      tagline: "Document generation and compliance",
      description:
        "Generates compliant IRS letters and documents. Extracts data from user forms, validates against IRS requirements, outputs audit-ready documents.",
      aiUsage: [
        "Document OCR and field extraction",
        "Deterministic prompt-based document generation",
        "Compliance validation against IRS rules",
        "Audit trail generation for every letter",
      ],
      architecture: {
        input: "PDF scan or web form input",
        processing:
          "OCR/parsing → schema validation → prompt → generate document → compliance check",
        output: "PDF-ready letter, audit log, compliance score",
      },
      metrics: "500+ documents generated, 100% compliance rate, zero rejections",
      status: "Production",
      statusColor: "bg-green-900 border-green-700",
    },
    {
      name: "Applied AI Tooling",
      tagline: "Internal automation and orchestration",
      description:
        "Suite of automation tools: scheduled workflows, webhook processors, document pipelines, cost tracking dashboards. Powers our ops and internal processes.",
      aiUsage: [
        "Scheduled batch processing (Vercel cron)",
        "Queue-based workflow orchestration",
        "Real-time cost and latency tracking",
        "Error detection and alerting",
      ],
      architecture: {
        input: "Scheduled triggers or webhook events",
        processing:
          "Fan-out to multiple AI tasks → aggregate results → log everything",
        output: "Audit log, metrics, alerts, processed data",
      },
      metrics: "10K+ automations/day, 99.9% uptime, <5min end-to-end latency",
      status: "Beta",
      statusColor: "bg-yellow-900 border-yellow-700",
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
                  {project.name}
                </h2>
                <p className="text-slate-400">{project.tagline}</p>
              </div>
              <div
                className={`px-3 py-1 rounded text-sm font-mono border ${project.statusColor}`}
              >
                {project.status}
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
              We understand compliance (IRS), brand consistency (PaparizeMe),
              and automation (ops).
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
