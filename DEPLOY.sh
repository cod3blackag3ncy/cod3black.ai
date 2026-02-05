#!/bin/bash

# 🚀 Deploy C3BAI to cod3blackagency GitHub
# This script pushes your code to GitHub and shows next steps

set -e

echo "════════════════════════════════════════"
echo "  🚀 Cod3Black Agency - Deploy Script"
echo "════════════════════════════════════════"
echo ""

# Check we're in the right directory
if [ ! -d ".git" ]; then
  echo "❌ Error: Not in a git repository"
  echo "   Run this from ~/c3bai/"
  exit 1
fi

echo "📋 Current Status:"
echo ""
git log --oneline -3
echo ""

echo "🔗 Setting up GitHub configuration..."
git config --global user.email "hello@c3bai.com" 2>/dev/null
git config --global user.name "Cod3Black Agency" 2>/dev/null
git config --global credential.helper store 2>/dev/null

echo "✅ Git configured"
echo ""

echo "🔗 Updating remote to cod3blackagency..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/cod3blackagency/c3bai.git

echo "✅ Remote set to: https://github.com/cod3blackagency/c3bai.git"
echo ""

echo "⚠️  NEXT STEP:"
echo "════════════════════════════════════════"
echo ""
echo "You need a GitHub Personal Access Token."
echo ""
echo "1. Go to: https://github.com/settings/tokens/new"
echo "2. Login as: cod3blackagency"
echo "3. Create token with:"
echo "   ✓ Scope: 'repo'"
echo "   ✓ Expiration: 30+ days"
echo "4. Copy the token"
echo ""
echo "5. Come back here and run:"
echo "   git push -u origin master"
echo ""
echo "6. When prompted for password, paste the token"
echo ""
echo "════════════════════════════════════════"
echo ""

read -p "Ready? Press Enter after you have your token... " -t 300

echo ""
echo "📤 Pushing code to GitHub..."
echo ""

if git push -u origin master; then
  echo ""
  echo "✅ SUCCESS! Code is on GitHub"
  echo ""
  echo "════════════════════════════════════════"
  echo "  🎉 Next Steps:"
  echo "════════════════════════════════════════"
  echo ""
  echo "1. Go to: https://vercel.com/dashboard"
  echo ""
  echo "2. Find c3bai project"
  echo ""
  echo "3. Settings → Git"
  echo ""
  echo "4. Connect cod3blackagency/c3bai"
  echo ""
  echo "5. Set branch to: master"
  echo ""
  echo "6. Click Deploy"
  echo ""
  echo "⏳ Vercel will build in ~60 seconds"
  echo ""
  echo "🌐 Then visit: https://c3bai.vercel.app"
  echo ""
  echo "✨ You should see the modern new design!"
  echo ""
  echo "════════════════════════════════════════"
else
  echo ""
  echo "❌ Push failed"
  echo ""
  echo "Troubleshooting:"
  echo "- Verify token is valid and not expired"
  echo "- Make sure you copied it correctly (no extra spaces)"
  echo "- Check you have access to cod3blackagency organization"
  echo ""
  echo "Try again:"
  echo "  git push -u origin master"
fi
