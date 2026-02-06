/**
 * API Route: /api/inquiry
 * Handles project inquiry form submissions
 * Estimates scope and pricing for web design, apps, software, and custom projects
 * 
 * Email Templates: Deeply branded Cod3Black Agency emails
 * - Client: Welcome email with process explanation
 * - Team: Notification with all details and action items
 */

import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';

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

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || '');
}

function sanitizeInput(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>]/g, '');
}

function sanitizeArray(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return values.map((value) => sanitizeInput(value)).filter(Boolean);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeUrl(url: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    return parsed.href;
  } catch {
    return '';
  }
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

function getFirstName(fullName: string): string {
  return fullName.split(' ')[0] || fullName;
}

function formatProjectType(type: string): string {
  const typeMap: Record<string, string> = {
    'website': 'Website / Landing Page',
    'web-app': 'Web Application',
    'mobile-app': 'Mobile App (iOS/Android)',
    'mvp': 'MVP / Prototype',
    'redesign': 'Website Redesign',
    'integration': 'System Integration',
    'automation': 'Automation / AI Tools',
    'ecommerce': 'E-commerce / Online Store'
  };
  return typeMap[type] || type;
}

function getEstimateBucket(hours: number): string {
  if (hours <= 12) return 'Quick Fix (4-12 hours)';
  if (hours <= 40) return 'Small Project (16-40 hours)';
  return 'Full App (40-120+ hours)';
}

function generateClientEmail(formData: InquiryPayload, estimate: Estimate): string {
  const firstName = getFirstName(formData.name);
  const projectType = formatProjectType(formData.projectType);
  const rateText = estimate.isPartnerQualified 
    ? `$${estimate.hourlyRate}/hr <span style="color:#10B981;font-weight:700;">(Friends &amp; Family Rate!)</span>` 
    : `$${estimate.hourlyRate}/hr`;
  
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no">
  <title>We got your inquiry — Cod3Black Agency</title>
  <!--[if mso]>
    <style type="text/css">
      body, table, td { font-family: Arial, sans-serif !important; }
    </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F6F8FB;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    Thanks for reaching out to Cod3Black Agency! Here's what happens next: discovery call → clear quote → we build. Questions? Call (404) 789-9960.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#F6F8FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background-color:#FFFFFF;border:1px solid #E6EAF0;border-radius:14px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #6366F1 100%);padding:28px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, sans-serif;">
                    <div style="font-size:28px;line-height:32px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">
                      ⚡ Cod3Black Agency
                    </div>
                    <div style="font-size:14px;line-height:20px;color:rgba(255,255,255,0.9);margin-top:6px;">
                      Professional software development — built to ship
                    </div>
                  </td>
                  <td align="right" valign="top" style="font-family:Arial, sans-serif;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:rgba(255,255,255,0.15);border-radius:8px;padding:10px 14px;">
                          <div style="font-size:11px;line-height:14px;color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.5px;">Call or Text</div>
                          <a href="tel:+14047899960" style="font-size:16px;line-height:20px;color:#FFFFFF;text-decoration:none;font-weight:700;">(404) 789-9960</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, sans-serif;color:#111827;">
                    
                    <!-- Greeting -->
                    <h1 style="margin:0 0 16px 0;font-size:24px;line-height:30px;font-weight:800;color:#111827;">
                      Thanks, ${firstName}! We received your inquiry.
                    </h1>

                    <p style="margin:0 0 20px 0;font-size:15px;line-height:24px;color:#374151;">
                      We appreciate you reaching out to <strong>Cod3Black Agency</strong>. This email confirms we've received your project request for <strong>"${formData.projectName}"</strong> and we'll be in touch within 24 hours.
                    </p>

                    <!-- Your Project Summary -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                      <tr>
                        <td style="background:linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);border:1px solid #C7D2FE;border-radius:12px;padding:20px;">
                          <div style="font-size:14px;line-height:18px;color:#3730A3;font-weight:800;margin-bottom:12px;">
                            📋 YOUR PROJECT SUMMARY
                          </div>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#374151;padding:4px 0;">
                                <strong>Project:</strong> ${formData.projectName}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#374151;padding:4px 0;">
                                <strong>Type:</strong> ${projectType}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#374151;padding:4px 0;">
                                <strong>Timeline:</strong> ${formData.timeline}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#374151;padding:4px 0;">
                                <strong>We'll contact you via:</strong> ${formData.contactMethod}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Preliminary Estimate -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                      <tr>
                        <td style="background-color:#F0FDF4;border:2px solid #86EFAC;border-radius:12px;padding:20px;">
                          <div style="font-size:14px;line-height:18px;color:#166534;font-weight:800;margin-bottom:12px;">
                            💰 PRELIMINARY ESTIMATE
                          </div>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#374151;padding:4px 0;">
                                <strong>Estimated Hours:</strong> ~${estimate.estimatedHours} hours
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#374151;padding:4px 0;">
                                <strong>Your Rate:</strong> ${rateText}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#374151;padding:4px 0;">
                                <strong>Estimated Timeline:</strong> ${estimate.estimatedDuration}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#374151;padding:4px 0;">
                                <strong>Estimated Investment:</strong> $${(estimate.estimatedHours * estimate.hourlyRate).toLocaleString()}
                              </td>
                            </tr>
                          </table>
                          <div style="margin-top:12px;padding-top:12px;border-top:1px solid #86EFAC;font-size:12px;line-height:18px;color:#166534;font-style:italic;">
                            ${estimate.disclaimer}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- What Happens Next -->
                    <h2 style="margin:0 0 12px 0;font-size:18px;line-height:24px;font-weight:800;color:#111827;">
                      🚀 What Happens Next
                    </h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #E5E7EB;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="40" valign="top" style="font-size:20px;font-weight:800;color:#3B82F6;">1</td>
                              <td style="font-size:14px;line-height:22px;color:#374151;">
                                <strong style="color:#111827;">Discovery Call</strong> — We'll schedule a quick 15-30 minute call to understand your goals, users, and must-have features. This helps us give you an accurate quote.
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #E5E7EB;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="40" valign="top" style="font-size:20px;font-weight:800;color:#3B82F6;">2</td>
                              <td style="font-size:14px;line-height:22px;color:#374151;">
                                <strong style="color:#111827;">Clear Quote &amp; Plan</strong> — Within 24-48 hours after our call, you'll receive a detailed scope document with exact pricing, timeline, and deliverables. No surprises.
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="40" valign="top" style="font-size:20px;font-weight:800;color:#3B82F6;">3</td>
                              <td style="font-size:14px;line-height:22px;color:#374151;">
                                <strong style="color:#111827;">Build &amp; Ship</strong> — Once approved, we start building. You'll get regular progress updates and a clean handoff when complete.
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- How to Prepare -->
                    <h2 style="margin:0 0 12px 0;font-size:18px;line-height:24px;font-weight:800;color:#111827;">
                      📝 How to Prepare for Our Call
                    </h2>
                    <p style="margin:0 0 12px 0;font-size:14px;line-height:22px;color:#374151;">
                      The more details you can share, the more accurate our quote will be. Here's what helps:
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                      <tr>
                        <td style="background-color:#FFFBEB;border:1px solid #FCD34D;border-radius:12px;padding:16px;">
                          <ul style="margin:0;padding-left:20px;font-size:14px;line-height:24px;color:#374151;">
                            <li style="margin-bottom:8px;"><strong>Features:</strong> What should it do? (login, payments, booking, dashboard, notifications, etc.)</li>
                            <li style="margin-bottom:8px;"><strong>Users:</strong> Who will use it and what do they need to accomplish?</li>
                            <li style="margin-bottom:8px;"><strong>Examples:</strong> Any websites or apps you like that we can reference?</li>
                            <li style="margin-bottom:8px;"><strong>Existing assets:</strong> Do you have a logo, brand colors, content, or images ready?</li>
                            <li><strong>Integrations:</strong> Any tools this needs to connect to? (Stripe, Square, Calendly, Google Sheets, CRM, etc.)</li>
                          </ul>
                        </td>
                      </tr>
                    </table>

                    <!-- Pricing Reference -->
                    <h2 style="margin:0 0 12px 0;font-size:18px;line-height:24px;font-weight:800;color:#111827;">
                      💵 Our Pricing (Transparent & Simple)
                    </h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                      <tr>
                        <td style="border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="background-color:#F9FAFB;padding:12px 16px;border-bottom:1px solid #E5E7EB;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="font-size:13px;line-height:18px;color:#374151;font-weight:700;">Standard Rate</td>
                                    <td align="right" style="font-size:16px;line-height:20px;color:#111827;font-weight:800;">$125/hour</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="background-color:#ECFDF5;padding:12px 16px;border-bottom:1px solid #A7F3D0;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="font-size:13px;line-height:18px;color:#065F46;font-weight:700;">Friends &amp; Family Rate</td>
                                    <td align="right" style="font-size:16px;line-height:20px;color:#065F46;font-weight:800;">$65/hour</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding:12px 16px;font-size:12px;line-height:18px;color:#6B7280;">
                                <strong>Quick Fixes:</strong> 4-12 hours ($500-$1,500)<br>
                                <strong>Small Projects:</strong> 16-40 hours ($2K-$5K)<br>
                                <strong>Full Apps:</strong> 40-120+ hours ($5K-$15K+)
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                      <tr>
                        <td align="center">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="background:linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);border-radius:10px;">
                                <a href="https://c3bai.vercel.app" style="display:inline-block;padding:14px 28px;font-family:Arial, sans-serif;font-size:15px;line-height:18px;color:#FFFFFF;text-decoration:none;font-weight:700;">
                                  Visit Our Website →
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Questions -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                      <tr>
                        <td style="background-color:#F3F4F6;border-radius:12px;padding:20px;text-align:center;">
                          <div style="font-size:16px;line-height:22px;color:#111827;font-weight:700;margin-bottom:8px;">
                            Questions before our call?
                          </div>
                          <div style="font-size:14px;line-height:22px;color:#374151;">
                            Reply to this email or call/text us anytime:
                          </div>
                          <div style="margin-top:12px;">
                            <a href="tel:+14047899960" style="font-size:20px;line-height:26px;color:#2563EB;text-decoration:none;font-weight:800;">(404) 789-9960</a>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Signature -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid #E5E7EB;padding-top:20px;">
                      <tr>
                        <td style="font-family:Arial, sans-serif;">
                          <div style="font-size:15px;line-height:22px;color:#111827;font-weight:800;">
                            — The Cod3Black Team
                          </div>
                          <div style="margin-top:8px;font-size:13px;line-height:20px;color:#6B7280;">
                            <strong>Phone:</strong> <a href="tel:+14047899960" style="color:#2563EB;text-decoration:none;">(404) 789-9960</a><br>
                            <strong>Email:</strong> <a href="mailto:hello@mail.codewithsolo.com" style="color:#2563EB;text-decoration:none;">hello@mail.codewithsolo.com</a><br>
                            <strong>Website:</strong> <a href="https://c3bai.vercel.app" style="color:#2563EB;text-decoration:none;">c3bai.vercel.app</a>
                          </div>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#1E293B;padding:20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, sans-serif;text-align:center;">
                    <div style="font-size:13px;line-height:18px;color:rgba(255,255,255,0.8);">
                      © 2026 Cod3Black Agency — Custom websites, apps &amp; software
                    </div>
                    <div style="margin-top:8px;font-size:12px;line-height:16px;color:rgba(255,255,255,0.6);">
                      You received this because you submitted an inquiry at c3bai.vercel.app
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateTeamNotificationEmail(formData: InquiryPayload, estimate: Estimate, inquiryId: string): string {
  const timestamp = new Date().toLocaleString('en-US', { 
    dateStyle: 'medium', 
    timeStyle: 'short',
    timeZone: 'America/New_York'
  });
  
  const qualificationStatus = estimate.isPartnerQualified ? 'Friends & Family ($65/hr)' : 'Standard ($125/hr)';
  const qualificationBadgeColor = estimate.isPartnerQualified ? '#10B981' : '#6B7280';
  const estimateBucket = getEstimateBucket(estimate.estimatedHours);
  
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no">
  <title>New Inquiry: ${formData.projectName}</title>
  <!--[if mso]>
    <style type="text/css">
      body, table, td { font-family: Arial, sans-serif !important; }
    </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F6F8FB;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    New lead: ${formData.name} inquired about ${formData.projectName}. Estimated ${estimate.estimatedHours}h at ${qualificationStatus}. Reply within 24h.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#F6F8FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background-color:#FFFFFF;border:1px solid #E6EAF0;border-radius:14px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#0F172A;padding:20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, sans-serif;">
                    <div style="font-size:20px;line-height:26px;font-weight:800;color:#FFFFFF;">
                      🔔 NEW INQUIRY
                    </div>
                    <div style="font-size:13px;line-height:18px;color:#94A3B8;margin-top:4px;">
                      ${timestamp} EST • ID: ${inquiryId}
                    </div>
                  </td>
                  <td align="right" style="font-family:Arial, sans-serif;">
                    <span style="display:inline-block;padding:8px 14px;border-radius:999px;background-color:${qualificationBadgeColor};color:#FFFFFF;font-size:12px;line-height:14px;font-weight:700;">
                      ${qualificationStatus}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, sans-serif;color:#111827;">

                    <!-- Contact Info -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
                      <tr>
                        <td style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:16px;">
                          <div style="font-size:13px;line-height:16px;color:#64748B;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
                            👤 CONTACT
                          </div>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="font-size:18px;line-height:24px;color:#0F172A;font-weight:800;padding-bottom:8px;">
                                ${formData.name}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#475569;">
                                <strong>Email:</strong> <a href="mailto:${formData.email}" style="color:#2563EB;text-decoration:none;">${formData.email}</a><br>
                                <strong>Company:</strong> ${formData.company || 'Not provided'}<br>
                                <strong>Website:</strong> ${formData.website ? `<a href="${formData.website}" style="color:#2563EB;text-decoration:none;">${formData.website}</a>` : 'Not provided'}<br>
                                <strong>Preferred Contact:</strong> ${formData.contactMethod}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Project Details -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
                      <tr>
                        <td style="background:linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);border:1px solid #C7D2FE;border-radius:12px;padding:16px;">
                          <div style="font-size:13px;line-height:16px;color:#4338CA;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
                            📋 PROJECT DETAILS
                          </div>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="font-size:16px;line-height:22px;color:#0F172A;font-weight:800;padding-bottom:8px;">
                                ${formData.projectName}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:14px;line-height:22px;color:#475569;">
                                <strong>Type:</strong> ${formatProjectType(formData.projectType)}<br>
                                <strong>Timeline:</strong> ${formData.timeline}<br>
                                <strong>Budget:</strong> ${formData.budgetExpectation}<br>
                                <strong>Design Scope:</strong> ${formData.designScope || 'Not specified'}<br>
                                <strong>Database:</strong> ${formData.databaseNeeded || 'Not specified'}<br>
                                <strong>Integrations:</strong> ${formData.integrationCount || 'None'} ${formData.integrationTypes.length ? `(${formData.integrationTypes.join(', ')})` : ''}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Problem Statement -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
                      <tr>
                        <td style="border:1px solid #E2E8F0;border-radius:12px;padding:16px;">
                          <div style="font-size:13px;line-height:16px;color:#64748B;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
                            🎯 PROBLEM STATEMENT
                          </div>
                          <div style="font-size:14px;line-height:22px;color:#374151;">
                            ${formData.problemStatement}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Description -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
                      <tr>
                        <td style="border:1px solid #E2E8F0;border-radius:12px;padding:16px;">
                          <div style="font-size:13px;line-height:16px;color:#64748B;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
                            📝 PROJECT DESCRIPTION
                          </div>
                          <div style="font-size:14px;line-height:22px;color:#374151;white-space:pre-line;">
${formData.description}
                          </div>
                        </td>
                      </tr>
                    </table>

                    ${formData.additionalInfo ? `
                    <!-- Additional Info -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
                      <tr>
                        <td style="border:1px solid #E2E8F0;border-radius:12px;padding:16px;">
                          <div style="font-size:13px;line-height:16px;color:#64748B;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
                            💬 ADDITIONAL NOTES
                          </div>
                          <div style="font-size:14px;line-height:22px;color:#374151;">
                            ${formData.additionalInfo}
                          </div>
                        </td>
                      </tr>
                    </table>` : ''}

                    <!-- Estimate Summary -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
                      <tr>
                        <td style="background-color:#F0FDF4;border:2px solid #86EFAC;border-radius:12px;padding:16px;">
                          <div style="font-size:13px;line-height:16px;color:#166534;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
                            💰 AUTO-ESTIMATE
                          </div>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="50%" style="font-size:14px;line-height:22px;color:#374151;vertical-align:top;">
                                <strong>Hours:</strong> ~${estimate.estimatedHours}h<br>
                                <strong>Size:</strong> ${estimateBucket}<br>
                                <strong>Complexity:</strong> ${estimate.complexity}
                              </td>
                              <td width="50%" style="font-size:14px;line-height:22px;color:#374151;vertical-align:top;">
                                <strong>Rate:</strong> $${estimate.hourlyRate}/hr<br>
                                <strong>Est. Total:</strong> $${(estimate.estimatedHours * estimate.hourlyRate).toLocaleString()}<br>
                                <strong>Timeline:</strong> ${estimate.estimatedDuration}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    ${estimate.isPartnerQualified ? `
                    <!-- Partner Details -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
                      <tr>
                        <td style="background-color:#ECFDF5;border:1px solid #A7F3D0;border-radius:12px;padding:16px;">
                          <div style="font-size:13px;line-height:16px;color:#065F46;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
                            🤝 PARTNER QUALIFICATION
                          </div>
                          <div style="font-size:14px;line-height:22px;color:#374151;">
                            <strong>Qualification:</strong> ${formData.partnerQualification}<br>
                            ${formData.partnerDetails ? `<strong>Details:</strong> ${formData.partnerDetails}` : ''}
                          </div>
                        </td>
                      </tr>
                    </table>` : ''}

                    <!-- Action Items -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
                      <tr>
                        <td style="background-color:#FEF3C7;border:2px solid #FCD34D;border-radius:12px;padding:16px;">
                          <div style="font-size:13px;line-height:16px;color:#92400E;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
                            ⚡ ACTION ITEMS
                          </div>
                          <ol style="margin:0;padding-left:20px;font-size:14px;line-height:24px;color:#374151;">
                            <li><strong>Reply within 24 hours</strong> to schedule discovery call</li>
                            <li><strong>Verify qualification</strong> if Friends &amp; Family rate claimed</li>
                            <li><strong>Prepare 3-5 discovery questions</strong> about users, features, success metrics</li>
                            <li><strong>Identify key risks:</strong> integrations, auth, payments, migrations</li>
                          </ol>
                        </td>
                      </tr>
                    </table>

                    <!-- Quick Reply Button -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="background-color:#2563EB;border-radius:10px;">
                                <a href="mailto:${formData.email}?subject=Cod3Black%20Agency%20—%20Let's%20Schedule%20Your%20Discovery%20Call&body=Hi%20${encodeURIComponent(getFirstName(formData.name))}%2C%0A%0AThanks%20for%20your%20inquiry%20about%20${encodeURIComponent(formData.projectName)}!%20I'd%20love%20to%20schedule%20a%20quick%2015-30%20minute%20call%20to%20discuss%20your%20project.%0A%0AWhat%20times%20work%20best%20for%20you%20this%20week%3F%0A%0ABest%2C%0ACod3Black%20Team%0A(404)%20789-9960" style="display:inline-block;padding:14px 28px;font-family:Arial, sans-serif;font-size:15px;line-height:18px;color:#FFFFFF;text-decoration:none;font-weight:700;">
                                  📧 Reply to ${getFirstName(formData.name)}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F1F5F9;padding:16px 24px;border-top:1px solid #E2E8F0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, sans-serif;font-size:12px;line-height:18px;color:#64748B;">
                    <strong>Cod3Black Agency</strong> • Internal Notification<br>
                    Phone: (404) 789-9960 • Website: c3bai.vercel.app
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    // Origin validation (CSRF protection)
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://c3bai.vercel.app',
      'https://www.c3bai.vercel.app',
      'http://localhost:3000'
    ];
    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed.replace('www.', '')))) {
      return Response.json({
        success: false,
        error: 'Invalid request origin.'
      }, { status: 403 });
    }

    // Rate limiting (uses Upstash Redis in production, in-memory fallback for dev)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rateLimitResult = await checkRateLimit(ip);
    if (!rateLimitResult.success) {
      return Response.json({
        success: false,
        error: 'Too many requests. Please wait a minute and try again.'
      }, { status: 429 });
    }

    const rawPayload = await request.json();
    
    // Honeypot check (hidden field that bots fill)
    if (rawPayload.website2 || rawPayload.phone2) {
      // Silent success for bots - don't reveal detection
      return Response.json({
        success: true,
        inquiryId: 'inq_' + Date.now(),
        message: 'Inquiry submitted.'
      }, { status: 200 });
    }
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

    // Generate inquiry ID
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
    const resend = getResend();
    
    // Send both emails independently so one failure doesn't block the other
    const [clientEmailResult, teamEmailResult] = await Promise.allSettled([
      // Send branded confirmation email to prospect
      resend.emails.send({
        from: 'Cod3Black Agency <hello@mail.codewithsolo.com>',
        to: formData.email,
        subject: `Thanks for your inquiry — ${formData.projectName}`,
        html: generateClientEmail(formData, estimate),
      }),
      // Send detailed notification to team
      resend.emails.send({
        from: 'Cod3Black System <hello@mail.codewithsolo.com>',
        to: 'cod3blackagency@gmail.com',
        subject: `🔔 New Inquiry: ${formData.projectName} — ${formData.name} (${estimate.isPartnerQualified ? 'F&F' : 'Standard'})`,
        html: generateTeamNotificationEmail(formData, estimate, inquiryId),
      }),
    ]);

    // Log results for debugging
    if (clientEmailResult.status === 'rejected') {
      console.error('Client email failed:', clientEmailResult.reason);
    } else {
      console.log('Client email sent:', clientEmailResult.value);
    }
    
    if (teamEmailResult.status === 'rejected') {
      console.error('Team email failed:', teamEmailResult.reason);
    } else {
      console.log('Team email sent:', teamEmailResult.value);
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
