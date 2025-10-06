const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'login-page.png', fullPage: true });
  console.log('Screenshot saved as login-page.png');
  await browser.close();
})();
