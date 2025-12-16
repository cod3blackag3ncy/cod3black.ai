# Deployment Checklist

## Pre-Deployment ✓

- [x] All dependencies updated (`package.json`)
  - [x] React 19.0.0
  - [x] @types/react 19.0.0
  - [x] @types/react-dom 19.0.0
  - [x] Next.js 15.5.9

- [x] Build succeeds locally
  - [x] `npm run build` completes without errors
  - [x] No TypeScript errors
  - [x] All routes compile correctly

- [x] Vercel configuration valid
  - [x] `vercel.json` passes JSON schema validation
  - [x] All env variables have `type: "string"`
  - [x] Default values set for public variables
  - [x] git.deploymentEnabled set to main branch

- [x] Documentation complete
  - [x] DEPLOYMENT_GUIDE.md created
  - [x] FIXES_APPLIED.md created
  - [x] README.md updated with deployment links
  - [x] .env.example includes all required variables

## During Deployment

- [ ] Push code to GitHub
  ```bash
  git add .
  git commit -m "Fix: Resolve deployment issues and add documentation"
  git push origin main
  ```

- [ ] Create/import project in Vercel
  - [ ] Go to https://vercel.com/dashboard
  - [ ] Click "Add New" → "Project"
  - [ ] Select GitHub repo
  - [ ] Click "Import"

- [ ] Configure environment variables in Vercel dashboard
  
  **Required (choose ONE AI provider):**
  
  **Option A: OpenAI**
  - [ ] `NEXT_PUBLIC_AI_PROVIDER` = `openai`
  - [ ] `NEXT_PUBLIC_AI_MODEL` = `gpt-4-turbo`
  - [ ] `OPENAI_API_KEY` = (from https://platform.openai.com/api-keys)
  
  **Option B: Anthropic**
  - [ ] `NEXT_PUBLIC_AI_PROVIDER` = `anthropic`
  - [ ] `NEXT_PUBLIC_AI_MODEL` = `claude-3-opus-20240229`
  - [ ] `ANTHROPIC_API_KEY` = (from https://console.anthropic.com/keys)
  
  **Option C: Google Gemini**
  - [ ] `NEXT_PUBLIC_AI_PROVIDER` = `gemini`
  - [ ] `NEXT_PUBLIC_AI_MODEL` = `gemini-pro`
  - [ ] `GOOGLE_API_KEY` = (from https://makersuite.google.com/app/apikey)
  
  **Optional (for consultation email notifications):**
  - [ ] `GMAIL_EMAIL` = (your Gmail address)
  - [ ] `GMAIL_APP_PASSWORD` = (from https://myaccount.google.com/apppasswords)

- [ ] Deploy
  - [ ] Click "Deploy" in Vercel dashboard
  - [ ] Wait for build to complete (5-10 minutes)
  - [ ] Check deployment logs for errors

## Post-Deployment Testing

- [ ] Site is live at `your-project.vercel.app`
  - [ ] Home page loads (`/`)
  - [ ] Navigation menu works
  - [ ] All internal links navigate correctly

- [ ] Demo page works (`/demo`)
  - [ ] Page loads without errors
  - [ ] Input form is visible
  - [ ] Can enter topic text
  - [ ] Can select style dropdown
  - [ ] "Generate Caption" button responds
  - [ ] Real API call returns data (not simulated)
  - [ ] Shows actual latency and token usage
  - [ ] Shows estimated cost

- [ ] Consultation page works (`/consultation`)
  - [ ] Form loads
  - [ ] Can type project plan
  - [ ] Can upload file (optional)
  - [ ] Submit button works
  - [ ] Shows results page with analysis

- [ ] API endpoints respond (optional)
  - [ ] `GET /api/demo` returns endpoint documentation
  - [ ] `GET /api/consultation` returns endpoint documentation

- [ ] Check Vercel logs for errors
  - [ ] Deployment logs show no errors
  - [ ] Runtime logs show no 500 errors

## Production Monitoring

- [ ] Set up cost monitoring
  - [ ] Check API provider dashboard daily for first week
  - [ ] Monitor token usage and costs

- [ ] Set up error notifications (optional)
  - [ ] Vercel error alerts enabled
  - [ ] Slack/email notifications configured

- [ ] Monitor demo usage
  - [ ] Track number of API calls
  - [ ] Monitor response times
  - [ ] Alert if costs spike unexpectedly

## Customization (Post-Deployment)

- [ ] Update branding
  - [ ] Change company name in footer
  - [ ] Update contact email
  - [ ] Update homepage copy if needed

- [ ] Update projects
  - [ ] Add your own case studies to `/projects`
  - [ ] Update capabilities description if needed

- [ ] Custom domain (optional)
  - [ ] Add custom domain in Vercel settings
  - [ ] Configure DNS records
  - [ ] Verify SSL certificate

## Troubleshooting Reference

| Issue | Solution |
|-------|----------|
| Build fails with schema error | Check `vercel.json` has `type: "string"` for all env vars |
| Demo shows "AI API not configured" | Verify API key is set in Vercel Environment Variables |
| Consultation form doesn't submit | Check console for errors; verify API key is valid |
| High API costs | Switch to cheaper model or add rate limiting |
| Emails not sending | Gmail credentials are optional; this is non-critical |

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed troubleshooting.

---

**Status**: Ready for Production Deployment ✓

**Last Updated**: 2025-12-16
