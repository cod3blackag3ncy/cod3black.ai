/**
 * API Route: /api/inquiry
 * Handles project inquiry form submissions
 * - Validates input & estimates scope/pricing
 * - Sends auto-response email to client
 * - Sends internal notification to team
 * - Rate limited to prevent spam
 */

import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map();

function isRateLimited(ip) {
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

function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>]/g, '');
}

function sanitizeArray(values) {
  if (!Array.isArray(values)) return [];
  return values.map((value) => sanitizeInput(value)).filter(Boolean);
}

function normalizeInquiryPayload(payload) {
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

function validateInquiryPayload(payload) {
  const errors = [];

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

// Email template for client
function generateClientEmail(data, estimate) {
  const monthlyRate = estimate.monthlyRate.toLocaleString();
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { margin: 20px 0; }
    .section-title { font-weight: 600; color: #2563eb; margin-bottom: 10px; }
    .estimate-box { background: white; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .estimate-row { display: flex; justify-content: space-between; margin: 10px 0; }
    .footer { font-size: 12px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ Thanks for Your Inquiry, ${data.name}!</h1>
      <p>We've received your project request and are reviewing the details.</p>
    </div>
    
    <div class="content">
      <div class="section">
        <p>Here's what we got from your submission:</p>
      </div>
      
      <div class="section">
        <div class="section-title">Project Overview</div>
        <p><strong>${data.projectName}</strong></p>
        <p>${data.description}</p>
      </div>
      
      <div class="section">
        <div class="section-title">Quick Estimate</div>
        <div class="estimate-box">
          <div class="estimate-row">
            <span><strong>Tier:</strong></span>
            <span>${estimate.tier}</span>
          </div>
          <div class="estimate-row">
            <span><strong>Complexity:</strong></span>
            <span>${estimate.complexity}</span>
          </div>
          <div class="estimate-row">
            <span><strong>Estimated Hours:</strong></span>
            <span>${estimate.estimatedHours}</span>
          </div>
          <div class="estimate-row">
            <span><strong>Timeline:</strong></span>
            <span>${estimate.estimatedDuration}</span>
          </div>
          <div class="estimate-row" style="border-top: 1px solid #eee; padding-top: 10px; margin-top: 10px;">
            <span><strong>Monthly Retainer:</strong></span>
            <span style="font-size: 1.2em; color: #2563eb;"><strong>$${monthlyRate}</strong></span>
          </div>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 10px;">
          ${estimate.disclaimer}
        </p>
      </div>
      
      <div class="section">
        <div class="section-title">What Happens Next</div>
        <ol style="padding-left: 20px;">
          <li><strong>Within 24 hours:</strong> We review your project details and refine the estimate</li>
          <li><strong>Within 48 hours:</strong> We call you to discuss scope, timeline, and next steps</li>
          <li><strong>Within 1 week:</strong> We send a formal proposal with detailed breakdown</li>
        </ol>
      </div>
      
      <div class="section">
        <p style="background: #eef2ff; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
          Questions? Reply to this email or call us. We're here to help!
        </p>
      </div>
      
      <div class="footer">
        <p>Cod3Black Agency | hello@c3bai.com | Production-Grade Software & Web Design</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// Email template for internal team
function generateInternalEmail(data, estimate) {
  const monthlyRate = estimate.monthlyRate.toLocaleString();
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: monospace; color: #333; background: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; }
    .header { background: #2563eb; color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f0f0f0; font-weight: bold; }
    .highlight { background: #fffacd; font-weight: bold; }
    .section-header { background: #f9fafb; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎯 NEW INQUIRY: ${data.projectName}</h2>
      <p>Client: ${data.name} | Estimate: <strong>$${monthlyRate}/mo</strong></p>
      <p>Received: ${new Date().toLocaleString()}</p>
    </div>
    
    <table>
      <tr class="section-header">
        <td colspan="2">CONTACT INFO</td>
      </tr>
      <tr>
        <td><strong>Name</strong></td>
        <td>${data.name}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td><a href="mailto:${data.email}">${data.email}</a></td>
      </tr>
      <tr>
        <td><strong>Company</strong></td>
        <td>${data.company || 'N/A'}</td>
      </tr>
      <tr>
        <td><strong>Website</strong></td>
        <td>${data.website ? `<a href="${data.website}">${data.website}</a>` : 'N/A'}</td>
      </tr>
      <tr>
        <td><strong>Contact Method</strong></td>
        <td>${data.contactMethod || 'N/A'}</td>
      </tr>
      
      <tr class="section-header">
        <td colspan="2">PROJECT BASICS</td>
      </tr>
      <tr>
        <td><strong>Project Name</strong></td>
        <td class="highlight">${data.projectName}</td>
      </tr>
      <tr>
        <td><strong>Type</strong></td>
        <td>${data.projectType}</td>
      </tr>
      <tr>
        <td><strong>Description</strong></td>
        <td>${data.description}</td>
      </tr>
      <tr>
        <td><strong>Problem</strong></td>
        <td>${data.problemStatement}</td>
      </tr>
      
      <tr class="section-header">
        <td colspan="2">SCOPE & REQUIREMENTS</td>
      </tr>
      <tr>
        <td><strong>Design Scope</strong></td>
        <td>${data.designScope || 'Not specified'}</td>
      </tr>
      <tr>
        <td><strong>Database</strong></td>
        <td>${data.databaseNeeded || 'Not specified'}</td>
      </tr>
      <tr>
        <td><strong>Integrations</strong></td>
        <td>${data.integrationCount ? data.integrationCount + ' (' + data.integrationTypes.join(', ') + ')' : 'None'}</td>
      </tr>
      <tr>
        <td><strong>Deployment</strong></td>
        <td>${data.deploymentRequirements?.join(', ') || 'Not specified'}</td>
      </tr>
      <tr>
        <td><strong>Special Requirements</strong></td>
        <td>${data.specialRequirements?.join(', ') || 'None'}</td>
      </tr>
      
      <tr class="section-header">
        <td colspan="2">TIMELINE & BUDGET</td>
      </tr>
      <tr>
        <td><strong>Timeline</strong></td>
        <td>${data.timeline}</td>
      </tr>
      <tr>
        <td><strong>Budget</strong></td>
        <td>${data.budgetExpectation}</td>
      </tr>
      
      <tr class="section-header">
        <td colspan="2">TEAM & TECH</td>
      </tr>
      <tr>
        <td><strong>Team Level</strong></td>
        <td>${data.teamLevel}</td>
      </tr>
      <tr>
        <td><strong>Tech Stack</strong></td>
        <td>${data.techStack || 'Not specified'}</td>
      </tr>
      <tr>
        <td><strong>Existing Code</strong></td>
        <td>${data.existingCode || 'None'}</td>
      </tr>
      
      <tr class="section-header">
        <td colspan="2">ESTIMATE</td>
      </tr>
      <tr>
        <td><strong>Tier</strong></td>
        <td class="highlight">${estimate.tier}</td>
      </tr>
      <tr>
        <td><strong>Complexity</strong></td>
        <td>${estimate.complexity}</td>
      </tr>
      <tr>
        <td><strong>Hours</strong></td>
        <td>${estimate.estimatedHours}</td>
      </tr>
      <tr>
        <td><strong>Monthly Rate</strong></td>
        <td class="highlight"><strong>$${monthlyRate}</strong></td>
      </tr>
      <tr>
        <td><strong>Partner Qualified</strong></td>
        <td>${estimate.isPartnerQualified ? '✓ YES' : 'No'}</td>
      </tr>
      
      ${data.additionalInfo ? `
      <tr class="section-header">
        <td colspan="2">ADDITIONAL INFO</td>
      </tr>
      <tr>
        <td colspan="2">${data.additionalInfo}</td>
      </tr>
      ` : ''}
    </table>
    
    <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 4px;">
      <p><strong>🚀 NEXT STEPS:</strong></p>
      <ol>
        <li>Review this inquiry and the preliminary estimate</li>
        <li>Reach out to ${data.name} within 24 hours</li>
        <li>Schedule discovery call</li>
        <li>Send formal proposal</li>
      </ol>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request) {
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
    const inquiryId = 'inq_' + Date.now();
    
    // Send emails asynchronously (don't block response)
    const sendEmails = async () => {
      if (!resend) {
        console.log('Resend not configured - skipping email');
        return;
      }

      try {
        // Email to prospect
        await resend.emails.send({
          from: 'Cod3Black Agency <noreply@c3bai.com>',
          to: formData.email,
          subject: `✨ Project Estimate: ${formData.projectName}`,
          html: generateClientEmail(formData, estimate),
          reply_to: 'hello@c3bai.com'
        });

        // Email to internal team
        const internalEmail = process.env.INTERNAL_EMAIL || 'hello@c3bai.com';
        await resend.emails.send({
          from: 'Cod3Black Inquiry System <noreply@c3bai.com>',
          to: internalEmail,
          subject: `🎯 NEW INQUIRY: ${formData.projectName} - $${estimate.monthlyRate.toLocaleString()}/mo`,
          html: generateInternalEmail(formData, estimate),
        });

        console.log('✅ Emails sent:', {
          inquiryId,
          clientEmail: formData.email,
          projectName: formData.projectName,
          estimate: estimate.monthlyRate,
          timestamp: new Date().toISOString(),
        });
      } catch (emailError) {
        console.error('❌ Email error:', emailError);
      }
    };

    // Fire and forget - send emails in background
    sendEmails().catch(err => console.error('Async email error:', err));

    return Response.json({
      success: true,
      inquiryId,
      estimate,
      message: 'Inquiry submitted! Check your email for confirmation and preliminary estimate.',
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
function estimateProjectScope(data) {
  let estimatedHours = 20;
  let tier = 'Starter';
  let complexity = 'simple';
  let hourlyRate = 125;

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
  const isPartnerQualified = data.partnerQualification && data.partnerQualification !== 'none';
  if (isPartnerQualified) {
    hourlyRate = 65;
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
    monthlyRate = isPartnerQualified ? 10400 : 20000;
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
