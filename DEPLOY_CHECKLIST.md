# Deployment Checklist

## Pre-Deployment (Local Testing)

- [x] `.env.local` created with API key
- [x] `npm run build` successful (0 errors)
- [x] TypeScript strict mode passes
- [x] All routes generated (10/10 pages)
- [x] API endpoints functional

## Local Testing (5 minutes)

```bash
npm run dev
```

Then test:
- [ ] Home page loads: http://localhost:3000
- [ ] Capabilities page: http://localhost:3000/capabilities
- [ ] Projects page: http://localhost:3000/projects
- [ ] Live demo works: http://localhost:3000/demo
  - [ ] Enter topic
  - [ ] Click "Generate Caption"
  - [ ] See response + cost + latency
- [ ] Consultation page works: http://localhost:3000/consultation
  - [ ] Enter project plan
  - [ ] Click "Get AI Analysis"
  - [ ] See 10-point assessment
  - [ ] See "Schedule Discussion" button

## Vercel Deployment (2 minutes)

### Option 1: Vercel CLI (Easiest)

```bash
npm install -g vercel
vercel --prod
```

When prompted, add environment variables:
- [ ] `NEXT_PUBLIC_AI_PROVIDER` = `openai`
- [ ] `NEXT_PUBLIC_AI_MODEL` = `gpt-4-turbo`
- [ ] `OPENAI_API_KEY` = `sk-proj-...` (your key)

### Option 2: Vercel Dashboard

1. [ ] Go to vercel.com/new
2. [ ] Select your GitHub repository
3. [ ] Choose Next.js as framework (auto-detected)
4. [ ] Add environment variables:
   - [ ] `NEXT_PUBLIC_AI_PROVIDER=openai`
   - [ ] `NEXT_PUBLIC_AI_MODEL=gpt-4-turbo`
   - [ ] `OPENAI_API_KEY=sk-proj-...`
5. [ ] Click "Deploy"

### Option 3: Git Push (If Already Connected)

```bash
git add .
git commit -m "Deploy: add consultation page"
git push origin main
```

Vercel auto-deploys on push.

## Post-Deployment Verification (5 minutes)

### Test Live Site

- [ ] Home page loads: https://your-domain.vercel.app
- [ ] Navigation works (all 5 links clickable)
- [ ] Demo page: loads and works
  - [ ] Generate a caption
  - [ ] See real API response
  - [ ] Check latency/cost/tokens
- [ ] Consultation page: loads and works
  - [ ] Submit a test plan
  - [ ] Receive AI analysis
  - [ ] See all 10 assessment points
  - [ ] Click "Schedule Discussion"

### Verify Environment Variables

In Vercel dashboard:
- [ ] Go to Settings → Environment Variables
- [ ] Confirm 3 variables are present:
  - [ ] `NEXT_PUBLIC_AI_PROVIDER`
  - [ ] `NEXT_PUBLIC_AI_MODEL`
  - [ ] `OPENAI_API_KEY`

### Check Build Logs

- [ ] No build errors
- [ ] No TypeScript errors
- [ ] Build completed successfully

## DNS & Domain Setup

### If Using Custom Domain

- [ ] Go to Vercel → Settings → Domains
- [ ] Add your domain (e.g., `ai.yourcompany.com`)
- [ ] Update DNS records (Vercel will show instructions)
- [ ] Wait for DNS propagation (up to 24 hours)
- [ ] Test: https://ai.yourcompany.com

### If Using Vercel Subdomain

- [ ] Your site is live at: `cod3black-ai.vercel.app` (or similar)
- [ ] Share this URL

## Set Up Lead Capture

- [ ] Email forwarding for consultations
  - [ ] hello@code3black.ai → your email
  - [ ] Or use Vercel email (if available)
- [ ] Email template for follow-ups
  - [ ] See CONSULTATION_GUIDE.md
- [ ] Calendar link (Calendly, etc.)
  - [ ] Create scheduling link
  - [ ] Add to email template
- [ ] CRM setup (optional)
  - [ ] Add "Consultation" lead source
  - [ ] Track submissions
  - [ ] Track qualified leads

## Promotion

- [ ] Share with network
  - [ ] Twitter/X
  - [ ] LinkedIn
  - [ ] Email list
  - [ ] Slack communities
- [ ] Add to your profile
  - [ ] Link from personal site
  - [ ] Add to email signature
  - [ ] Update LinkedIn profile
- [ ] Content
  - [ ] Write blog post about consultation
  - [ ] Guest post on startup blog
  - [ ] Tweet about free analysis
- [ ] Paid (optional)
  - [ ] Run ads to consultation page
  - [ ] Target startup founders
  - [ ] Target CTOs with AI budget

## Ongoing Operations

### Daily
- [ ] Check for consultation submissions
- [ ] Follow up within 24 hours

### Weekly
- [ ] Review consultation funnel
- [ ] Track conversion rates
- [ ] Iterate on copy/analysis if needed

### Monthly
- [ ] Analyze metrics:
  - [ ] Traffic to `/consultation`
  - [ ] Submission rate
  - [ ] "Schedule Discussion" clicks
  - [ ] Qualified leads
  - [ ] Proposals sent
  - [ ] Projects closed
- [ ] Update documentation if needed

## Troubleshooting

### Site won't deploy
- [ ] Check build logs in Vercel
- [ ] Verify environment variables are set
- [ ] Run `npm run build` locally to debug

### Demo/Consultation API returns error
- [ ] Check `OPENAI_API_KEY` is correct
- [ ] Verify API key has sufficient credits
- [ ] Check OpenAI status page
- [ ] Try again (may be temporary)

### Slow responses
- [ ] Check OpenAI status
- [ ] Try different model (GPT-3.5 is faster)
- [ ] Verify network connection

### Form submission fails
- [ ] Check browser console for errors
- [ ] Verify file size (max ~5MB)
- [ ] Check .env.local has API key

## Success Checklist

- [x] Code deployed
- [ ] Site accessible
- [ ] Demo working
- [ ] Consultation working
- [ ] Email set up for submissions
- [ ] Follow-up template created
- [ ] Calendar link ready
- [ ] CRM configured
- [ ] Network notified
- [ ] Ready for consultations

## Go-Live

Once all checks pass:

1. [ ] Announce launch
2. [ ] Share link with network
3. [ ] Monitor first submissions
4. [ ] Follow up within 24 hours
5. [ ] Iterate based on feedback

---

## Timeline

**Day 0:** Test locally (5 min)
**Day 1:** Deploy to Vercel (2 min)
**Day 1:** Verify live (5 min)
**Day 1-7:** Set up follow-up systems
**Day 7+:** Start taking consultations

**Total setup time: ~1 hour**
**Time to first lead: 1-7 days**
**Time to first project: 30-90 days**

---

You're ready. Deploy whenever you want.
