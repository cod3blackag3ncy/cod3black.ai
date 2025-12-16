"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface PlanAnalysis {
  problemStatement: string;
  targetAudience: string;
  aiUseCases: string[];
  technicalFeasibility: string;
  estimatedComplexity: "simple" | "moderate" | "complex";
  recommendedStack: string[];
  nextSteps: string[];
  fundingEstimate: string;
  timeline: string;
  risks: string[];
}

interface ConsultationResponse {
  success: boolean;
  analysis?: PlanAnalysis;
  metadata?: {
    model: string;
    provider: string;
    tokensUsed: number;
    estimatedCost: string;
    latencyMs: number;
  };
  error?: string;
}

export default function Consultation() {
  const [planText, setPlanText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ConsultationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"input" | "analysis">("input");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    if (!planText.trim()) {
      setError("Please describe your project plan");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("plan", planText);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/consultation", {
        method: "POST",
        body: formData,
      });

      const data: ConsultationResponse = await res.json();

      if (!res.ok) {
        setError(data.error || "Analysis failed");
      } else {
        setResponse(data);
        setStep("analysis");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  function reset() {
    setPlanText("");
    setFile(null);
    setResponse(null);
    setError(null);
    setStep("input");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {step === "input" ? (
        <>
          <div className="mb-16">
            <h1 className="text-5xl font-mono font-bold mb-6 leading-tight">
              Free AI Project <span className="text-blue-400">Consultation</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Serious founders and developers: Submit your project plan, and our
              AI will analyze it for feasibility, complexity, and AI integration
              opportunities. Get clarity before you build.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="border border-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-mono font-bold mb-8">
                  Submit Your Plan
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-mono text-blue-400 mb-3">
                      Project Plan (Required)
                    </label>
                    <p className="text-xs text-slate-500 mb-3">
                      Be specific. Include: problem you're solving, target
                      audience, how AI fits in, tech preferences, timeline,
                      budget expectations.
                    </p>
                    <textarea
                      value={planText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setPlanText(e.target.value)
                      }
                      placeholder="Example: We're building a B2B platform that uses AI to analyze X-ray images for radiologists. Target: hospitals in US/EU. Need: real-time inference, compliance with HIPAA. Budget: $500K. Timeline: 6 months."
                      maxLength={5000}
                      rows={10}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono text-sm ai-input"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      {planText.length}/5000 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-blue-400 mb-3">
                      Upload Document (Optional)
                    </label>
                    <p className="text-xs text-slate-500 mb-3">
                      Upload a revised plan, pitch deck, or specification
                      document (PDF, DOCX, TXT)
                    </p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.txt"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500 ai-input"
                    />
                    {file && (
                      <p className="text-xs text-blue-400 mt-2">
                        Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!planText.trim() || loading}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 rounded font-mono font-bold transition"
                  >
                    {loading ? "Analyzing..." : "Get AI Analysis"}
                  </button>

                  {error && (
                    <div className="p-4 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
                      <p className="font-mono font-bold mb-1">Error</p>
                      <p>{error}</p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/50">
                  <h3 className="font-mono font-bold text-blue-400 mb-4">
                    What You Get
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>AI-powered plan analysis</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>Feasibility assessment</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>AI integration roadmap</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>Recommended tech stack</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>Complexity assessment</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>Timeline & cost estimates</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>Risk analysis</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/50">
                  <h3 className="font-mono font-bold text-blue-400 mb-4">
                    Who This Is For
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex gap-2">
                      <span className="text-blue-400">→</span>
                      <span>Founders with projects to build</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-400">→</span>
                      <span>CTOs evaluating AI integration</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-400">→</span>
                      <span>Teams with funding or resources</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-400">→</span>
                      <span>Anyone serious about execution</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-slate-800 rounded-lg p-6 bg-blue-900/20">
                  <h3 className="font-mono font-bold text-blue-400 mb-3">
                    Next Steps
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    After analysis, if you want to move forward, we'll discuss
                    scope, timeline, and investment.
                  </p>
                  <p className="text-xs text-slate-400">
                    We work with founders and teams who are serious about
                    building production AI systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : response?.success && response.analysis ? (
        <>
          <div className="mb-12">
            <button
              onClick={reset}
              className="px-4 py-2 border border-slate-600 hover:border-slate-400 rounded font-mono text-sm mb-8 transition"
            >
              ← Submit Another Plan
            </button>

            <h1 className="text-4xl font-mono font-bold mb-2">
              AI Analysis Results
            </h1>
            <p className="text-slate-400">
              Your project plan has been analyzed by GPT-4 Turbo
            </p>
          </div>

          <div className="space-y-8">
            {/* Problem Statement */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <h2 className="text-lg font-mono font-bold text-blue-400 mb-4">
                Problem & Opportunity
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {response.analysis.problemStatement}
              </p>
            </div>

            {/* Target Audience */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <h2 className="text-lg font-mono font-bold text-blue-400 mb-4">
                Target Audience & Market
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {response.analysis.targetAudience}
              </p>
            </div>

            {/* AI Use Cases */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <h2 className="text-lg font-mono font-bold text-blue-400 mb-4">
                AI Integration Opportunities
              </h2>
              <ul className="space-y-3">
                {response.analysis.aiUseCases.map((useCase, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-300">
                    <span className="text-blue-400 font-bold">→</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Feasibility */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <h2 className="text-lg font-mono font-bold text-blue-400 mb-4">
                Technical Feasibility
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                {response.analysis.technicalFeasibility}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">Complexity:</span>
                <span
                  className={`px-3 py-1 rounded font-mono text-sm font-bold ${
                    response.analysis.estimatedComplexity === "simple"
                      ? "bg-green-900 border border-green-700"
                      : response.analysis.estimatedComplexity === "moderate"
                        ? "bg-yellow-900 border border-yellow-700"
                        : "bg-red-900 border border-red-700"
                  }`}
                >
                  {response.analysis.estimatedComplexity.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Recommended Stack */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <h2 className="text-lg font-mono font-bold text-blue-400 mb-4">
                Recommended Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {response.analysis.recommendedStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline & Funding */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
                <h2 className="text-lg font-mono font-bold text-blue-400 mb-4">
                  Timeline
                </h2>
                <p className="text-slate-300 font-mono">
                  {response.analysis.timeline}
                </p>
              </div>
              <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
                <h2 className="text-lg font-mono font-bold text-blue-400 mb-4">
                  Estimated Investment
                </h2>
                <p className="text-2xl font-mono font-bold text-blue-400 mb-2">
                  {response.analysis.fundingEstimate}
                </p>
                <p className="text-xs text-slate-400">
                  Based on complexity, team, and timeline
                </p>
              </div>
            </div>

            {/* Risks */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <h2 className="text-lg font-mono font-bold text-blue-400 mb-4">
                Key Risks & Mitigation
              </h2>
              <ul className="space-y-3">
                {response.analysis.risks.map((risk, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                    <span className="text-yellow-500 font-bold flex-shrink-0">
                      ⚠
                    </span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <h2 className="text-lg font-mono font-bold text-blue-400 mb-4">
                Recommended Next Steps
              </h2>
              <ol className="space-y-3">
                {response.analysis.nextSteps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-300">
                    <span className="font-mono font-bold text-blue-400 flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA */}
            <div className="border-2 border-blue-500 rounded-lg p-12 bg-blue-900/20">
              <h2 className="text-2xl font-mono font-bold mb-4">
                Ready to Build?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl">
                We specialize in building production AI systems. If your analysis
                shows feasibility and you have resources, let's talk about
                bringing your plan to life.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={reset}
                  className="px-6 py-3 border border-slate-600 hover:border-slate-400 rounded font-mono transition"
                >
                  Analyze Another Plan
                </button>
                <a
                  href="mailto:hello@code3black.ai?subject=AI Project Consultation - Ready to Build"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-mono transition"
                >
                  Schedule Discussion
                </a>
              </div>
            </div>
          </div>

          {/* Metadata */}
          {response.metadata && (
            <div className="mt-12 pt-8 border-t border-slate-800">
              <details className="cursor-pointer">
                <summary className="text-sm text-slate-500 hover:text-slate-400 font-mono">
                  View API Metadata
                </summary>
                <div className="mt-4 bg-slate-900 border border-slate-800 rounded p-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 mb-1">Provider</p>
                    <p className="text-white font-mono">
                      {response.metadata.provider}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Model</p>
                    <p className="text-white font-mono">
                      {response.metadata.model}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Tokens Used</p>
                    <p className="text-white font-mono">
                      {response.metadata.tokensUsed}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Estimated Cost</p>
                    <p className="text-white font-mono">
                      {response.metadata.estimatedCost}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-600 mb-1">Latency</p>
                    <p className="text-white font-mono">
                      {response.metadata.latencyMs}ms
                    </p>
                  </div>
                </div>
              </details>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
