/**
 * API Route: /api/inquiry
 * Handles project inquiry form submissions
 * Estimates scope and pricing for web design, apps, software, and custom projects
 */

import { NextRequest } from 'next/server';
import { Resend } from 'resend';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface InquiryPayload {
  projectName: string;
  description: string;
  problemStatement: string;
  projectType: string;
  designScope: string;
  integrationCount: string;
  databaseNeeded: string;
  integrationTypes: string[];
  deploymentRequirements: string[];
  timeline: string;
  budgetExpectation: string;
  techStack: string;
  existingCode: string;
  teamLevel: string;
  specialRequirements: string[];
  name: string;
  email: string;
  company: string;
  website: string;
  contactMethod: string;
  additionalInfo: string;
  partnerQualification: string;
  partnerDetails: string;
}

interface Estimate {
  estimatedHours: number;
  tier: string;
  complexity: string;
  hourlyRate: number;
  isPartnerQualified: boolean;
  monthlyRate: number;
  hoursPerMonth: number;
  setupFee: number;
  estimatedDuration: string;
  disclaimer: string;
  partnerSavings: number | null;
}

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, RateLimitEntry>();

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || '');
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

function sanitizeInput(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>]/g, '');
}

function sanitizeArray(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return values.map((value) => sanitizeInput(value)).filter(Boolean);
}

function normalizeInquiryPayload(payload: Partial<InquiryPayload>): InquiryPayload {
  return {
    projectName: sanitizeInput(payload.projectName),
    description: sanitizeInput(payload.description),
    problemStatement: sanitizeInput(payload.problemStatement),
    projectType: sanitizeInput(payload.projectType),
    designScope: sanitizeInput(payload.designScope),
    integrationCount: sanitizeInput(payload.integrationCount),
    databaseNeeded: sanitizeInput(payload.databaseNeeded),
    integrationTypes: sanitizeArray(payload.integrationTypes),
    deploymentRequirements: sanitizeArray(payload.deploymentRequirements),
    timeline: sanitizeInput(payload.timeline),
    budgetExpectation: sanitizeInput(payload.budgetExpectation),
    techStack: sanitizeInput(payload.techStack),
    existingCode: sanitizeInput(payload.existingCode),
    teamLevel: sanitizeInput(payload.teamLevel),
    specialRequirements: sanitizeArray(payload.specialRequirements),
    name: sanitizeInput(payload.name),
    email: sanitizeInput(payload.email).toLowerCase(),
    company: sanitizeInput(payload.company),
    website: sanitizeInput(payload.website),
    contactMethod: sanitizeInput(payload.contactMethod),
    additionalInfo: sanitizeInput(payload.additionalInfo),
    partnerQualification: sanitizeInput(payload.partnerQualification),
    partnerDetails: sanitizeInput(payload.partnerDetails)
  };
}

function validateInquiryPayload(payload: InquiryPayload): string[] {
  const errors: string[] = [];

  if (!payload.projectName) errors.push('Project name is required.');
  if (!payload.description) errors.push('Project description is required.');
  if (!payload.problemStatement) errors.push('Problem statement is required.');
  if (!payload.projectType) errors.push('Project type is required.');
  if (!payload.timeline) errors.push('Timeline is required.');
  if (!payload.budgetExpectation) errors.push('Budget expectation is required.');
  if (!payload.name) errors.push('Name is required.');
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.push('A valid email address is required.');
  }

  if (payload.website && !/^https?:\/\//i.test(payload.website)) {
    errors.push('Website must start with http:// or https://');
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return Response.json({
        success: false,
        error: 'Too many requests. Please wait a minute and try again.'
      }, { status: 429 });
    }

    const rawPayload = await request.json();
    const formData = normalizeInquiryPayload(rawPayload || {});
    const validationErrors = validateInquiryPayload(formData);
    if (validationErrors.length > 0) {
      return Response.json({
        success: false,
        error: validationErrors[0]
      }, { status: 400 });
    }

    // Generate estimate
    const estimate = estimateProjectScope(formData);

    // In a real implementation, save to database here
    // For now, just log and return success
    const inquiryId = 'inq_' + Date.now();
    
    console.log('New inquiry received:', {
      inquiryId,
      projectName: formData.projectName,
      projectType: formData.projectType,
      email: formData.email,
      estimate,
      timestamp: new Date().toISOString(),
    });

    // Send email notifications via Resend
    try {
      const resend = getResend();
      // Send confirmation email to prospect
      await resend.emails.send({
        from: 'Cod3Black <hello@c3bai.com>',
        to: formData.email,
        subject: `Thanks for your inquiry - ${formData.projectName}`,
        html: `
          <h1>Thanks for reaching out, ${formData.name}!</h1>
          <p>We received your project inquiry for <strong>${formData.projectName}</strong>.</p>
          
          <h2>Your Preliminary Estimate</h2>
          <ul>
            <li><strong>Project Type:</strong> ${formData.projectType}</li>
            <li><strong>Estimated Hours:</strong> ${estimate.estimatedHours} hours</li>
            <li><strong>Rate:</strong> $${estimate.hourlyRate}/hour${estimate.isPartnerQualified ? ' (Friends & Family Rate!)' : ''}</li>
            <li><strong>Estimated Timeline:</strong> ${estimate.estimatedDuration}</li>
          </ul>
          
          <p><em>${estimate.disclaimer}</em></p>
          
          <h2>What Happens Next</h2>
          <ol>
            <li>We'll review your project details (within 24 hours)</li>
            <li>We'll reach out via ${formData.contactMethod} to discuss</li>
            <li>You'll receive a final quote by email</li>
          </ol>
          
          <p>Questions? Just reply to this email.</p>
          <p>— The Cod3Black Team</p>
        `,
      });

      // Send notification to team
      await resend.emails.send({
        from: 'Cod3Black System <hello@c3bai.com>',
        to: 'hello@c3bai.com',
        subject: `New Inquiry: ${formData.projectName} - ${formData.name}`,
        html: `
          <h1>New Project Inquiry</h1>
          <p><strong>Inquiry ID:</strong> ${inquiryId}</p>
          
          <h2>Contact</h2>
          <ul>
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Company:</strong> ${formData.company || 'Not provided'}</li>
            <li><strong>Preferred Contact:</strong> ${formData.contactMethod}</li>
          </ul>
          
          <h2>Project Details</h2>
          <ul>
            <li><strong>Project:</strong> ${formData.projectName}</li>
            <li><strong>Type:</strong> ${formData.projectType}</li>
            <li><strong>Description:</strong> ${formData.description}</li>
            <li><strong>Timeline:</strong> ${formData.timeline}</li>
            <li><strong>Budget:</strong> ${formData.budgetExpectation}</li>
          </ul>
          
          <h2>Estimate</h2>
          <ul>
            <li><strong>Hours:</strong> ${estimate.estimatedHours}</li>
            <li><strong>Rate:</strong> $${estimate.hourlyRate}/hour</li>
            <li><strong>Partner Qualified:</strong> ${estimate.isPartnerQualified ? 'Yes' : 'No'}</li>
            <li><strong>Timeline:</strong> ${estimate.estimatedDuration}</li>
          </ul>
          
          ${formData.additionalInfo ? `<h2>Additional Notes</h2><p>${formData.additionalInfo}</p>` : ''}
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails - log and continue
    }

    return Response.json({
      success: true,
      inquiryId,
      estimate,
      message: 'Inquiry submitted. We will review and contact you within 24 hours.',
    }, { status: 200 });

  } catch (error) {
    console.error('Inquiry submission error:', error);
    return Response.json({
      success: false,
      error: 'Failed to submit inquiry. Please try again.',
    }, { status: 500 });
  }
}

/**
 * Estimate project scope based on form responses
 * Works for: websites, web apps, mobile apps, integrations, redesigns, MVPs
 */
function estimateProjectScope(data: InquiryPayload): Estimate {
  let estimatedHours = 20; // baseline
  let tier = 'Starter';
  let complexity = 'simple';
  let hourlyRate = 125; // default rate

  // Project type baseline
  if (data.projectType === 'website') estimatedHours = 20;
  if (data.projectType === 'web-app') estimatedHours = 60;
  if (data.projectType === 'mobile-app') estimatedHours = 100;
  if (data.projectType === 'mvp') estimatedHours = 40;
  if (data.projectType === 'redesign') estimatedHours = 30;
  if (data.projectType === 'integration') estimatedHours = 20;

  // Design scope impact
  if (data.designScope === 'moderate') estimatedHours += 15;
  if (data.designScope === 'custom') {
    estimatedHours += 40;
    complexity = 'moderate';
  }

  // Database/backend impact
  if (data.databaseNeeded === 'simple') estimatedHours += 10;
  if (data.databaseNeeded === 'complex') {
    estimatedHours += 30;
    complexity = 'complex';
  }

  // Integration complexity
  if (data.integrationCount === '1-2') estimatedHours += 5;
  if (data.integrationCount === '3-5') estimatedHours += 15;
  if (data.integrationCount === '5-plus') {
    estimatedHours += 30;
    complexity = 'complex';
  }

  // Mobile platforms
  const platforms = data.deploymentRequirements || [];
  if (platforms.includes('ios')) estimatedHours += 30;
  if (platforms.includes('android')) estimatedHours += 30;

  // Team level adjustment
  if (data.teamLevel === 'non-tech') estimatedHours += 10;

  // Special requirements
  if (data.specialRequirements?.includes('compliance')) estimatedHours += 20;
  if (data.specialRequirements?.includes('performance')) estimatedHours += 15;
  if (data.specialRequirements?.includes('seo')) estimatedHours += 10;
  if (data.specialRequirements?.includes('training')) estimatedHours += 15;

  // Determine tier based on total hours
  if (estimatedHours > 60 && estimatedHours <= 100) {
    tier = 'Professional';
    complexity = 'moderate';
  } else if (estimatedHours > 100) {
    tier = 'Enterprise';
    complexity = 'complex';
  }

  // Cap at reasonable values
  if (estimatedHours > 250) estimatedHours = 250;

  // Check partner qualification for discount
  const isPartnerQualified: boolean = Boolean(data.partnerQualification && data.partnerQualification !== 'none');
  if (isPartnerQualified) {
    hourlyRate = 65; // Partner rate
  }

  // Calculate pricing tiers with appropriate rates
  const starterHours = 20;
  const proHours = 60;
  const enterpriseHours = 160;

  let monthlyRate, setupFee, hoursPerMonth;

  if (tier === 'Starter') {
    monthlyRate = Math.ceil((starterHours * hourlyRate) / 100) * 100;
    setupFee = monthlyRate;
    hoursPerMonth = starterHours;
  } else if (tier === 'Professional') {
    monthlyRate = Math.ceil((proHours * hourlyRate) / 100) * 100;
    setupFee = isPartnerQualified ? 3000 : 5000;
    hoursPerMonth = proHours;
  } else {
    monthlyRate = isPartnerQualified ? 10400 : 20000; // 160 hours × $65 or $125
    setupFee = isPartnerQualified ? 10400 : 20000;
    hoursPerMonth = enterpriseHours;
  }

  return {
    estimatedHours: Math.ceil(estimatedHours / 10) * 10,
    tier,
    complexity,
    hourlyRate,
    isPartnerQualified,
    monthlyRate,
    hoursPerMonth,
    setupFee,
    estimatedDuration: (
      estimatedHours <= 40 ? '2-4 weeks' :
      estimatedHours <= 80 ? '4-8 weeks' :
      estimatedHours <= 160 ? '8-16 weeks' :
      '16+ weeks'
    ),
    disclaimer: 'This is a rough estimate based on your responses. We will refine during our discovery call.',
    partnerSavings: isPartnerQualified ? Math.ceil((starterHours * 60 * 12)) : null,
  };
}
