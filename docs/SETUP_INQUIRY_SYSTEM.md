# Setting Up the Project Inquiry System

This document covers setting up email notifications and database storage for the project inquiry form.

## Overview

The inquiry form now includes:
- ✅ Client-side validation (Zod)
- ✅ Server-side sanitization & validation
- ✅ Rate limiting (5 requests per minute)
- ✅ Email notifications (auto-response + team notification) via Resend
- ✅ Database storage via Supabase
- ✅ Offline support with IndexedDB queuing
- ✅ Automatic sync when back online

## Prerequisites

1. **Resend Account** (for email): https://resend.com
2. **Supabase Account** (for database): https://supabase.com
3. Environment variables configured in `.env.local`

## Step 1: Setup Resend (Email)

### 1.1 Get API Key
1. Go to https://resend.com/api-keys
2. Create a new API key
3. Copy it to your `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 1.2 Configure From Email
If using a custom domain:
1. Add domain to Resend (https://resend.com/domains)
2. Add DNS records as instructed
3. Update `.env.local`:
   ```
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   TEAM_EMAIL=inquiries@yourdomain.com
   ```

For testing, you can use Resend's default domain:
```
RESEND_FROM_EMAIL=noreply@cod3black.ai
TEAM_EMAIL=inquiries@cod3black.ai
```

## Step 2: Setup Supabase (Database)

### 2.1 Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Create new project
3. Wait for it to be ready
4. Go to Project Settings > API
5. Copy these values to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

### 2.2 Create Inquiries Table

In Supabase, go to SQL Editor and run:

```sql
-- Create inquiries table
CREATE TABLE inquiries (
  id VARCHAR(255) PRIMARY KEY,
  
  -- Contact info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  website VARCHAR(500),
  contact_method VARCHAR(50),
  
  -- Project details
  project_name VARCHAR(255) NOT NULL,
  project_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  
  -- Scope
  design_scope VARCHAR(50),
  integration_count VARCHAR(50),
  database_needed VARCHAR(50),
  integration_types TEXT[],
  deployment_requirements TEXT[],
  
  -- Timeline & Budget
  timeline VARCHAR(100),
  budget_expectation VARCHAR(100),
  
  -- Team & Complexity
  tech_stack VARCHAR(500),
  existing_code VARCHAR(500),
  team_level VARCHAR(50),
  special_requirements TEXT[],
  
  -- Additional info
  additional_info TEXT,
  partner_qualification VARCHAR(50),
  partner_details TEXT,
  
  -- Estimate
  estimated_hours INTEGER,
  estimated_tier VARCHAR(50),
  estimated_complexity VARCHAR(50),
  estimated_monthly_rate INTEGER,
  is_partner_qualified BOOLEAN DEFAULT false,
  
  -- Metadata
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for quick lookups
CREATE INDEX inquiries_email_idx ON inquiries(email);
CREATE INDEX inquiries_created_at_idx ON inquiries(created_at);

-- Enable Row Level Security (optional, for security)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
```

## Step 3: Test the Form

### 3.1 Local Testing
1. Start the dev server:
   ```
   npm run dev
   ```

2. Go to `/inquiry` page

3. Fill out the form (works online and offline!)

4. Submit

5. Check:
   - Your email for auto-response
   - Resend dashboard for sent emails
   - Supabase for stored inquiry

### 3.2 Test Offline Mode
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Offline" checkbox
4. Fill form and submit
5. Check offline notice appears
6. Uncheck "Offline"
7. Watch for automatic sync notification

## Step 4: Configure on Vercel (Production)

### 4.1 Add Environment Variables
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add:
   ```
   RESEND_API_KEY
   RESEND_FROM_EMAIL
   TEAM_EMAIL
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ```

### 4.2 Redeploy
```bash
git add .
git commit -m "Enable inquiry form with email and database"
git push origin main
```

## Email Templates

### Auto-Response Email
Sent to the prospect with:
- Welcome message
- Preliminary estimate (hours, tier, complexity, rate)
- Timeline to follow-up
- Contact instructions

### Internal Notification Email
Sent to team with:
- Full inquiry details
- Estimated hours and pricing
- Partner qualification status
- All form responses
- Next steps checklist

## API Endpoints

### Submit Inquiry
```
POST /api/inquiry

Request:
{
  projectName: string,
  description: string,
  problemStatement: string,
  projectType: enum[...],
  designScope?: string,
  timeline: string,
  budgetExpectation: string,
  name: string,
  email: string,
  company?: string,
  [... other fields ...]
}

Response:
{
  success: boolean,
  inquiryId: string,
  estimate: {
    estimatedHours: number,
    tier: string,
    complexity: string,
    hourlyRate: number,
    monthlyRate: number,
    estimatedDuration: string,
    isPartnerQualified: boolean
  },
  message: string
}
```

## Troubleshooting

### Emails not sending
- Check RESEND_API_KEY is set correctly
- Verify RESEND_FROM_EMAIL is verified in Resend
- Check Resend dashboard for error details
- Check server logs

### Database not saving
- Check SUPABASE_SERVICE_ROLE_KEY is set (not ANON_KEY)
- Verify inquiries table exists
- Check Supabase dashboard for errors
- Check server logs

### Offline queue not working
- Check browser supports IndexedDB
- Open DevTools > Application > IndexedDB
- Should see "c3bai-offline" database
- Try filling form offline and checking

## Monitoring

### Resend Dashboard
Monitor sent emails, bounces, and failures at https://resend.com/emails

### Supabase Dashboard
View all inquiries at https://supabase.com/dashboard under Tables > inquiries

### Vercel Logs
Check function logs at https://vercel.com/dashboard under your project

## Next Steps

1. **Team Notification Setup**: Configure who receives team emails
2. **Database Backups**: Enable automated Supabase backups
3. **Analytics**: Track inquiry sources and conversion
4. **CRM Integration**: Connect to HubSpot, Salesforce, etc.
5. **SMS Alerts**: Add Twilio for priority inquiries

## Support

For issues:
1. Check environment variables are correct
2. Review server logs in Vercel
3. Check Resend/Supabase dashboards
4. Test form locally first
