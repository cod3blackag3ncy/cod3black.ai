import { NextRequest, NextResponse } from "next/server";
import { inference, validateStructuredOutput } from "@/lib/ai";
import { z } from "zod";

/**
 * Demo API endpoint.
 * Accepts text input, generates structured AI response.
 * Demonstrates:
 * - Real AI inference
 * - JSON schema validation
 * - Error handling
 * - Latency tracking
 */

const CaptionResponseSchema = z.object({
  caption: z.string().describe("The generated caption"),
  hashtags: z.array(z.string()).describe("Suggested hashtags"),
  tone: z.enum(["professional", "casual", "humorous", "inspirational"]),
  engagementScore: z.number().min(0).max(100),
});

type CaptionResponse = z.infer<typeof CaptionResponseSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, style = "casual" } = body;

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "topic is required and must be a string" },
        { status: 400 }
      );
    }

    if (topic.length > 500) {
      return NextResponse.json(
        { error: "topic must be less than 500 characters" },
        { status: 400 }
      );
    }

    // Build the prompt for AI
    const systemPrompt = `You are an expert social media content strategist.
Generate engaging, original social media captions.
Always respond with valid JSON matching this exact schema:
{
  "caption": "string",
  "hashtags": ["string"],
  "tone": "professional" | "casual" | "humorous" | "inspirational",
  "engagementScore": number between 0-100
}`;

    const userPrompt = `Generate a caption for this content: "${topic}"
Style preference: ${style}
The caption should be concise, engaging, and suitable for platforms like Instagram, LinkedIn, or Twitter.`;

    // Call the AI
    const aiResponse = await inference({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      maxTokens: 300,
      responseFormat: "json",
    });

    // Parse and validate the structured output
    let parsed: CaptionResponse;
    try {
      parsed = validateStructuredOutput(aiResponse.content, CaptionResponseSchema);
    } catch (validationError) {
      return NextResponse.json(
        { error: "Invalid response format from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: parsed,
      metadata: {
        model: aiResponse.model,
        provider: aiResponse.provider,
        tokensUsed: aiResponse.tokensUsed,
        estimatedCost: `$${aiResponse.cost.toFixed(4)}`,
        latencyMs: aiResponse.latencyMs,
      },
    });
  } catch (error) {
    console.error("Demo API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Check if it's an auth error
    if (errorMessage.includes("API key") || errorMessage.includes("unauthorized")) {
      return NextResponse.json(
        {
          error: "AI API not configured. Set your API keys in environment variables.",
          hint: "See .env.example for required variables",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/demo",
    method: "POST",
    description:
      "Generate AI-powered social media captions with structured output",
    request: {
      topic: "string (required) - The content to caption",
      style: "string (optional) - casual, professional, humorous, inspirational",
    },
    response: {
      success: "boolean",
      data: {
        caption: "string",
        hashtags: "string[]",
        tone: "string",
        engagementScore: "number",
      },
      metadata: {
        model: "string",
        provider: "string",
        tokensUsed: "number",
        estimatedCost: "string",
        latencyMs: "number",
      },
    },
    example: {
      request: {
        topic: "Just launched our new AI product",
        style: "professional",
      },
      response: {
        success: true,
        data: {
          caption: "Excited to announce...",
          hashtags: ["#AI", "#Innovation"],
          tone: "professional",
          engagementScore: 78,
        },
        metadata: {
          model: "gpt-4-turbo",
          provider: "openai",
          tokensUsed: 124,
          estimatedCost: "$0.0042",
          latencyMs: 1203,
        },
      },
    },
  });
}
