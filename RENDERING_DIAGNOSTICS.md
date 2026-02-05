# Client-Side Rendering Diagnostics Guide

## Problem Statement
User reports seeing plain text/HTML without styling when visiting the live site. This indicates:
- HTML is rendering ✓
- CSS/JavaScript is NOT executing ✗

## Quick Tests (Run These First)

```bash
# Full diagnostics
npm run test:render

# Performance analysis  
npm run test:performance

# Accessibility audit
npm run test:accessibility
```

## Manual Browser Debugging

### Step 1: Open Browser DevTools
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I`
- **Firefox**: Press `F12`
- **Safari**: Enable Debug Menu, then Develop → Show Web Inspector
- **Mobile**: Install remote debugging tools for your device

### Step 2: Check Console for Errors
Look at the **Console** tab for any error messages:

```javascript
// Common issues:

// 1. CSP (Content Security Policy) blocking resources
// Error: "Refused to load the script from 'https://...' because it violates this Content Security Policy directive"
// Fix: Check vercel.json for CSP headers

// 2. Module resolution errors  
// Error: "Failed to resolve module specification for 'react'"
// Fix: Check build succeeded with 'npm run build'

// 3. Hydration mismatches
// Error: "Hydration mismatch between server and client"
// Fix: Ensure no date/random values in rendered HTML
```

### Step 3: Check Network Tab
1. Click **Network** tab
2. Refresh page (`Ctrl+R`)
3. Look for:
   - **Red items** = Failed to load (404, CORS, etc)
   - **Yellow items** = Slow loading (>3s)
   - **CSS files** = Check if actually loading

**Common Issues:**
```
✗ 404 on /_next/static/css/*.css
  → Build incomplete or wrong version deployed

✗ CORS error on CSS/JS imports
  → Check CSP headers in next.config.js or vercel.json

✗ 429 (Too many requests) 
  → Rate limiting or DDoS protection blocking
```

### Step 4: Check Elements/Inspector
1. Click **Elements** or **Inspector** tab
2. Look for:
   - `<link href="/_next/static/css/...">` tags
   - `<script src="/_next/static/chunks/...">` tags
   - Tailwind CSS classes on elements

**Verification:**
```html
<!-- Should exist: -->
<link rel="stylesheet" href="/_next/static/css/30f2023e596a6625.css">

<!-- Should see Tailwind classes: -->
<nav class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
```

### Step 5: Check Styles Applied
1. Select any element with Inspector
2. Look at **Styles** panel:
   - Check if Tailwind classes are applied
   - Check computed styles below

**If Tailwind classes exist but styles don't appear:**
- May be CSS-in-JS issue
- May be Tailwind build failure
- May be CSP blocking inline styles

### Step 6: Mobile-Specific Testing
1. Press `Ctrl+Shift+M` (DevTools Device Toolbar)
2. Select different device sizes
3. Test viewport responsiveness

**Mobile Common Issues:**
- Viewport meta tag missing or incorrect
- Touch events not working
- Images not loading on mobile

## Server-Side Checks

### Check Build Output
```bash
cd c3bai
npm run build

# Look for:
# ✓ "compiled client and server successfully"
# ✓ CSS chunks created
# ✓ JS chunks created
```

### Check Deployment
```bash
# Verify Vercel deployment
vercel status

# Check if latest build was deployed
vercel ls

# Redeploy if needed
vercel deploy --prod
```

### Check Next.js Config
```bash
# Verify next.config.js is valid
cat next.config.js

# Should have:
# - reactStrictMode: true
# - Headers for cache control
# - Rewrites for clean URLs
```

## CSP Headers Investigation

The most common cause of styling issues is **Content Security Policy** blocking CSS/JS injection.

### Check Current Headers
```bash
# Check Vercel-deployed headers
curl -I https://c3bai.vercel.app 2>/dev/null | grep -i "content-security"

# Check local next.config.js
cat app/page.jsx | grep -i "script\|style"
```

### Common CSP Issues & Fixes

**Issue 1: Inline styles blocked**
```
Error: "Refused to apply a style because its hash did not match any of the following Content Security Policy hashes"
```
Fix: Add `unsafe-inline` or proper nonce handling

**Issue 2: Tailwind CSS blocked**
```
Error: CSS file 403/blocked
```
Fix: Check domain whitelisting in CSP

**Issue 3: Hydration scripts blocked**
```
Error: React hydration fails, page shows plain text
```
Fix: Ensure `script-src` allows `/_next/static/chunks/`

### Reset Headers (Nuclear Option)
Add to `next.config.js` to remove restrictive CSP:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:"
        }
      ]
    }
  ];
}
```

⚠️ **Warning**: This is insecure. Use only for debugging.

## Cache Issues

### Clear Browser Cache
- **Chrome**: Ctrl+Shift+Delete → "All time" → Clear
- **Firefox**: Ctrl+Shift+Delete → "Everything" → Clear Now
- **Safari**: Develop → Empty Web Storage → Clear

### Force Hard Refresh
- **Chrome/Edge/Firefox**: `Ctrl+Shift+R`
- **Mac**: `Cmd+Shift+R`
- **Safari**: Develop → Disable Caches

### Check Cache Headers
```bash
# Should show short cache for home page
curl -I https://c3bai.vercel.app | grep -i cache-control

# Expected output:
# Cache-Control: public, max-age=60, must-revalidate
```

## Browser Extension Issues

Some browser extensions block CSS/JS injection:
- **uBlock Origin** (ad blocker)
- **Ghostery** (tracking blocker)  
- **Privacy Badger**
- **NoScript**

### Test Workaround
1. Create new private/incognito window
2. Visit c3bai.vercel.app
3. Does it render correctly?

If yes, it's an extension issue:
- Disable extensions one by one
- Add site to extension whitelist

## Tailwind CSS Build Issues

### Verify Tailwind Config
```bash
cat tailwind.config.js

# Should include:
# content: [
#   './app/**/*.{js,jsx}',
#   './pages/**/*.{js,jsx}',
# ]
```

### Rebuild CSS
```bash
# Remove build artifacts
rm -rf .next

# Rebuild
npm run build

# Check CSS bundle size
ls -lh .next/static/css/
```

### Check Tailwind Output
```bash
# Look for this in build output:
# - Creating an optimized production build
# - Collecting page data...
# - Finalizing page optimization...
```

## Specific Test Cases

### Test Case 1: Hero Section Rendering
```javascript
// Run in browser console:
document.querySelector('h1')?.textContent
// Should return: "We Build Production Systems"

// Check if styled:
window.getComputedStyle(document.querySelector('h1')).color
// Should return: rgb(255, 255, 255) [white text]
```

### Test Case 2: Service Cards Rendering
```javascript
// Run in browser console:
document.querySelectorAll('[class*="rounded-xl"]').length
// Should return: > 20 (many rounded elements)
```

### Test Case 3: Form Validation
```javascript
// Run in browser console:
document.querySelector('input[name="projectName"]')?.value
// Should return current input value
```

### Test Case 4: Navigation Links
```javascript
// Run in browser console:
document.querySelectorAll('a[href^="#"]').length
// Should return: 6+ (internal navigation links)
```

## Performance Metrics to Check

### Core Web Vitals (in Chrome DevTools)
1. **Largest Contentful Paint (LCP)**: < 2.5s ✓
2. **First Input Delay (FID)**: < 100ms ✓
3. **Cumulative Layout Shift (CLS)**: < 0.1 ✓

### Check in DevTools:
1. Open **Lighthouse** tab
2. Click "Generate report"
3. Review performance score

## Debugging Workflow

```mermaid
graph TD
    A["Visit c3bai.vercel.app"] --> B{"Renders correctly?"}
    B -->|Yes| C["✓ Site working"]
    B -->|No| D["Open DevTools F12"]
    D --> E{"Any errors in Console?"}
    E -->|Yes| F["Check error type"]
    E -->|No| G{"CSS loads in Network?"]
    F --> F1["CSP issue?"]
    F --> F2["JS error?"]
    F --> F3["404 resource?"]
    G -->|No| H["CSS not loading"]
    G -->|Yes| I["CSS loaded but not applied"]
    H --> H1["Check Network tab"]
    H --> H2["Check next.config.js"]
    I --> I1["Check CSP headers"]
    I --> I2["Clear cache hard refresh"]
    I --> I3["Disable extensions"]
```

## Still Having Issues?

### Create Debug Report
```bash
# Run all diagnostics
npm run test:render && npm run test:performance && npm run test:accessibility

# Export results
cat > DEBUG_REPORT.txt << EOF
1. npm run test:render output:
2. Browser: 
3. Device: 
4. Console errors:
5. Network tab blocked items:
EOF
```

### Check Server Logs
```bash
# View Vercel deployment logs
vercel logs

# Check for build errors
vercel logs --follow
```

### Last Resort: Local Testing
```bash
# Test locally to rule out deployment issues
npm run dev

# Visit http://localhost:3000
# Does it work locally?
# If yes: deployment issue
# If no: code issue
```

---

## Reference Links

- [Next.js Deployment Guide](https://nextjs.org/docs/deployment/vercel)
- [Tailwind CSS Troubleshooting](https://tailwindcss.com/docs/troubleshooting)
- [Content Security Policy Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [React Hydration Errors](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Chrome DevTools Guide](https://developer.chrome.com/docs/devtools/)
