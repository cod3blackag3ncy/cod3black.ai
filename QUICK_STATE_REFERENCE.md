# C3BAI QUICK REFERENCE CARD

## 🎯 WHAT IS IT?
**https://c3bai.vercel.app** = Cod3Black Agency portfolio + PWA + lead capture form

## ✅ STATUS
| Component | Status | Notes |
|-----------|--------|-------|
| **Site Live** | ✅ | https://c3bai.vercel.app |
| **PWA** | ✅ | Offline works, installable |
| **Build** | ✅ | 42s compile, 116 KB first load |
| **Deployment** | ✅ | Auto-deploy GitHub → Vercel |
| **Form API** | ✅ | /api/inquiry ready |
| **SEO** | ✅ | robots.txt, sitemap, OG tags |

## 📊 KEY NUMBERS
- **8 pages** (routes)
- **1 API endpoint** (/api/inquiry)
- **~400 dependencies** (Next.js ecosystem)
- **<30 KB** gzipped JS per page
- **60-300s cache** depending on route
- **1 year cache** for static assets

## 🗂️ FOLDER STRUCTURE
```
app/
  ├── page.jsx              → HOME PAGE
  ├── inquiry-form.jsx      → FORM COMPONENT
  ├── offline.jsx           → OFFLINE PAGE
  ├── layout.jsx            → ROOT LAYOUT (PWA meta)
  ├── api/inquiry/          → FORM API
  └── docs/                 → GUIDES

public/
  ├── sw.js                 → SERVICE WORKER
  ├── manifest.json         → PWA CONFIG
  ├── icon-*.png            → APP ICONS
  └── og-image.png          → SOCIAL SHARE
```

## 🚀 COMMON COMMANDS
```bash
# Dev server
npm run dev                # localhost:3000

# Build
npm run build             # Next.js compile

# Start prod
npm start                 # Run build output

# Deploy
git push                  # Auto → Vercel
```

## 🔧 KEY FILES
| File | What | Why |
|------|------|-----|
| `app/layout.jsx` | Root HTML | PWA metadata + service worker registration |
| `public/sw.js` | Service worker | Offline caching + smart cache strategy |
| `public/manifest.json` | PWA config | Makes app installable |
| `next.config.js` | Build config | Cache headers + security headers |
| `vercel.json` | Deploy config | Vercel build pipeline |

## 🔐 WHAT WORKS OFFLINE
- ✅ Browse home page
- ✅ View docs/guides
- ✅ See pricing & services
- ✅ View offline fallback
- ❌ Submit forms (queued for later)
- ❌ External links

## 📱 INSTALL PWA
**Desktop**: Chrome → ⋮ → "Install app"  
**Mobile**: Browser → "Add to Home Screen"

## 🐛 RECENT FIX
**Problem**: Commit 740ce55 (accessibility update) broke PWA  
**Root Cause**: Massive form changes (~2K line diff) interfered with SW  
**Solution**: Reverted to 3bf1c79 (working PWA state)  
**Status**: ✅ Restored

## 💡 WHAT'S NEXT?
1. Re-add accessibility improvements **without breaking PWA**
2. Integrate form submission backend (email/DB)
3. Add analytics tracking
4. Test form offline queueing with IndexedDB

## 🧪 TEST PWA
```bash
# Open in Chrome
chrome https://c3bai.vercel.app

# DevTools → Application → Manifest
# Should show: c3bai PWA metadata

# DevTools → Application → Service Workers
# Should show: Active & running sw.js

# Offline test:
# DevTools → Network → Offline
# Reload page → See offline page ✅
```

## 📞 CONTACT
- Email: hello@c3bai.com
- Repo: github.com/cod3blackag3ncy/cod3black.ai
- Deployed: Vercel (auto-deploy on push)

---

**TLDR**: Production PWA running perfectly. Last hiccup (740ce55) has been fixed. Safe to push new changes.
