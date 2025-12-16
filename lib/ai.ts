import { z } from "zod";

/**
 * Provider-agnostic AI interface.
 * Supports OpenAI, Anthropic, Google Gemini.
 */

export type AIProvider = "openai" | "anthropic" | "gemini";

export interface AIInferenceRequest {
  provider?: AIProvider;
  model: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: "json" | "text";
}

export interface AIInferenceResponse {
  content: string;
  model: string;
  provider: AIProvider;
  tokensUsed: number;
  cost: number;
  latencyMs: number;
}

/**
 * Get the default provider from env or fallback to openai
 */
export function getDefaultProvider(): AIProvider {
  const provider = process.env.NEXT_PUBLIC_AI_PROVIDER || "openai";
  if (!["openai", "anthropic", "gemini"].includes(provider)) {
    console.warn(
      `Invalid provider: ${provider}. Defaulting to openai.`
    );
    return "openai";
  }
  return provider as AIProvider;
}

/**
 * Get the default model from env
 */
export function getDefaultModel(): string {
  return process.env.NEXT_PUBLIC_AI_MODEL || "gpt-4-turbo";
}

/**
 * Validate that we have required API keys
 */
export function validateApiKeys(): boolean {
  const provider = getDefaultProvider();

  switch (provider) {
    case "openai":
      return !!process.env.OPENAI_API_KEY;
    case "anthropic":
      return !!process.env.ANTHROPIC_API_KEY;
    case "gemini":
      return !!process.env.GOOGLE_API_KEY;
    default:
      return false;
  }
}

/**
 * Call OpenAI API
 */
export async function callOpenAI(
  request: AIInferenceRequest
): Promise<AIInferenceResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const startTime = Date.now();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 1000,
      ...(request.responseFormat === "json" && {
        response_format: { type: "json_object" },
      }),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message}`);
  }

  const data = await response.json();
  const latencyMs = Date.now() - startTime;

  const tokensUsed =
    (data.usage?.prompt_tokens || 0) + (data.usage?.completion_tokens || 0);

  // Rough cost estimation (GPT-4 pricing)
  const costPer1kPromptTokens = request.model.includes("gpt-4")
    ? 0.03
    : 0.0015;
  const costPer1kCompletionTokens = request.model.includes("gpt-4")
    ? 0.06
    : 0.002;
  const cost =
    ((data.usage?.prompt_tokens || 0) * costPer1kPromptTokens) / 1000 +
    ((data.usage?.completion_tokens || 0) * costPer1kCompletionTokens) / 1000;

  return {
    content: data.choices[0].message.content,
    model: data.model,
    provider: "openai",
    tokensUsed,
    cost,
    latencyMs,
  };
}

/**
 * Call Anthropic API
 */
export async function callAnthropic(
  request: AIInferenceRequest
): Promise<AIInferenceResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const startTime = Date.now();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: request.model,
      max_tokens: request.maxTokens ?? 1000,
      messages: request.messages.map((msg) => ({
        role: msg.role === "system" ? "user" : msg.role,
        content: msg.content,
      })),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Anthropic API error: ${error.error?.message}`);
  }

  const data = await response.json();
  const latencyMs = Date.now() - startTime;

  const tokensUsed =
    (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0);

  // Rough cost estimation (Claude 3)
  const costPer1kInputTokens = 0.008;
  const costPer1kOutputTokens = 0.024;
  const cost =
    ((data.usage?.input_tokens || 0) * costPer1kInputTokens) / 1000 +
    ((data.usage?.output_tokens || 0) * costPer1kOutputTokens) / 1000;

  return {
    content: data.content[0].text,
    model: data.model,
    provider: "anthropic",
    tokensUsed,
    cost,
    latencyMs,
  };
}

/**
 * Call Google Gemini API
 */
export async function callGemini(
  request: AIInferenceRequest
): Promise<AIInferenceResponse> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not set");
  }

  const startTime = Date.now();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${request.model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: request.messages.map((m) => m.content).join("\n"),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: request.temperature ?? 0.7,
          maxOutputTokens: request.maxTokens ?? 1000,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gemini API error: ${error.error?.message}`);
  }

  const data = await response.json();
  const latencyMs = Date.now() - startTime;

  // Gemini doesn't always return token counts
  const tokensUsed = data.usageMetadata?.totalTokenCount || 0;
  const cost = tokensUsed * 0.0000075; // ~$7.50 per 1M tokens

  return {
    content: data.candidates[0].content.parts[0].text,
    model: request.model,
    provider: "gemini",
    tokensUsed,
    cost,
    latencyMs,
  };
}

/**
 * Main inference function. Routes to the correct provider.
 */
export async function inference(
  request: AIInferenceRequest
): Promise<AIInferenceResponse> {
  const provider = request.provider || getDefaultProvider();

  switch (provider) {
    case "openai":
      return callOpenAI(request);
    case "anthropic":
      return callAnthropic(request);
    case "gemini":
      return callGemini(request);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

/**
 * Validate response against a Zod schema
 */
export function validateStructuredOutput<T>(
  content: string,
  schema: z.ZodSchema<T>
): T {
  const parsed = JSON.parse(content);
  return schema.parse(parsed);
}
