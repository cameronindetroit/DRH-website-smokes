import { test, expect } from '../../fixtures';
import { LoggerUtil } from '../../../utils/LoggerUtil';

const navLinks = [
  { name: 'Who we are', titlePattern: /Who We Are.*D\.R\. Horton/i },
  { name: 'Smart home', titlePattern: /Smart Home.*D\.R\. Horton/i },
  { name: 'Services', titlePattern: /Services.*D\.R\. Horton/i },
  { name: 'Customer care', titlePattern: /Customer Care.*D\.R\. Horton/i },
];

test.describe('Navigation Smoke Tests', () => {
  test.beforeEach(async ({ pm }) => {
    try {
      await pm.homePage.open();
      await pm.homePage.dismissCookieBanner();
    } catch (error) {
      if (error instanceof Error) {
        LoggerUtil.error('Error opening home page or dismissing cookie banner', { stack: error.stack });
      } else {
        LoggerUtil.error('Error opening home page or dismissing cookie banner', { error });
      }
      throw error;
    }
  });

  test('SMK-003: Main navigation links resolve', { tag: ['@smoke'] }, async ({ pm, page }) => {
    for (const { name, titlePattern } of navLinks) {
      await test.step(`Click "${name}" and verify page loads`, async () => {
        LoggerUtil.info(`Clicking navigation link: ${name}`);
        try {
          await pm.basePage.navLink(name).click();
          LoggerUtil.info(`Verifying page title for ${name}`);
          await expect(page).toHaveTitle(titlePattern);
          LoggerUtil.info(`Verifying no 404 for ${name}`);
          await expect(page).not.toHaveURL(/\/404/);
          LoggerUtil.info(`Attaching screenshot for navigation: ${name}`);
          await test.info().attach(`nav-${name.toLowerCase().replace(/\s+/g, '-')}`, {
            body: await page.screenshot(),
            contentType: 'image/png',
          });
          LoggerUtil.info(`Navigating back to home for next link`);
          // Navigate back for the next link
          await pm.homePage.open();
          await pm.homePage.dismissCookieBanner();
        } catch (error) {
          if (error instanceof Error) {
            LoggerUtil.error(`Error in navigation step for ${name}`, { stack: error.stack });
          } else {
            LoggerUtil.error(`Error in navigation step for ${name}`, { error });
          }
          throw error;
        }
      });
    }
  });
});
