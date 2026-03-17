import { test, expect } from '../../fixtures';

test.describe('Page Load Smoke Tests', () => {
  test('SMK-004: Who We Are page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Navigate to /who-we-are', async () => {
      await pm.whoWeArePage.open();
      await pm.whoWeArePage.dismissCookieBanner();
    });
    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Who We Are.*D\.R\. Horton/i);
    });
    await test.step('Verify h1 heading is visible', async () => {
      await expect(pm.whoWeArePage.heading).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('who-we-are-page', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-005: Smart Home page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Navigate to /smart-home', async () => {
      await pm.smartHomePage.open();
      await pm.smartHomePage.dismissCookieBanner();
    });
    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Smart Home.*D\.R\. Horton/i);
    });
    await test.step('Verify h1 heading is visible', async () => {
      await expect(pm.smartHomePage.heading).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('smart-home-page', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-006: Services page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Navigate to /services', async () => {
      await pm.servicesPage.open();
      await pm.servicesPage.dismissCookieBanner();
    });
    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Services.*D\.R\. Horton/i);
    });
    await test.step('Verify h1 heading is visible', async () => {
      await expect(pm.servicesPage.heading).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('services-page', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-007: Customer Care page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Navigate to /customer-care', async () => {
      await pm.customerCarePage.open();
      await pm.customerCarePage.dismissCookieBanner();
    });
    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Customer Care.*D\.R\. Horton/i);
    });
    await test.step('Verify h1 heading is visible', async () => {
      await expect(pm.customerCarePage.heading).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('customer-care-page', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-008: Contact Us page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Navigate to /contact-us-page', async () => {
      await pm.contactUsPage.open();
      await pm.contactUsPage.dismissCookieBanner();
    });
    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Contact Us.*D\.R\. Horton/i);
    });
    await test.step('Verify heading is visible', async () => {
      await expect(pm.contactUsPage.heading).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('contact-us-page', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-009: Warranty page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Navigate to /warranty', async () => {
      await pm.warrantyPage.open();
      await pm.warrantyPage.dismissCookieBanner();
    });
    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Warranty/i);
    });
    await test.step('Verify heading is visible', async () => {
      await expect(pm.warrantyPage.heading).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('warranty-page', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-010: Military Benefits page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Navigate to /military-benefits', async () => {
      await pm.militaryBenefitsPage.open();
      await pm.militaryBenefitsPage.dismissCookieBanner();
    });
    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Military Benefits.*D\.R\. Horton/i);
    });
    await test.step('Verify heading is visible', async () => {
      await expect(pm.militaryBenefitsPage.heading).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('military-benefits-page', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-011: Careers page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Navigate to /careers', async () => {
      await pm.careersPage.open();
      await pm.careersPage.dismissCookieBanner();
    });
    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Careers.*D\.R\. Horton/i);
    });
    await test.step('Verify heading is visible', async () => {
      await expect(pm.careersPage.heading).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('careers-page', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-016: State landing page loads (Texas)', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Navigate to /texas', async () => {
      await pm.stateLandingPage.open('texas');
      await pm.stateLandingPage.dismissCookieBanner();
    });
    await test.step('Verify page title contains Texas', async () => {
      await expect(page).toHaveTitle(/Texas.*D\.R\. Horton/i);
    });
    await test.step('Verify main content area is visible', async () => {
      await expect(pm.stateLandingPage.mainContent).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('texas-landing-page', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });
});
