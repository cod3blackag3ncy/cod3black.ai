# Email Consultation Setup Guide

## Overview

The consultation system now automatically emails you when someone submits their project plan. This guide walks you through setting up Gmail to send these notifications.

## How It Works

1. Founder submits project plan at `/consultation`
2. AI analyzes the plan
3. Email automatically sent to `cod3blackagency@gmail.com` with:
   - Full project plan
   - AI analysis results
   - Complexity rating
   - Funding estimate
   - Timeline
4. You follow up within 24 hours
5. Lead moves to proposal/discussion stage

## Setup Instructions

### Step 1: Generate Gmail App Password

Gmail requires a 16-character app-specific password for security.

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with `cod3blackagency@gmail.com`
3. Select "Mail" and "Windows Computer" (or your device)
4. Google will generate a 16-character password
5. **Copy this password** (you'll need it next)

Example: `abcd efgh ijkl mnop` (but real one)

### Step 2: Add Password to .env.local

Edit `.env.local` in your project root:

```env
GMAIL_EMAIL=cod3blackagency@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Important:** Replace `abcdefghijklmnop` with your actual 16-character password (no spaces).

### Step 3: Restart Dev Server

```bash
npm run dev
```

### Step 4: Test It

1. Go to http://localhost:3000/consultation
2. Submit a test plan
3. Check your inbox at `cod3blackagency@gmail.com`
4. You should receive an email with the submission details

## Email Content

When someone submits a consultation, you'll receive an email containing:

```
Subject: 🎯 New AI Consultation Submission

[Project Plan Text]
[Uploaded File Name - if applicable]
[Estimated Complexity: Simple/Moderate/Complex]
[Funding Estimate: $X-$Y]
[Timeline: X months]

Next Steps:
1. Review the consultation submission
2. Check if it's a good fit for your services
3. Follow up with the founder
4. Track this lead in your CRM
```

## Deployment to Vercel

When deploying to Vercel, add the same environment variables:

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   - `GMAIL_EMAIL` = `cod3blackagency@gmail.com`
   - `GMAIL_APP_PASSWORD` = Your 16-char password

Then redeploy.

## Troubleshooting

### "Email service not configured" error

**Cause:** `.env.local` is missing or incomplete

**Solution:**
1. Check `.env.local` exists
2. Verify `GMAIL_EMAIL` and `GMAIL_APP_PASSWORD` are present
3. Restart dev server: `npm run dev`

### "Authentication failed" or "Invalid credentials"

**Cause:** Gmail app password is incorrect

**Solution:**
1. Go back to https://myaccount.google.com/apppasswords
2. Generate a new password
3. Update `.env.local`
4. Restart dev server

### Email not arriving after 1 minute

**Cause:** Gmail might have delivery delay, or email is spam filtered

**Solution:**
1. Check spam/promotions folder
2. Add `cod3blackagency@gmail.com` to contacts
3. Check Gmail account activity: https://myaccount.google.com/security
4. Try resubmitting a test consultation

### "Less secure app access" error

**Cause:** You used regular password instead of app password

**Solution:**
1. Delete the entry in `.env.local`
2. Generate a NEW app-specific password (see Step 1)
3. Use ONLY the app-specific password, not your regular Gmail password

## Email Notifications Settings

You can customize email notifications in `lib/email.ts`:

### What gets emailed:
- Project plan (first 1000 chars)
- File name (if uploaded)
- Complexity rating
- Funding estimate
- Timeline

### HTML email template:
- Professional formatting
- Next steps reminder
- Timestamp

## Optional: Add Confirmation Email to Submitter

The code supports sending a confirmation email to the submitter (disabled by default). To enable:

1. Edit `app/api/consultation/route.ts`
2. Uncomment the confirmation email call:
   ```typescript
   // After sendConsultationEmail, add:
   // await sendConfirmationEmail(
   //   "submitter@email.com",
   //   "Their Project Name"
   // );
   ```

However, this requires the submitter's email, which isn't currently captured. You'd need to update the form to collect it.

## Best Practices

### Follow-up Process:

1. **Within 1 hour:** Skim the email, get a feel for the project
2. **Within 24 hours:** 
   - Send personalized follow-up
   - Use template from CONSULTATION_GUIDE.md
   - Include your Calendly link
3. **Within 72 hours:** 
   - If no response, send gentle reminder
4. **Track in CRM:** 
   - Add to your pipeline
   - Set follow-up reminders
   - Tag as "consultation"

### Template Email:

```
Subject: Your AI Project Analysis - [Project Name]

Hi [Name],

Thanks for submitting your project plan for analysis.

I reviewed your submission and [specific compliment/insight].

Quick thoughts:
1. [Key finding 1]
2. [Key finding 2]
3. [Next step]

Do you have 15 minutes for a call this week?
[Calendly link]

Best,
[Your name]
```

## Monitoring

### What to track:

- Number of submissions per week
- Conversion rate (submissions → discussions)
- Average complexity of projects
- Average funding estimates
- Lead source (if using multiple channels)

### Email monitoring:

- Check spam folder weekly
- Create a label/filter for consultations
- Use "Important" star for high-quality leads

## Security Notes

- ⚠️ Never commit `.env.local` to git (it's in `.gitignore`)
- ⚠️ Never share your Gmail app password
- ⚠️ App password only works for this app
- ✓ Regular Gmail password stays secure
- ✓ Can revoke app password anytime

## Turning Off Email Notifications

If you don't want email notifications:

1. Remove `GMAIL_EMAIL` and `GMAIL_APP_PASSWORD` from `.env.local`
2. The system will gracefully skip email sending
3. Consultations will still work (just no email alert)

## Advanced: Webhook or Email Service

If Gmail SMTP isn't ideal, you can use:

**Resend** (modern, serverless):
```bash
npm install resend
```
Then replace `nodemailer` calls with Resend API.

**SendGrid**:
Similar approach with SendGrid SDK.

**AWS SES**:
For high volume, cost-effective option.

See `lib/email.ts` for integration points.

---

## Quick Checklist

- [ ] Have `cod3blackagency@gmail.com` Gmail account
- [ ] Generated app-specific password
- [ ] Added to `.env.local`
- [ ] Restarted dev server
- [ ] Tested with sample submission
- [ ] Got email in inbox
- [ ] Deployed to Vercel with same env vars
- [ ] Tested live site
- [ ] Set up follow-up process
- [ ] Ready to take consultations

---

**You're ready to receive consultation submissions!**

Every submission will be emailed to you within seconds.

Follow up within 24 hours and start closing projects.
