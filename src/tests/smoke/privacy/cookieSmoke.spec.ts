import { test, expect } from '../../fixtures';

test.describe('Cookie Banner Smoke Tests', () => {
  test('SMK-014: Cookie banner displays', { tag: ['@smoke'] }, async ({ pm, page, context }) => {
    await test.step('Clear cookies for a clean session', async () => {
      await context.clearCookies();
    });
    await test.step('Navigate to home page', async () => {
      await pm.homePage.open();
    });
    await test.step('Verify cookie banner is visible', async () => {
      // Cookie consent banner may take a moment to appear
      const banner = page.locator('#onetrust-banner-sdk');
      await expect(banner).toBeVisible({ timeout: 10000 });
    });
    await test.step('Attach screenshot of cookie banner', async () => {
      await test.info().attach('cookie-banner-visible', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-015: Cookie banner dismissible', { tag: ['@smoke'] }, async ({ pm, page, context }) => {
    await test.step('Clear cookies and navigate', async () => {
      await context.clearCookies();
      await pm.homePage.open();
    });
    await test.step('Wait for cookie banner to appear', async () => {
      const banner = page.locator('#onetrust-banner-sdk');
      await expect(banner).toBeVisible({ timeout: 10000 });
    });
    await test.step('Click dismiss/close button', async () => {
      // OneTrust banners typically have a close or accept button
      const closeBtn = page.locator('#onetrust-accept-btn-handler, .onetrust-close-btn-handler, #accept-recommended-btn-handler');
      await closeBtn.first().click();
    });
    await test.step('Verify cookie banner is hidden', async () => {
      const banner = page.locator('#onetrust-banner-sdk');
      await expect(banner).toBeHidden({ timeout: 5000 });
    });
    await test.step('Attach screenshot after dismiss', async () => {
      await test.info().attach('cookie-banner-dismissed', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });
});
