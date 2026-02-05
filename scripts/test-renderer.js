#!/usr/bin/env node
/**
 * Client-Side Rendering Test Suite
 * Tests that the React app properly hydrates and renders
 * Works on Termux using JSDOM + Node.js (no Playwright needed)
 */

const https = require('https');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_URL || 'https://c3bai.vercel.app';

class RendererTest {
  constructor() {
    this.results = {
      passed: [],
      failed: [],
      warnings: []
    };
    this.colors = {
      reset: '\x1b[0m',
      green: '\x1b[32m',
      red: '\x1b[31m',
      yellow: '\x1b[33m',
      blue: '\x1b[36m'
    };
  }

  log(message, color = 'reset') {
    console.log(`${this.colors[color]}${message}${this.colors.reset}`);
  }

  async fetchHTML(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
  }

  async runTests() {
    console.log('\n' + '='.repeat(60));
    this.log('CLIENT-SIDE RENDERING DIAGNOSTICS', 'blue');
    console.log('='.repeat(60) + '\n');

    try {
      // Test 1: Fetch and parse HTML
      this.log('TEST 1: Fetching HTML from ' + BASE_URL + '...', 'blue');
      const html = await this.fetchHTML(BASE_URL);
      
      if (html.includes('<!DOCTYPE html>')) {
        this.results.passed.push('✓ Valid HTML structure detected');
      } else {
        this.results.failed.push('✗ Invalid HTML structure');
      }

      // Test 2: Check for React hydration markers
      this.log('TEST 2: Checking React hydration markers...', 'blue');
      const hasReactMarkers = html.includes('__REACT') || html.includes('data-react');
      if (hasReactMarkers) {
        this.results.passed.push('✓ React hydration data found in HTML');
      } else {
        this.results.warnings.push('⚠ No React hydration markers found (may indicate static render)');
      }

      // Test 3: Check CSS bundling
      this.log('TEST 3: Checking CSS bundle...', 'blue');
      const cssLinks = html.match(/<link[^>]*href="[^"]*\.css"[^>]*>/g) || [];
      const styleBlocks = html.match(/<style[^>]*>.*?<\/style>/gs) || [];
      
      if (cssLinks.length > 0) {
        this.results.passed.push(`✓ CSS files loaded (${cssLinks.length} found)`);
      } else {
        this.results.warnings.push('⚠ No CSS link tags found - may be using CSS-in-JS');
      }

      // Test 4: Check JavaScript bundles
      this.log('TEST 4: Checking JavaScript bundles...', 'blue');
      const scriptTags = html.match(/<script[^>]*src="[^"]*\.js"[^>]*>/g) || [];
      const inlineScripts = (html.match(/<script[^>]*>(?!.*src)/g) || []).length;
      
      if (scriptTags.length > 0) {
        this.results.passed.push(`✓ JavaScript bundles found (${scriptTags.length} external + ${inlineScripts} inline)`);
      } else {
        this.results.failed.push('✗ No JavaScript bundles found - page likely unstyled');
      }

      // Test 5: Check for Next.js specific bundles
      this.log('TEST 5: Checking Next.js bundles...', 'blue');
      const nextBundles = html.match(/_next\/static\/chunks/g) || [];
      if (nextBundles.length > 0) {
        this.results.passed.push(`✓ Next.js bundles present (${nextBundles.length})`);
      } else {
        this.results.failed.push('✗ No Next.js bundles found - build may be incomplete');
      }

      // Test 6: Main content presence
      this.log('TEST 6: Checking main content...', 'blue');
      const dom = new JSDOM(html);
      const mainContent = dom.window.document.querySelector('main');
      
      if (mainContent) {
        this.results.passed.push('✓ Main content container found');
        const sections = mainContent.querySelectorAll('section');
        this.log(`  └─ ${sections.length} section elements`, 'blue');
      } else {
        this.results.failed.push('✗ No main element found');
      }

      // Test 7: Check critical text content
      this.log('TEST 7: Checking critical text content...', 'blue');
      const criticalTexts = [
        'We Build Production Systems',
        'What We Build',
        'Real Projects We\'ve Shipped',
        'hello@c3bai.com'
      ];
      
      const textContent = dom.window.document.body.textContent;
      let contentFound = 0;
      
      for (const text of criticalTexts) {
        if (textContent.includes(text)) {
          contentFound++;
        }
      }
      
      if (contentFound === criticalTexts.length) {
        this.results.passed.push(`✓ All critical content text present (${contentFound}/${criticalTexts.length})`);
      } else {
        this.results.warnings.push(`⚠ Only ${contentFound}/${criticalTexts.length} critical texts found`);
      }

      // Test 8: Check for style attributes
      this.log('TEST 8: Checking element styling...', 'blue');
      const elementsWithClass = dom.window.document.querySelectorAll('[class*="bg-"], [class*="text-"]').length;
      
      if (elementsWithClass > 10) {
        this.results.passed.push(`✓ Tailwind CSS classes applied (${elementsWithClass} elements)`);
      } else {
        this.results.warnings.push(`⚠ Few Tailwind classes found (${elementsWithClass}) - check CSS loading`);
      }

      // Test 9: Check for interactive elements
      this.log('TEST 9: Checking interactive elements...', 'blue');
      const buttons = dom.window.document.querySelectorAll('button, [role="button"], a[href="#"]').length;
      const inputs = dom.window.document.querySelectorAll('input, textarea, select').length;
      
      if (buttons > 0) {
        this.results.passed.push(`✓ Interactive elements found (${buttons} buttons, ${inputs} inputs)`);
      } else {
        this.results.warnings.push('⚠ Few interactive elements found');
      }

      // Test 10: Viewport meta tag
      this.log('TEST 10: Checking viewport configuration...', 'blue');
      const viewport = dom.window.document.querySelector('meta[name="viewport"]');
      if (viewport?.getAttribute('content').includes('width=device-width')) {
        this.results.passed.push('✓ Viewport meta tag correctly configured');
      } else {
        this.results.failed.push('✗ Viewport meta tag missing or incorrect');
      }

    } catch (error) {
      this.results.failed.push(`✗ Test error: ${error.message}`);
    }

    this.printResults();
  }

  printResults() {
    console.log('\n' + '='.repeat(60));
    this.log('TEST RESULTS', 'blue');
    console.log('='.repeat(60) + '\n');

    if (this.results.passed.length > 0) {
      this.log('PASSED (' + this.results.passed.length + '):', 'green');
      this.results.passed.forEach(r => this.log('  ' + r, 'green'));
      console.log();
    }

    if (this.results.warnings.length > 0) {
      this.log('WARNINGS (' + this.results.warnings.length + '):', 'yellow');
      this.results.warnings.forEach(r => this.log('  ' + r, 'yellow'));
      console.log();
    }

    if (this.results.failed.length > 0) {
      this.log('FAILED (' + this.results.failed.length + '):', 'red');
      this.results.failed.forEach(r => this.log('  ' + r, 'red'));
      console.log();
    }

    console.log('='.repeat(60));
    const passRate = ((this.results.passed.length / (this.results.passed.length + this.results.failed.length)) * 100).toFixed(1);
    this.log(`\nOverall: ${passRate}% pass rate`, this.results.failed.length === 0 ? 'green' : 'red');
    console.log('='.repeat(60) + '\n');

    process.exit(this.results.failed.length > 0 ? 1 : 0);
  }
}

// Handle JSDOM dependency gracefully
try {
  require('jsdom');
  const tester = new RendererTest();
  tester.runTests();
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    console.log('\n⚠️  JSDOM not installed. Installing...\n');
    const { execSync } = require('child_process');
    execSync('npm install --save-dev jsdom', { stdio: 'inherit' });
    console.log('\n✓ JSDOM installed. Run again: npm run test:render\n');
  } else {
    throw err;
  }
}
