#!/bin/bash

URL="https://c3bai.vercel.app"
FAILURES=0

echo "=== Testing c3bai.vercel.app ==="
echo

# Test 1: Homepage loads
echo "✓ Test 1: Homepage loads (HTTP 200)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
if [ "$STATUS" = "200" ]; then
  echo "  PASS: Status $STATUS"
else
  echo "  FAIL: Status $STATUS"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 2: Hero section content
echo "✓ Test 2: Hero section - 'We Build Production Systems'"
if curl -s "$URL" | grep -q "We Build Production Systems"; then
  echo "  PASS: Hero text found"
else
  echo "  FAIL: Hero text missing"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 3: Production patterns section
echo "✓ Test 3: 'How We Build Production Systems' section"
if curl -s "$URL" | grep -q "How We Build Production Systems"; then
  echo "  PASS: Section found"
else
  echo "  FAIL: Section missing"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 4: Reality Check section
echo "✓ Test 4: 'The Reality Check' section"
if curl -s "$URL" | grep -q "The Reality Check"; then
  echo "  PASS: Section found"
else
  echo "  FAIL: Section missing"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 5: AI & Automation service
echo "✓ Test 5: 'AI & Automation' service"
if curl -s "$URL" | grep -qE "AI &.*Automation|AI &amp; Automation"; then
  echo "  PASS: Service listed"
else
  echo "  FAIL: Service missing"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 6: Projects section
echo "✓ Test 6: Projects (Beltline Golf, TradeAlerts, Gratog, Image-to-SVG)"
PROJECTS=("Beltline Golf" "TradeAlerts" "Gratog" "Image-to-SVG")
for project in "${PROJECTS[@]}"; do
  if curl -s "$URL" | grep -q "$project"; then
    echo "  PASS: $project found"
  else
    echo "  FAIL: $project missing"
    FAILURES=$((FAILURES+1))
  fi
done
echo

# Test 7: Pricing tiers
echo "✓ Test 7: Pricing tiers ($2,500 / $7,500 / $20K+)"
if curl -s "$URL" | grep -q "\$2,500" && curl -s "$URL" | grep -q "\$7,500" && curl -s "$URL" | grep -q "\$20K"; then
  echo "  PASS: All pricing tiers found"
else
  echo "  FAIL: Pricing tiers incomplete"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 8: Inquiry form
echo "✓ Test 8: Project Inquiry form"
if curl -s "$URL" | grep -q "Project Inquiry"; then
  echo "  PASS: Form found"
else
  echo "  FAIL: Form missing"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 9: Navigation links
echo "✓ Test 9: Navigation structure"
if curl -s "$URL" | grep -q "Cod3Black" && curl -s "$URL" | grep -q "Services\|Projects\|Get Started"; then
  echo "  PASS: Navigation found"
else
  echo "  FAIL: Navigation incomplete"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 10: Footer & Contact
echo "✓ Test 10: Footer with contact email"
if curl -s "$URL" | grep -q "hello@c3bai.com"; then
  echo "  PASS: Contact email found"
else
  echo "  FAIL: Contact email missing"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 11: Metadata
echo "✓ Test 11: Page metadata (title, description)"
TITLE=$(curl -s "$URL" | grep -o "<title>[^<]*</title>" | sed 's/<[^>]*>//g')
if echo "$TITLE" | grep -q "Production Systems\|Cod3Black"; then
  echo "  PASS: Title: $TITLE"
else
  echo "  FAIL: Title not optimized"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 12: Mobile responsiveness meta tags
echo "✓ Test 12: Mobile responsiveness (viewport meta)"
if curl -s "$URL" | grep -q "viewport"; then
  echo "  PASS: Viewport meta tag found"
else
  echo "  FAIL: Viewport meta missing"
  FAILURES=$((FAILURES+1))
fi
echo

# Test 13: PWA support (manifest)
echo "✓ Test 13: PWA support (manifest.json)"
MANIFEST_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/manifest.json")
if [ "$MANIFEST_STATUS" = "200" ]; then
  echo "  PASS: Manifest accessible (HTTP $MANIFEST_STATUS)"
else
  echo "  WARN: Manifest status $MANIFEST_STATUS"
fi
echo

# Test 14: Static assets
echo "✓ Test 14: Icons accessible"
ICON_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/icon-192x192.png")
if [ "$ICON_STATUS" = "200" ]; then
  echo "  PASS: Icon accessible (HTTP $ICON_STATUS)"
else
  echo "  FAIL: Icon not found (HTTP $ICON_STATUS)"
  FAILURES=$((FAILURES+1))
fi
echo

# Summary
echo "========================================="
if [ $FAILURES -eq 0 ]; then
  echo "✓ ALL TESTS PASSED"
  echo "========================================="
  exit 0
else
  echo "✗ $FAILURES TEST(S) FAILED"
  echo "========================================="
  exit 1
fi
