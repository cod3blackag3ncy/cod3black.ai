# Troubleshooting Guide

## Common Issues and Solutions

### Error: `env.NEXT_PUBLIC_AI_PROVIDER should be string`

**Cause:** Environment variables are not set in `.env.local`

**Solution:**

1. Make sure `.env.local` exists:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add these lines (minimum):
   ```env
   NEXT_PUBLIC_AI_PROVIDER=openai
   NEXT_PUBLIC_AI_MODEL=gpt-4-turbo
   OPENAI_API_KEY=sk_your_actual_key_here
   ```

3. Restart the dev server:
   ```bash
   # Kill the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

4. Verify it's working:
   ```bash
   # Check that variables are loaded
   node -e "console.log(process.env.NEXT_PUBLIC_AI_PROVIDER)"
   ```

### Error: `OPENAI_API_KEY is not set`

**Cause:** You don't have an OpenAI API key in `.env.local`

**Solution:**

1. Get an API key:
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (starts with `sk_`)

2. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=sk_abc123xyz789...
   ```

3. Restart: `npm run dev`

**Note:** The key must start with `sk_` (not `sk_test_`). If you see `sk_test_`, use that. The system will figure it out.

### Error: `AI API not configured` when running demo

**Cause:** API key is set in `.env.local` but not loaded when running demo

**Solution:**

1. Make sure `.env.local` has the full key (not truncated)
2. Restart dev server: `npm run dev`
3. Go to `http://localhost:3000/demo`
4. Try generating a caption

If still failing:

```bash
# Check what's actually loaded
node -e "console.log({
  provider: process.env.NEXT_PUBLIC_AI_PROVIDER,
  model: process.env.NEXT_PUBLIC_AI_MODEL,
  hasKey: !!process.env.OPENAI_API_KEY
})"
```

### Error: `Cannot find module '@/lib/ai'`

**Cause:** TypeScript path aliases not configured correctly

**Solution:**

The project comes with path aliases configured. If you get this error:

1. Make sure you're in the project root: `cd /workspaces/cod3black.ai`
2. Run: `npm install` again
3. Restart dev server: `npm run dev`

### Error: `Tailwind CSS not working (no styles)`

**Cause:** Tailwind build failed

**Solution:**

1. Delete build artifacts:
   ```bash
   rm -rf .next node_modules
   ```

2. Reinstall:
   ```bash
   npm install
   npm run build
   npm run dev
   ```

### Slow responses from API

**Cause:** OpenAI/Anthropic/Google might be slow or overloaded

**Solution:**

1. Check provider status:
   - OpenAI: https://status.openai.com
   - Anthropic: https://status.anthropic.com
   - Google: https://status.cloud.google.com

2. Try a faster model:
   - Instead of `gpt-4-turbo`, use `gpt-3.5-turbo`
   - Update in `.env.local`: `NEXT_PUBLIC_AI_MODEL=gpt-3.5-turbo`
   - Restart dev server

3. Check your internet connection

### Error: `401 Unauthorized` or `Authentication failed`

**Cause:** API key is invalid or expired

**Solution:**

1. Check the API key:
   - Make sure it starts with `sk_` (OpenAI) or `sk_ant_` (Anthropic)
   - Make sure there are no extra spaces
   - Make sure it's not truncated

2. Regenerate the key:
   - Go to your provider's dashboard
   - Delete the old key
   - Create a new one
   - Copy the full key (not just the last part)

3. Update `.env.local` and restart

### Error: `Rate limit exceeded`

**Cause:** You've made too many API calls in a short time

**Solution:**

1. Wait 60 seconds and try again
2. If persistent, check your provider's rate limit settings
3. For production, implement exponential backoff (see `ARCHITECTURE.md`)

### Build fails with TypeScript errors

**Cause:** TypeScript strict mode is catching issues

**Solution:**

1. Run type check:
   ```bash
   npx tsc --noEmit
   ```

2. Fix reported errors (usually type mismatches)

3. If stuck, clear cache:
   ```bash
   rm -rf .next
   npm run build
   ```

### `npm install` fails

**Cause:** Node version too old or npm cache corrupted

**Solution:**

1. Check Node version (must be 18+):
   ```bash
   node --version
   ```

2. If too old, update Node: https://nodejs.org

3. Clean npm cache:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Port 3000 already in use

**Cause:** Another process is using port 3000

**Solution:**

Option 1: Kill the process on port 3000
```bash
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Option 2: Use a different port
```bash
PORT=3001 npm run dev
# Then go to http://localhost:3001
```

### Demo page shows "No results yet" but no error

**Cause:** API call succeeded but returned unexpected response

**Solution:**

1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "Generate Caption"
4. Look at the POST request to `/api/demo`
5. Check the response body
6. Look for error message or unexpected format

### Can't deploy to Vercel

**Cause:** Missing environment variables in Vercel

**Solution:**

1. Go to vercel.com dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   ```
   NEXT_PUBLIC_AI_PROVIDER=openai
   NEXT_PUBLIC_AI_MODEL=gpt-4-turbo
   OPENAI_API_KEY=sk_your_key
   ```
5. Redeploy

### Custom domain not working

**Cause:** DNS not updated or cached

**Solution:**

1. In Vercel, add the domain in Settings → Domains
2. Update your DNS records (Vercel will tell you which ones)
3. Wait for DNS to propagate (can take 24 hours)
4. Use `nslookup` to check:
   ```bash
   nslookup your-domain.com
   ```

### Need to switch AI providers

**Cause:** Want to try Anthropic or Google instead of OpenAI

**Solution:**

1. Get API key from the new provider
2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_AI_PROVIDER=anthropic
   NEXT_PUBLIC_AI_MODEL=claude-3-opus-20240229
   ANTHROPIC_API_KEY=sk_ant_your_key
   ```
3. Restart dev server
4. Test `/demo` page

No code changes needed!

## Getting Help

1. **Check the docs first:**
   - `README.md` — Full documentation
   - `QUICKSTART.md` — Setup guide
   - `ARCHITECTURE.md` — Design patterns

2. **Check error messages closely** — They're descriptive and point to the solution

3. **Restart the dev server** — 90% of issues resolve with a restart

4. **Clear cache:**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run dev
   ```

5. **Check environment variables:**
   ```bash
   cat .env.local | grep NEXT_PUBLIC_AI
   ```

## Still Stuck?

1. Read the error message carefully (it usually tells you what's wrong)
2. Check the relevant documentation section
3. Verify environment variables are set
4. Restart the dev server
5. Clear cache and reinstall

Most issues are environment-related. Make sure:
- `.env.local` exists
- API key is correct and not truncated
- Dev server is restarted after any env changes
- Node.js version is 18+

---

If you're still having issues, the most common fix is:

```bash
# 1. Kill the dev server (Ctrl+C)
# 2. Verify .env.local has your API key
# 3. Restart:
npm run dev
```

Try this first before anything else.
