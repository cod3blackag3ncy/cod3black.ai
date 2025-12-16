import nodemailer from "nodemailer";

/**
 * Email service for consultation submissions
 * Uses Gmail SMTP with app-specific password
 */

interface ConsultationEmailData {
  plan: string;
  fileName?: string;
  complexity?: string;
  fundingEstimate?: string;
  timeline?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Get email transporter
 */
function getTransporter() {
  const email = process.env.GMAIL_EMAIL;
  const password = process.env.GMAIL_APP_PASSWORD;

  if (!email || !password) {
    console.warn(
      "Gmail credentials not configured. Email notifications disabled."
    );
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });
}

/**
 * Send consultation submission email
 */
export async function sendConsultationEmail(
  data: ConsultationEmailData
): Promise<EmailResponse> {
  try {
    const transporter = getTransporter();

    if (!transporter) {
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    const adminEmail = process.env.GMAIL_EMAIL;
    if (!adminEmail) {
      return {
        success: false,
        error: "Admin email not configured",
      };
    }

    // Create email content
    const emailHtml = `
    <h2>New Consultation Submission</h2>
    
    <h3>Project Plan:</h3>
    <p style="white-space: pre-wrap; font-family: monospace; background: #f5f5f5; padding: 10px; border-radius: 5px;">
      ${escapeHtml(data.plan)}
    </p>
    
    ${
      data.fileName
        ? `<p><strong>Uploaded File:</strong> ${escapeHtml(data.fileName)}</p>`
        : ""
    }
    
    ${
      data.complexity
        ? `<p><strong>Estimated Complexity:</strong> ${escapeHtml(data.complexity)}</p>`
        : ""
    }
    
    ${
      data.fundingEstimate
        ? `<p><strong>Funding Estimate:</strong> ${escapeHtml(data.fundingEstimate)}</p>`
        : ""
    }
    
    ${
      data.timeline
        ? `<p><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>`
        : ""
    }
    
    <hr>
    <p>
      <strong>Next Steps:</strong><br>
      1. Review the consultation submission above<br>
      2. Check if it's a good fit for your services<br>
      3. Follow up with the founder (use the template in CONSULTATION_GUIDE.md)<br>
      4. Track this lead in your CRM
    </p>
    
    <p style="color: #666; font-size: 12px;">
      This email was sent from your Code3BlackAgency consultation system.<br>
      Timestamp: ${new Date().toISOString()}
    </p>
    `;

    const result = await transporter.sendMail({
      from: adminEmail,
      to: adminEmail,
      replyTo: adminEmail,
      subject: "🎯 New AI Consultation Submission",
      html: emailHtml,
      text: `New Consultation Submission\n\n${data.plan}`,
    });

    console.log("Consultation email sent:", result.messageId);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Failed to send consultation email:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send confirmation email to submitter (optional)
 */
export async function sendConfirmationEmail(
  toEmail: string,
  _projectName?: string
): Promise<EmailResponse> {
  try {
    const transporter = getTransporter();

    if (!transporter) {
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    const adminEmail = process.env.GMAIL_EMAIL;
    if (!adminEmail) {
      return {
        success: false,
        error: "Admin email not configured",
      };
    }

    const emailHtml = `
    <h2>Consultation Received</h2>
    
    <p>Thank you for submitting your project plan for AI analysis.</p>
    
    <p>We've received your submission and will review it carefully. Our team will reach out within 24 hours with feedback and next steps.</p>
    
    <p><strong>What to expect:</strong></p>
    <ul>
      <li>Detailed feasibility assessment</li>
      <li>AI integration opportunities</li>
      <li>Estimated timeline and investment</li>
      <li>Discussion about your project</li>
    </ul>
    
    <p>In the meantime, feel free to check out our:</p>
    <ul>
      <li><a href="https://code3black.ai/projects">Real Projects</a></li>
      <li><a href="https://code3black.ai/capabilities">Capabilities</a></li>
      <li><a href="https://code3black.ai/demo">Live Demo</a></li>
    </ul>
    
    <p>Questions? Reply to this email and we'll get back to you shortly.</p>
    
    <p>Best regards,<br>Code3BlackAgency<br>Building Production AI Systems</p>
    `;

    const result = await transporter.sendMail({
      from: adminEmail,
      to: toEmail,
      subject: "Your AI Project Consultation - We're Reviewing",
      html: emailHtml,
      text: "Thank you for submitting your project plan. We'll review it and reach out within 24 hours.",
    });

    console.log("Confirmation email sent:", result.messageId);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Failed to send confirmation email:", error);

    // Don't fail the submission if confirmation email fails
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Escape HTML to prevent injection
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
