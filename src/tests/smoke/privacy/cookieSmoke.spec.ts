import { test, expect } from '../../fixtures';
import { LoggerUtil } from '../../../utils/LoggerUtil';

test.describe('Cookie Banner Smoke Tests', () => {
  test('SMK-014: Cookie banner displays', { tag: ['@smoke'] }, async ({ pm, page, context }) => {
    await test.step('Clear cookies for a clean session', async () => {
      LoggerUtil.info('Clearing cookies for a clean session');
      try {
        await context.clearCookies();
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error clearing cookies for a clean session', { stack: error.stack });
        } else {
          LoggerUtil.error('Error clearing cookies for a clean session', { error });
        }
        throw error;
      }
    });
    await test.step('Navigate to home page', async () => {
      LoggerUtil.info('Navigating to home page');
      try {
        await pm.homePage.open();
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error navigating to home page', { stack: error.stack });
        } else {
          LoggerUtil.error('Error navigating to home page', { error });
        }
        throw error;
      }
    });
    await test.step('Verify cookie banner is visible', async () => {
      LoggerUtil.info('Verifying cookie banner visibility');
      try {
        // Cookie consent banner may take a moment to appear
        const banner = page.locator('#onetrust-banner-sdk');
        await expect(banner).toBeVisible({ timeout: 10000 });
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error verifying cookie banner visibility', { stack: error.stack });
        } else {
          LoggerUtil.error('Error verifying cookie banner visibility', { error });
        }
        throw error;
      }
    });
    await test.step('Attach screenshot of cookie banner', async () => {
      LoggerUtil.info('Attaching screenshot of cookie banner visible');
      try {
        await test.info().attach('cookie-banner-visible', {
          body: await page.screenshot(),
          contentType: 'image/png',
        });
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error attaching screenshot of cookie banner visible', { stack: error.stack });
        } else {
          LoggerUtil.error('Error attaching screenshot of cookie banner visible', { error });
        }
        throw error;
      }
    });
  });

  test('SMK-015: Cookie banner dismissible', { tag: ['@smoke'] }, async ({ pm, page, context }) => {
    await test.step('Clear cookies and navigate', async () => {
      LoggerUtil.info('Clearing cookies and navigating to home page');
      try {
        await context.clearCookies();
        await pm.homePage.open();
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error clearing cookies and navigating to home page', { stack: error.stack });
        } else {
          LoggerUtil.error('Error clearing cookies and navigating to home page', { error });
        }
        throw error;
      }
    });
    await test.step('Wait for cookie banner to appear', async () => {
      LoggerUtil.info('Waiting for cookie banner to appear');
      try {
        const banner = page.locator('#onetrust-banner-sdk');
        await expect(banner).toBeVisible({ timeout: 10000 });
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error waiting for cookie banner to appear', { stack: error.stack });
        } else {
          LoggerUtil.error('Error waiting for cookie banner to appear', { error });
        }
        throw error;
      }
    });
    await test.step('Click dismiss/close button', async () => {
      LoggerUtil.info('Clicking dismiss/close button on cookie banner');
      try {
        // OneTrust banners typically have a close or accept button
        const closeBtn = page.locator('#onetrust-accept-btn-handler, .onetrust-close-btn-handler, #accept-recommended-btn-handler');
        await closeBtn.first().click();
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error clicking dismiss/close button on cookie banner', { stack: error.stack });
        } else {
          LoggerUtil.error('Error clicking dismiss/close button on cookie banner', { error });
        }
        throw error;
      }
    });
    await test.step('Verify cookie banner is hidden', async () => {
      LoggerUtil.info('Verifying cookie banner is hidden');
      try {
        const banner = page.locator('#onetrust-banner-sdk');
        await expect(banner).toBeHidden({ timeout: 5000 });
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error verifying cookie banner is hidden', { stack: error.stack });
        } else {
          LoggerUtil.error('Error verifying cookie banner is hidden', { error });
        }
        throw error;
      }
    });
    await test.step('Attach screenshot after dismiss', async () => {
      LoggerUtil.info('Attaching screenshot after cookie banner dismiss');
      try {
        await test.info().attach('cookie-banner-dismissed', {
          body: await page.screenshot(),
          contentType: 'image/png',
        });
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error attaching screenshot after cookie banner dismiss', { stack: error.stack });
        } else {
          LoggerUtil.error('Error attaching screenshot after cookie banner dismiss', { error });
        }
        throw error;
      }
    });
  });
});
