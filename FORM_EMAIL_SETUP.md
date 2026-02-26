# Form Email Setup Guide

## ✅ STATUS
Email notifications are now **fully integrated** into the form submission system!

When a client fills out the inquiry form, you'll automatically receive:
1. **Auto-response email to client** - Confirms receipt + shows preliminary estimate
2. **Internal notification to you** - Full project details for review

---

## 🚀 SETUP (2 minutes)

### Step 1: Get Resend API Key
1. Go to https://resend.com/api-keys
2. Create a new API key (or use existing)
3. Copy the key: `re_xxxxxxxxxxxxxxxxxxxx`

### Step 2: Set Environment Variable
Add to `.env.local` in your project root:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
INTERNAL_EMAIL=hello@c3bai.com
```

**Replace:**
- `re_xxxxxxxxxxxxxxxxxxxx` with your actual Resend API key
- `hello@c3bai.com` with your email where you want inquiries sent

### Step 3: Deploy
```bash
git push origin main
```

That's it! Vercel will automatically pick up the environment variables.

---

## 📧 WHAT CLIENTS RECEIVE

When a client submits the form, they get an email like this:

**Subject:** ✨ Project Estimate: [Their Project Name]

**Contains:**
- Personalized greeting with their name
- Project overview (name, description)
- **Quick Estimate** box with:
  - Tier (Starter/Professional/Enterprise)
  - Complexity (simple/moderate/complex)
  - Estimated hours
  - Timeline
  - **Monthly retainer cost** (highlighted)
- Disclaimer about estimate accuracy
- Clear "What Happens Next" timeline:
  - Within 24 hours: Review & refine
  - Within 48 hours: Phone call
  - Within 1 week: Formal proposal
- Call-to-action to reply or call

---

## 📊 WHAT YOU RECEIVE

When a client submits, you get an email with:

**Subject:** 🎯 NEW INQUIRY: [Project Name] - $[Monthly Cost]/mo

**Contains detailed table with:**
- Contact info (name, email, company, website, contact method)
- Project basics (name, type, description, problem statement)
- Scope & requirements (design scope, database needs, integrations, deployment)
- Timeline & budget expectations
- Team & tech (team level, tech stack, existing code)
- Estimate breakdown (tier, complexity, hours, monthly rate, partner status)
- Additional info (if provided)
- Action items for next steps

---

## 🧪 TEST THE FORM

### Local Testing
```bash
npm run dev
# Open http://localhost:3000
```

Fill out the form and submit. Check for errors in the console.

**Note:** Without `RESEND_API_KEY` set locally, emails won't send - but form will still submit successfully.

### Production Testing
1. Deploy to Vercel with `RESEND_API_KEY` set
2. Fill out form at https://c3bai.vercel.app
3. **Check both** your inbox and the client email address you provided

---

## 🔧 HOW IT WORKS

### Form Flow
```
Client fills form
    ↓
Submits to /api/inquiry
    ↓
API validates input
    ↓
Generates scope estimate
    ↓
Returns success immediately
    ↓
Background: Sends 2 emails
    ├─ Client confirmation + estimate
    └─ Internal notification (your email)
```

### Email Templates
Located in `app/api/inquiry/route.js`:
- `generateClientEmail()` - Professional, client-facing
- `generateInternalEmail()` - Detailed table format for team

Both are **HTML emails** with proper styling.

---

## 🛡️ SECURITY & VALIDATION

The form includes:
- **Rate limiting**: Max 5 submissions per IP per minute
- **Input sanitization**: Removes dangerous characters
- **Email validation**: Checks for valid email format
- **Required fields**: Enforces all mandatory fields
- **URL validation**: Ensures website URLs start with http(s)://

---

## 📋 ENVIRONMENT VARIABLES

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `RESEND_API_KEY` | ✅ Yes | None | Email sending service key |
| `INTERNAL_EMAIL` | ⚠️ Optional | hello@c3bai.com | Where to send inquiries |

### Local Development
Create `.env.local`:
```env
RESEND_API_KEY=re_test_key_for_dev
INTERNAL_EMAIL=your-email@example.com
```

### Production (Vercel)
Set in Vercel dashboard → Project Settings → Environment Variables

---

## 🚨 TROUBLESHOOTING

### Emails not sending?

**Check:**
1. Is `RESEND_API_KEY` set?
   ```bash
   # In Vercel dashboard, check Environment Variables
   ```

2. Is the key valid?
   - Go to https://resend.com/api-keys
   - Check key status (should be active)

3. Check Vercel logs:
   - Go to Vercel dashboard
   - View deployment logs
   - Look for "Emails sent successfully" or error messages

### Client getting email but not getting estimate?

Check that form is returning `estimate` object. Look for "estimatedHours", "tier", "monthlyRate" in email.

### Email went to spam?

- Resend has good deliverability, but check spam folder
- Make sure `RESEND_API_KEY` is valid/verified
- Check Resend sender domain is configured

---

## 💻 CODE SNIPPETS

### Manually send email (if needed)
```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Your Name <noreply@c3bai.com>',
  to: 'recipient@example.com',
  subject: 'Your Subject',
  html: '<p>Your HTML content</p>'
});
```

### Check if email succeeded
```javascript
try {
  const result = await resend.emails.send({...});
  console.log('✅ Email sent:', result.id);
} catch (error) {
  console.error('❌ Email failed:', error);
}
```

---

## 📚 RESEND DOCS

- **Getting Started**: https://resend.com/docs
- **API Reference**: https://resend.com/docs/api-reference/emails/send
- **Best Practices**: https://resend.com/docs/best-practices
- **Email Templates**: https://resend.com/templates

---

## ✨ NEXT IMPROVEMENTS

- [ ] Save submissions to database (for record keeping)
- [ ] Add Slack notification when form submitted
- [ ] Allow bulk email downloads (CSV)
- [ ] Template customization in dashboard
- [ ] A/B test different email templates
- [ ] Track email opens & clicks

---

## 📞 SUPPORT

**Form questions?** Check `app/inquiry-form.jsx`  
**Email template issues?** Check `app/api/inquiry/route.js`  
**Resend API problems?** Visit https://resend.com/help

---

## STATUS CHECKLIST

- [x] Form collects all necessary data
- [x] Form validates before submission
- [x] API estimates project scope & pricing
- [x] Client receives confirmation email with estimate
- [x] You receive detailed inquiry email
- [x] Rate limiting prevents spam
- [x] Input sanitization for security
- [x] Error handling & logging
- [x] Production-ready

**You're all set!** Form now emails appropriately. 🎉
