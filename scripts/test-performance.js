#!/usr/bin/env node
/**
 * Performance & Loading Diagnostics
 * Analyzes CSS load time, JS execution, and hydration performance
 */

const https = require('https');
const zlib = require('zlib');

const BASE_URL = process.env.TEST_URL || 'https://c3bai.vercel.app';

class PerformanceTest {
  constructor() {
    this.metrics = {};
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

  async testPageLoad() {
    console.log('\n' + '='.repeat(60));
    this.log('PERFORMANCE DIAGNOSTICS', 'blue');
    console.log('='.repeat(60) + '\n');

    const startTime = Date.now();

    return new Promise((resolve, reject) => {
      https.get(BASE_URL, { 
        headers: { 'Accept-Encoding': 'gzip' }
      }, (res) => {
        const gzip = res.headers['content-encoding'] === 'gzip';
        let data = '';
        let compressedSize = 0;

        res.on('data', chunk => {
          compressedSize += chunk.length;
          data += chunk.toString();
        });

        res.on('end', () => {
          const loadTime = Date.now() - startTime;
          
          console.log('LOAD TIME METRICS:');
          this.log(`  ✓ Total load time: ${loadTime}ms`, 'green');
          console.log(`  ${gzip ? '✓' : '⚠'} Compression: ${gzip ? 'enabled' : 'disabled'}`);
          console.log(`  └─ Transferred: ${(compressedSize / 1024).toFixed(2)}KB\n`);

          // Analyze bundle sizes
          this.analyzeBundles(data);
          
          // Check for render blockers
          this.checkRenderBlockers(data);
          
          resolve();
        });
      }).on('error', reject);
    });
  }

  analyzeBundles(html) {
    console.log('BUNDLE ANALYSIS:');
    
    // CSS bundles
    const cssLinks = html.match(/<link[^>]*href="([^"]*\.css)"[^>]*>/g) || [];
    console.log(`\n  CSS (${cssLinks.length} files):`);
    cssLinks.slice(0, 5).forEach(link => {
      const match = link.match(/href="([^"]*)"/);
      if (match) {
        console.log(`    └─ ${match[1].split('/').pop()}`);
      }
    });

    // JS bundles
    const jsLinks = html.match(/<script[^>]*src="([^"]*\.js)"[^>]*>/g) || [];
    console.log(`\n  JavaScript (${jsLinks.length} files):`);
    jsLinks.slice(0, 8).forEach(script => {
      const match = script.match(/src="([^"]*)"/);
      if (match) {
        const name = match[1].split('/').pop();
        const isAsync = script.includes('async');
        console.log(`    └─ ${name} ${isAsync ? '(async)' : '(render-blocking)'}`);
      }
    });

    console.log();
  }

  checkRenderBlockers(html) {
    console.log('RENDER-BLOCKING ANALYSIS:');
    
    // Check for render-blocking scripts
    const blockingScripts = html.match(/<script[^>]*src="[^"]*"[^>]*>(?!.*async|defer)/g) || [];
    const asyncScripts = html.match(/<script[^>]*src="[^"]*"[^>]*async/g) || [];
    
    console.log(`\n  Render-blocking: ${blockingScripts.length}`);
    console.log(`  Async/deferred: ${asyncScripts.length}`);
    
    if (blockingScripts.length > 3) {
      this.log('  ⚠ Multiple render-blocking scripts detected', 'yellow');
      this.log('    → Consider using async/defer attributes', 'yellow');
    } else {
      this.log('  ✓ Minimal render-blocking scripts', 'green');
    }

    // Check for inline styles
    const inlineStyles = html.match(/<style[^>]*>.*?<\/style>/gs) || [];
    console.log(`\n  Inline styles: ${inlineStyles.length}`);
    
    // Check for critical CSS
    if (html.includes('data-precedence="next"')) {
      this.log('  ✓ Critical CSS splitting detected', 'green');
    } else {
      this.log('  ⚠ No critical CSS splitting found', 'yellow');
    }

    console.log();
  }

  async runTests() {
    try {
      await this.testPageLoad();
      
      console.log('='.repeat(60));
      this.log('DIAGNOSIS COMPLETE', 'blue');
      console.log('='.repeat(60) + '\n');
      
      console.log('RECOMMENDATIONS:');
      console.log('  1. If CSS loads but doesn\'t render: Check browser DevTools Console');
      console.log('  2. If JS doesn\'t execute: Check Content-Security-Policy headers');
      console.log('  3. If hydration fails: Check for hydration mismatches in console');
      console.log('  4. Test with: npm run test:render (full diagnostics)\n');
      
    } catch (error) {
      this.log(`Error: ${error.message}`, 'red');
      process.exit(1);
    }
  }
}

const tester = new PerformanceTest();
tester.runTests();
