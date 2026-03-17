import { test, expect } from '../../fixtures';

const navLinks = [
  { name: 'Who we are', titlePattern: /Who We Are.*D\.R\. Horton/i },
  { name: 'Smart home', titlePattern: /Smart Home.*D\.R\. Horton/i },
  { name: 'Services', titlePattern: /Services.*D\.R\. Horton/i },
  { name: 'Customer care', titlePattern: /Customer Care.*D\.R\. Horton/i },
];

test.describe('Navigation Smoke Tests', () => {
  test.beforeEach(async ({ pm }) => {
    await pm.homePage.open();
    await pm.homePage.dismissCookieBanner();
  });

  test('SMK-003: Main navigation links resolve', { tag: ['@smoke'] }, async ({ pm, page }) => {
    for (const { name, titlePattern } of navLinks) {
      await test.step(`Click "${name}" and verify page loads`, async () => {
        await pm.basePage.navLink(name).click();
        await expect(page).toHaveTitle(titlePattern);
        await expect(page).not.toHaveURL(/\/404/);
        await test.info().attach(`nav-${name.toLowerCase().replace(/\s+/g, '-')}`, {
          body: await page.screenshot(),
          contentType: 'image/png',
        });
        // Navigate back for the next link
        await pm.homePage.open();
        await pm.homePage.dismissCookieBanner();
      });
    }
  });
});
