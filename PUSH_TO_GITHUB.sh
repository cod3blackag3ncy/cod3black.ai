#!/bin/bash

# Push Cod3Black Agency code to cod3blackagency GitHub

echo "🚀 Pushing code to cod3blackagency/c3bai..."

# Make sure we're in the right directory
cd "$(dirname "$0")" || exit 1

# Verify git is initialized
if [ ! -d ".git" ]; then
  echo "❌ Not a git repository. Exiting."
  exit 1
fi

# Show current status
echo "📊 Current status:"
git status

echo ""
echo "🔗 Remote configuration:"
git remote -v

echo ""
echo "📝 Recent commits:"
git log --oneline -5

echo ""
read -p "Continue pushing to cod3blackagency/c3bai? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "⏳ Pushing master branch..."
  git push -u origin master
  
  if [ $? -eq 0 ]; then
    echo "✅ Push successful!"
    echo ""
    echo "📍 Next steps:"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Find or create project: cod3blackagency/c3bai"
    echo "3. Settings → Git → Connect GitHub"
    echo "4. Select cod3blackagency/c3bai, master branch"
    echo "5. Click Deploy"
    echo ""
    echo "🎉 Site will be live in 1-2 minutes at https://c3bai.vercel.app"
  else
    echo "❌ Push failed. Check your GitHub credentials and network."
  fi
else
  echo "⏹️  Push cancelled."
fi
