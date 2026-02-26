/**
 * Email template generation for inquiry responses
 */

export function generateAutoResponseEmail(inquiry, estimate) {
  const { name, projectType, budgetExpectation } = inquiry;
  
  return {
    subject: `Thanks ${name}! We got your ${projectType} inquiry`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #0066cc; margin-bottom: 20px;">Thanks for the inquiry!</h2>
        
        <p style="margin-bottom: 15px;">Hi ${name},</p>
        
        <p style="margin-bottom: 15px;">
          We received your project inquiry and are excited to learn more about your <strong>${projectType}</strong> project.
        </p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="margin-top: 0; color: #0066cc;">Preliminary Estimate</h3>
          <ul style="list-style: none; padding: 0; margin: 15px 0;">
            <li style="padding: 8px 0;"><strong>Complexity:</strong> ${estimate.complexity}</li>
            <li style="padding: 8px 0;"><strong>Estimated Hours:</strong> ${estimate.estimatedHours}</li>
            <li style="padding: 8px 0;"><strong>Estimated Duration:</strong> ${estimate.estimatedDuration}</li>
            <li style="padding: 8px 0;"><strong>Hourly Rate:</strong> $${estimate.hourlyRate}/hr</li>
            <li style="padding: 8px 0; font-weight: bold; font-size: 18px; color: #0066cc; padding-top: 15px;">Monthly: $${estimate.monthlyRate.toLocaleString()}</li>
          </ul>
          <p style="font-size: 12px; color: #666; margin-top: 15px; margin-bottom: 0;">
            ${estimate.disclaimer}
          </p>
        </div>
        
        <h3 style="color: #333; margin-top: 30px; margin-bottom: 15px;">What Happens Next</h3>
        <ol style="line-height: 1.8; color: #555;">
          <li><strong>Within 24 hours:</strong> We review your details and validate our estimates</li>
          <li><strong>Within 48 hours:</strong> We call to confirm scope and answer questions</li>
          <li><strong>Follow-up:</strong> Formal quote via email (valid for 30 days)</li>
        </ol>
        
        <p style="margin-top: 30px; margin-bottom: 10px; color: #555;">
          Have questions? Reply directly to this email or call us.
        </p>
        
        <div style="border-top: 2px solid #eee; padding-top: 20px; margin-top: 30px; color: #999; font-size: 12px;">
          <p style="margin: 5px 0;">
            <strong>Cod3Black Agency</strong><br>
            Custom web design, apps, and software<br>
            $125/hour transparent pricing
          </p>
        </div>
      </div>
    `
  };
}

export function generateInternalNotificationEmail(inquiry, estimate, inquiryId) {
  const { name, email, company, projectName, projectType, budgetExpectation, contactMethod } = inquiry;
  
  return {
    subject: `[NEW INQUIRY] ${projectName} - ${projectType} from ${name}`,
    html: `
      <div style="font-family: monospace; max-width: 800px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <h2 style="color: #0066cc;">New Project Inquiry</h2>
        
        <div style="background: white; padding: 15px; border-left: 4px solid #0066cc; margin: 15px 0;">
          <p><strong>ID:</strong> ${inquiryId}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Contact Method:</strong> ${contactMethod || 'Not specified'}</p>
          <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <h3>Project Details</h3>
        <p><strong>Project Name:</strong> ${projectName}</p>
        <p><strong>Type:</strong> ${projectType}</p>
        <p><strong>Description:</strong> ${inquiry.description}</p>
        <p><strong>Problem Statement:</strong> ${inquiry.problemStatement}</p>
        
        <h3>Estimate</h3>
        <p><strong>Complexity:</strong> ${estimate.complexity}</p>
        <p><strong>Estimated Hours:</strong> ${estimate.estimatedHours}</p>
        <p><strong>Tier:</strong> ${estimate.tier}</p>
        <p><strong>Monthly Rate:</strong> $${estimate.monthlyRate.toLocaleString()}</p>
        ${estimate.isPartnerQualified ? `<p style="color: #0066cc; font-weight: bold;">⭐ PARTNER QUALIFIED (Rate: $${estimate.hourlyRate}/hr)</p>` : ''}
        
        <h3>Additional Info</h3>
        <p><strong>Budget Expectation:</strong> ${budgetExpectation}</p>
        <p><strong>Timeline:</strong> ${inquiry.timeline}</p>
        <p><strong>Team Level:</strong> ${inquiry.teamLevel || 'Not specified'}</p>
        <p><strong>Tech Stack Preference:</strong> ${inquiry.techStack || 'No preference'}</p>
        
        ${inquiry.additionalInfo ? `<p><strong>Additional Notes:</strong> ${inquiry.additionalInfo}</p>` : ''}
        
        <div style="background: #fffbf0; padding: 15px; border-left: 4px solid #ff9500; margin-top: 20px;">
          <strong>Next Steps:</strong>
          <ol>
            <li>Review and validate this inquiry</li>
            <li>Schedule follow-up call within 48 hours</li>
            <li>Send formal quote within 30 days</li>
          </ol>
        </div>
      </div>
    `
  };
}
