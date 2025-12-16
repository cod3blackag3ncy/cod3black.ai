import { NextRequest, NextResponse } from "next/server";
import { inference, validateStructuredOutput } from "@/lib/ai";
import { sendConsultationEmail } from "@/lib/email";
import { z } from "zod";

/**
 * Consultation API endpoint.
 * Analyzes project plans for feasibility, complexity, AI integration, and funding.
 * Accepts text plan or uploaded document.
 */

const PlanAnalysisSchema = z.object({
  problemStatement: z
    .string()
    .describe("Clear analysis of the problem being solved"),
  targetAudience: z
    .string()
    .describe("Description of target market and audience"),
  aiUseCases: z
    .array(z.string())
    .describe("Specific ways AI should be integrated"),
  technicalFeasibility: z
    .string()
    .describe("Assessment of technical feasibility and approach"),
  estimatedComplexity: z
    .enum(["simple", "moderate", "complex"])
    .describe("Project complexity assessment"),
  recommendedStack: z
    .array(z.string())
    .describe("Recommended technology stack"),
  nextSteps: z
    .array(z.string())
    .describe("Recommended next steps for execution"),
  fundingEstimate: z
    .string()
    .describe("Estimated investment range needed"),
  timeline: z
    .string()
    .describe("Realistic timeline estimate"),
  risks: z
    .array(z.string())
    .describe("Key risks and mitigation strategies"),
});

type PlanAnalysis = z.infer<typeof PlanAnalysisSchema>;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const plan = formData.get("plan") as string;
    const file = formData.get("file") as File | null;

    if (!plan || plan.trim().length < 50) {
      return NextResponse.json(
        { error: "Project plan must be at least 50 characters" },
        { status: 400 }
      );
    }

    if (plan.length > 5000) {
      return NextResponse.json(
        { error: "Project plan must be less than 5000 characters" },
        { status: 400 }
      );
    }

    // Extract file content if provided
    let fileContent = "";
    if (file) {
      const fileText = await file.text();
      fileContent = fileText.substring(0, 2000); // First 2000 chars of file
    }

    // Build the analysis prompt
    const systemPrompt = `You are an expert AI systems architect and startup advisor.
Your role is to deeply analyze project plans submitted by serious founders and developers.
Provide honest, actionable analysis that helps them understand:
- Technical feasibility
- AI integration opportunities
- Realistic complexity and investment needed
- Clear next steps

Always respond with valid JSON matching this exact schema:
{
  "problemStatement": "string",
  "targetAudience": "string",
  "aiUseCases": ["string"],
  "technicalFeasibility": "string",
  "estimatedComplexity": "simple|moderate|complex",
  "recommendedStack": ["string"],
  "nextSteps": ["string"],
  "fundingEstimate": "string",
  "timeline": "string",
  "risks": ["string"]
}`;

    const userPrompt = `ANALYZE THIS PROJECT PLAN:

PROJECT DESCRIPTION:
${plan}

${fileContent ? `\nADDITIONAL DOCUMENT CONTENT:\n${fileContent}` : ""}

Provide a thorough analysis covering:

1. PROBLEM & OPPORTUNITY: What is this really solving? Is the problem well-defined?

2. TARGET MARKET: Who are the customers? Is the market large enough?

3. AI INTEGRATION: Where should AI be used? What specific models/techniques fit?

4. TECHNICAL FEASIBILITY: Can this be built? What are the technical challenges?

5. COMPLEXITY: Rate as simple (MVP in 1-2 months), moderate (3-6 months), or complex (6+ months)

6. TECH STACK: Recommend specific technologies based on requirements

7. INVESTMENT NEEDED: Be realistic. Include team, infrastructure, API costs, development time.

8. TIMELINE: Realistic months to MVP, then to production

9. RISKS: What could go wrong? How to mitigate?

10. NEXT STEPS: Specific actions to take before starting development

Be honest about feasibility. If something seems under-scoped or over-ambitious, say so.
This analysis helps serious founders make better decisions.`;

    // Call the AI
    const aiResponse = await inference({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      maxTokens: 2500,
      responseFormat: "json",
    });

    // Parse and validate the structured output
    let analysis: PlanAnalysis;
    try {
      analysis = validateStructuredOutput(
        aiResponse.content,
        PlanAnalysisSchema
      );
    } catch (validationError) {
      console.error("Validation error:", validationError);
      return NextResponse.json(
        { error: "Invalid response format from AI analysis" },
        { status: 500 }
      );
    }

    // Send email notification to admin
    const fileName = file?.name || undefined;
    await sendConsultationEmail({
      plan: plan.substring(0, 1000), // Truncate for email
      fileName,
      complexity: analysis.estimatedComplexity,
      fundingEstimate: analysis.fundingEstimate,
      timeline: analysis.timeline,
    });

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        model: aiResponse.model,
        provider: aiResponse.provider,
        tokensUsed: aiResponse.tokensUsed,
        estimatedCost: `$${aiResponse.cost.toFixed(4)}`,
        latencyMs: aiResponse.latencyMs,
      },
      emailSent: true,
    });
  } catch (error) {
    console.error("Consultation API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("API key") || errorMessage.includes("401")) {
      return NextResponse.json(
        {
          error: "AI service not available. Please try again later.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/consultation",
    method: "POST",
    description:
      "Analyze project plans for feasibility, complexity, AI integration, and funding",
    request: {
      plan: "string (required) - Project plan description (50-5000 chars)",
      file: "file (optional) - Uploaded document (PDF, DOCX, TXT)",
    },
    response: {
      success: "boolean",
      analysis: {
        problemStatement: "string",
        targetAudience: "string",
        aiUseCases: "string[]",
        technicalFeasibility: "string",
        estimatedComplexity: "simple|moderate|complex",
        recommendedStack: "string[]",
        nextSteps: "string[]",
        fundingEstimate: "string",
        timeline: "string",
        risks: "string[]",
      },
      metadata: {
        model: "string",
        provider: "string",
        tokensUsed: "number",
        estimatedCost: "string",
        latencyMs: "number",
      },
    },
  });
}
