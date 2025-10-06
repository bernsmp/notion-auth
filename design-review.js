const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function conductDesignReview() {
  const browser = await chromium.launch({ headless: true });
  const context = await chromium.launchPersistentContext(path.join(__dirname, '.playwright-context'), {
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'design-review-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('Starting design review...\n');

  try {
    // Phase 1: Login Page - Desktop
    console.log('Phase 1: Reviewing Login Page (Desktop 1440x900)');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, '01-login-desktop.png'), fullPage: true });
    console.log('✓ Captured login page desktop screenshot');

    // Check for console errors
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));

    // Test hover state on button
    const button = page.locator('button[type="submit"]');
    await button.hover();
    await page.screenshot({ path: path.join(screenshotsDir, '02-login-button-hover.png'), fullPage: true });
    console.log('✓ Captured button hover state');

    // Test focus state on input
    await page.locator('input[type="password"]').focus();
    await page.screenshot({ path: path.join(screenshotsDir, '03-login-input-focus.png'), fullPage: true });
    console.log('✓ Captured input focus state');

    // Test error state
    await page.locator('input[type="password"]').fill('wrongpassword');
    await button.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(screenshotsDir, '04-login-error-state.png'), fullPage: true });
    console.log('✓ Captured error state');

    // Clear and prepare for mobile testing
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Tablet viewport
    console.log('\nPhase 2: Testing Tablet Responsiveness (768px)');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: path.join(screenshotsDir, '05-login-tablet.png'), fullPage: true });
    console.log('✓ Captured login tablet view');

    // Mobile viewport
    console.log('\nPhase 3: Testing Mobile Responsiveness (375px)');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: path.join(screenshotsDir, '06-login-mobile.png'), fullPage: true });
    console.log('✓ Captured login mobile view');

    // Reset to desktop and login
    console.log('\nPhase 4: Reviewing Dashboard Page');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    await page.locator('input[type="password"]').fill('AIStudio2025');
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('**/view');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, '07-dashboard-desktop.png'), fullPage: true });
    console.log('✓ Captured dashboard desktop view');

    // Test button hover on dashboard
    await page.locator('button:has-text("Access AI Tools Database")').hover();
    await page.screenshot({ path: path.join(screenshotsDir, '08-dashboard-button-hover.png'), fullPage: true });
    console.log('✓ Captured dashboard button hover');

    // Dashboard tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: path.join(screenshotsDir, '09-dashboard-tablet.png'), fullPage: true });
    console.log('✓ Captured dashboard tablet view');

    // Dashboard mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: path.join(screenshotsDir, '10-dashboard-mobile.png'), fullPage: true });
    console.log('✓ Captured dashboard mobile view');

    // Keyboard navigation test
    console.log('\nPhase 5: Testing Keyboard Navigation');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(screenshotsDir, '11-keyboard-nav-1.png'), fullPage: true });
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(screenshotsDir, '12-keyboard-nav-2.png'), fullPage: true });
    console.log('✓ Captured keyboard navigation states');

    // Console errors check
    console.log('\nPhase 6: Console Messages');
    const errors = consoleMessages.filter(m => m.type === 'error');
    const warnings = consoleMessages.filter(m => m.type === 'warning');

    console.log(`Console Errors: ${errors.length}`);
    errors.forEach(e => console.log(`  - ${e.text}`));
    console.log(`Console Warnings: ${warnings.length}`);
    warnings.forEach(w => console.log(`  - ${w.text}`));

    // DOM snapshot for accessibility analysis
    const loginPageHtml = await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    const loginHtml = await page.content();
    fs.writeFileSync(path.join(screenshotsDir, 'login-page-dom.html'), loginHtml);

    console.log('\n✅ Design review complete!');
    console.log(`Screenshots saved to: ${screenshotsDir}`);

  } catch (error) {
    console.error('Error during design review:', error);
  } finally {
    await browser.close();
  }
}

conductDesignReview();
