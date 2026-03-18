import { test, expect } from '../../fixtures';
import { LoggerUtil } from '../../../utils/LoggerUtil';

test.describe('Cookie Banner Smoke Tests', () => {
  test('SMK-014: Cookie banner displays', { tag: ['@smoke'] }, async ({ pm, page, context }) => {
    await test.step('Clear cookies for a clean session', async () => {
      LoggerUtil.info('Clearing cookies for a clean session');
      await context.clearCookies();
    });
    await test.step('Navigate to home page', async () => {
      LoggerUtil.info('Navigating to home page');
      await pm.homePage.open();
    });
    await test.step('Verify cookie banner is visible', async () => {
      LoggerUtil.info('Verifying cookie banner visibility');
      // Cookie consent banner may take a moment to appear
      const banner = page.locator('#onetrust-banner-sdk');
      await expect(banner).toBeVisible({ timeout: 10000 });
    });
    await test.step('Attach screenshot of cookie banner', async () => {
      LoggerUtil.info('Attaching screenshot of cookie banner visible');
      await test.info().attach('cookie-banner-visible', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-015: Cookie banner dismissible', { tag: ['@smoke'] }, async ({ pm, page, context }) => {
    await test.step('Clear cookies and navigate', async () => {
      LoggerUtil.info('Clearing cookies and navigating to home page');
      await context.clearCookies();
      await pm.homePage.open();
    });
    await test.step('Wait for cookie banner to appear', async () => {
      LoggerUtil.info('Waiting for cookie banner to appear');
      const banner = page.locator('#onetrust-banner-sdk');
      await expect(banner).toBeVisible({ timeout: 10000 });
    });
    await test.step('Click dismiss/close button', async () => {
      LoggerUtil.info('Clicking dismiss/close button on cookie banner');
      // OneTrust banners typically have a close or accept button
      const closeBtn = page.locator('#onetrust-accept-btn-handler, .onetrust-close-btn-handler, #accept-recommended-btn-handler');
      await closeBtn.first().click();
    });
    await test.step('Verify cookie banner is hidden', async () => {
      LoggerUtil.info('Verifying cookie banner is hidden');
      const banner = page.locator('#onetrust-banner-sdk');
      await expect(banner).toBeHidden({ timeout: 5000 });
    });
    await test.step('Attach screenshot after dismiss', async () => {
      LoggerUtil.info('Attaching screenshot after cookie banner dismiss');
      await test.info().attach('cookie-banner-dismissed', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });
});
