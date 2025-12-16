"use client";

import { useState, FormEvent, ChangeEvent } from "react";

interface DemoResponse {
  success: boolean;
  data?: {
    caption: string;
    hashtags: string[];
    tone: string;
    engagementScore: number;
  };
  metadata?: {
    model: string;
    provider: string;
    tokensUsed: number;
    estimatedCost: string;
    latencyMs: number;
  };
  error?: string;
}

export default function Demo() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("casual");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<DemoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, style }),
      });

      const data: DemoResponse = await res.json();

      if (!res.ok) {
        setError(data.error || "API request failed");
      } else {
        setResponse(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-mono font-bold mb-6 leading-tight">
        Live <span className="text-blue-400">AI Demo</span>
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mb-12">
        This is a real API call. Real inference. Real latency. Real cost.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="border border-slate-800 rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-mono font-bold mb-6">Input</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-blue-400 mb-2">
                  Topic
                </label>
                <textarea
                  value={topic}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setTopic(e.target.value)
                  }
                  placeholder="What should we create a caption for?"
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ai-input"
                />
                <p className="text-xs text-slate-500 mt-2">
                  {topic.length}/500 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-mono text-blue-400 mb-2">
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setStyle(e.target.value)
                  }
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500 ai-input"
                >
                  <option value="casual">Casual</option>
                  <option value="professional">Professional</option>
                  <option value="humorous">Humorous</option>
                  <option value="inspirational">Inspirational</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!topic.trim() || loading}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 rounded font-mono transition"
              >
                {loading ? "Generating..." : "Generate Caption"}
              </button>

              {error && (
                <div className="p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
                  <p className="font-mono font-bold mb-1">Error</p>
                  <p>{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
          {response?.success && response.data ? (
            <div className="space-y-6">
              {/* Caption */}
              <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/50">
                <h3 className="text-sm font-mono text-blue-400 mb-3 uppercase">
                  Generated Caption
                </h3>
                <p className="text-lg text-white leading-relaxed mb-4">
                  {response.data.caption}
                </p>
                <div className="text-sm text-slate-400">
                  Tone: <span className="text-blue-300">{response.data.tone}</span>
                </div>
              </div>

              {/* Hashtags */}
              <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/50">
                <h3 className="text-sm font-mono text-blue-400 mb-3 uppercase">
                  Suggested Hashtags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {response.data.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-blue-300"
                    >
                      {tag.startsWith("#") ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement Score */}
              <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/50">
                <h3 className="text-sm font-mono text-blue-400 mb-4 uppercase">
                  Engagement Score
                </h3>
                <div className="space-y-2">
                  <div className="flex items-end gap-4">
                    <div className="text-3xl font-mono font-bold">
                      {response.data.engagementScore}%
                    </div>
                    <div className="flex-1 h-2 bg-slate-700 rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{
                          width: `${response.data.engagementScore}%`,
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">
                    Estimated engagement potential
                  </p>
                </div>
              </div>

              {/* Metadata */}
              {response.metadata && (
                <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/50">
                  <h3 className="text-sm font-mono text-blue-400 mb-4 uppercase">
                    API Metadata
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 mb-1">Provider</p>
                      <p className="text-white font-mono">
                        {response.metadata.provider}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Model</p>
                      <p className="text-white font-mono">
                        {response.metadata.model}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Tokens Used</p>
                      <p className="text-white font-mono">
                        {response.metadata.tokensUsed}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Estimated Cost</p>
                      <p className="text-white font-mono">
                        {response.metadata.estimatedCost}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-500 mb-1">Latency</p>
                      <p className="text-white font-mono">
                        {response.metadata.latencyMs}ms
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <h3 className="text-sm font-mono text-blue-400 mb-3 uppercase">
                  What's Happening Here
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-blue-400">→</span>
                    <span>
                      Your input was sent to OpenAI's GPT-4 Turbo model.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">→</span>
                    <span>
                      The model generated JSON matching our schema
                      (caption, hashtags, tone, engagement score).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">→</span>
                    <span>
                      The response was validated on the server before
                      reaching you.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">→</span>
                    <span>
                      Latency shows real wall-clock time, tokens show actual
                      API usage.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">→</span>
                    <span>
                      Cost is calculated in real-time based on token usage.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center">
              <p className="text-slate-400 mb-2">No results yet.</p>
              <p className="text-slate-500 text-sm">
                Try generating a caption above.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-24 bg-slate-900 border border-slate-800 rounded-lg p-12">
        <h2 className="text-2xl font-mono font-bold mb-6">Production Readiness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 text-sm">
          <div>
            <h4 className="font-mono font-bold text-blue-400 mb-3">
              Error Handling
            </h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>API key validation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Schema validation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Input sanitization</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Clear error messages</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono font-bold text-blue-400 mb-3">
              Observability
            </h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Real latency tracking</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Token counting</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Cost calculation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Provider visibility</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
