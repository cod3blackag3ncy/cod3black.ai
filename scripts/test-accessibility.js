#!/usr/bin/env node
/**
 * Accessibility & Browser Compatibility Test
 * Checks for common rendering issues and a11y problems
 */

const https = require('https');

const BASE_URL = process.env.TEST_URL || 'https://c3bai.vercel.app';

class AccessibilityTest {
  constructor() {
    this.results = [];
    this.colors = {
      reset: '\x1b[0m',
      green: '\x1b[32m',
      red: '\x1b[31m',
      yellow: '\x1b[33m',
      blue: '\x1b[36m',
      magenta: '\x1b[35m'
    };
  }

  log(message, color = 'reset') {
    console.log(`${this.colors[color]}${message}${this.colors.reset}`);
  }

  async fetchHTML() {
    return new Promise((resolve, reject) => {
      https.get(BASE_URL, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
  }

  checkAccessibility(html) {
    console.log('\nAX CHECKS (WCAG 2.1):');
    
    const checks = [];
    
    // Check for lang attribute
    if (html.includes('<html lang="en"')) {
      checks.push({ pass: true, text: 'HTML lang attribute present' });
    } else {
      checks.push({ pass: false, text: 'Missing HTML lang attribute' });
    }

    // Check for title
    if (/<title>.*<\/title>/.test(html)) {
      checks.push({ pass: true, text: 'Page title present' });
    } else {
      checks.push({ pass: false, text: 'Missing page title' });
    }

    // Check for heading hierarchy
    const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
    const h2Count = (html.match(/<h2[^>]*>/g) || []).length;
    if (h1Count === 1) {
      checks.push({ pass: true, text: `Proper hierarchy: ${h1Count} H1, ${h2Count} H2` });
    } else {
      checks.push({ pass: false, text: `Found ${h1Count} H1 tags (should be 1)` });
    }

    // Check for alt attributes on images
    const images = html.match(/<img[^>]*>/g) || [];
    const imagesWithAlt = images.filter(img => img.includes('alt=')).length;
    if (imagesWithAlt === images.length && images.length > 0) {
      checks.push({ pass: true, text: `All ${images.length} images have alt text` });
    } else if (images.length > 0) {
      checks.push({ pass: false, text: `Only ${imagesWithAlt}/${images.length} images have alt text` });
    }

    // Check for form labels
    const formInputs = html.match(/<input[^>]*>/g) || [];
    const labels = html.match(/<label[^>]*>/g) || [];
    if (labels.length >= formInputs.length / 2) {
      checks.push({ pass: true, text: `Form labels present (${labels.length} labels)` });
    } else {
      checks.push({ pass: false, text: `Insufficient form labels (${labels.length}/${formInputs.length})` });
    }

    // Check for color contrast (this is a heuristic)
    const hasGradientText = html.includes('text-transparent') || html.includes('bg-gradient');
    if (hasGradientText) {
      checks.push({ pass: false, text: 'Gradient text may have contrast issues' });
    }

    // Check for skip links
    if (html.includes('Skip') && html.includes('#main')) {
      checks.push({ pass: true, text: 'Skip navigation link present' });
    } else if (html.includes('skip') || html.includes('#main')) {
      checks.push({ pass: true, text: 'Skip navigation likely present' });
    } else {
      checks.push({ pass: false, text: 'Consider adding skip navigation link' });
    }

    checks.forEach(check => {
      const icon = check.pass ? '✓' : '✗';
      const color = check.pass ? 'green' : 'red';
      this.log(`  ${icon} ${check.text}`, color);
    });
  }

  checkBrowserCompatibility(html) {
    console.log('\nBROWSER COMPATIBILITY:');
    
    const compat = [];

    // ES6+ features detection
    if (html.includes('const ') || html.includes('let ')) {
      compat.push({ 
        name: 'ES6+ (const/let)', 
        issue: 'IE11 not supported', 
        recommendation: 'Consider transpiling if IE11 support needed' 
      });
    }

    // CSS Grid
    if (html.includes('grid') && html.includes('auto-cols')) {
      compat.push({ 
        name: 'CSS Grid', 
        issue: 'IE11 not supported', 
        recommendation: 'Fallback to flexbox for older browsers' 
      });
    }

    // Flexbox
    if (html.includes('flex')) {
      compat.push({ 
        name: 'Flexbox', 
        issue: 'IE9-10 limited support', 
        recommendation: 'Already using - good compatibility' 
      });
    }

    // CSS Custom Properties
    if (html.includes('var(--')) {
      compat.push({ 
        name: 'CSS Variables', 
        issue: 'IE11 not supported', 
        recommendation: 'Use PostCSS to generate fallbacks' 
      });
    }

    // Fetch API
    if (html.includes('fetch(')) {
      compat.push({ 
        name: 'Fetch API', 
        issue: 'IE not supported', 
        recommendation: 'Polyfill available: whatwg-fetch' 
      });
    }

    if (compat.length === 0) {
      this.log('  ✓ Standard compatibility features detected', 'green');
    } else {
      compat.forEach(feature => {
        this.log(`  ⚠ ${feature.name}`, 'yellow');
        this.log(`     └─ ${feature.issue}`, 'yellow');
      });
    }
  }

  checkRenderingIssues(html) {
    console.log('\nCOMMON RENDERING ISSUES:');
    
    const issues = [];

    // CSS-in-JS detection
    if (html.includes('<style') && html.length > 100000) {
      issues.push('Large inline styles detected - check for CSS-in-JS bloat');
    }

    // Missing charset
    if (!html.includes('charset') && !html.includes('"utf-8"')) {
      issues.push('Missing charset declaration - add <meta charset="utf-8">');
    }

    // Viewport issues
    if (!html.includes('viewport')) {
      issues.push('Missing viewport meta - mobile rendering may break');
    }

    // Flash of unstyled content (FOUC)
    const headClosing = html.indexOf('</head>');
    const cssInHead = html.substring(0, headClosing).match(/<link[^>]*css/g) || [];
    if (cssInHead.length === 0) {
      issues.push('No CSS in <head> - potential FOUC');
    }

    // Broken images/resources
    const images = html.match(/src="([^"]*)"/g) || [];
    const brokenPatterns = images.filter(img => 
      img.includes('undefined') || img.includes('null') || img.includes('404')
    ).length;
    if (brokenPatterns > 0) {
      issues.push(`${brokenPatterns} potentially broken resource URLs`);
    }

    // JavaScript error tracking
    if (!html.includes('onerror') && !html.includes('Error')) {
      issues.push('No error handling detected - add try/catch');
    }

    if (issues.length === 0) {
      this.log('  ✓ No obvious rendering issues detected', 'green');
    } else {
      issues.forEach(issue => {
        this.log(`  ✗ ${issue}`, 'red');
      });
    }
  }

  async runTests() {
    console.log('\n' + '='.repeat(60));
    this.log('ACCESSIBILITY & COMPATIBILITY AUDIT', 'blue');
    console.log('='.repeat(60));

    try {
      const html = await this.fetchHTML();
      
      this.checkAccessibility(html);
      this.checkBrowserCompatibility(html);
      this.checkRenderingIssues(html);

      console.log('\n' + '='.repeat(60));
      console.log('\nDIAGNOSTIC COMPLETE');
      console.log('\nTo debug rendering in browser:');
      console.log('  1. Open DevTools (F12 on most browsers)');
      console.log('  2. Check Console tab for JavaScript errors');
      console.log('  3. Check Network tab for failed resources');
      console.log('  4. Check Elements tab to verify DOM structure');
      console.log('  5. Toggle DevTools device toolbar (Ctrl+Shift+M) for mobile');
      console.log('\nIf CSS loads but doesn\'t apply:');
      console.log('  → Check Content Security Policy (CSP) headers');
      console.log('  → Verify Tailwind CSS build succeeded');
      console.log('  → Clear browser cache (Ctrl+Shift+R hard refresh)');
      console.log('  → Disable browser extensions (especially ad blockers)');
      console.log('\n' + '='.repeat(60) + '\n');

    } catch (error) {
      this.log(`Error: ${error.message}`, 'red');
      process.exit(1);
    }
  }
}

const tester = new AccessibilityTest();
tester.runTests();
