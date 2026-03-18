import { test, expect } from '../../fixtures';
import { LoggerUtil } from '../../../utils/LoggerUtil';

test.describe('Home Page Smoke Tests', () => {
  test.beforeEach(async ({ pm }) => {
    LoggerUtil.info('Opening home page and dismissing cookie banner');
    await pm.homePage.open();
    await pm.homePage.dismissCookieBanner();
  });

  test('SMK-001: Home page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Verify page title', async () => {
      LoggerUtil.info('Verifying home page title');
      await expect(page).toHaveTitle(/D\.R\. Horton America.*Largest Home Builder/i);
    });
    await test.step('Verify hero heading is visible', async () => {
      LoggerUtil.info('Verifying hero heading visibility');
      await expect(pm.homePage.heroHeading).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      LoggerUtil.info('Attaching screenshot for home page loaded');
      await test.info().attach('home-page-loaded', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-002: Logo renders on home page', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Verify logo link is visible', async () => {
      LoggerUtil.info('Verifying logo link visibility');
      await expect(pm.homePage.logo.first()).toBeVisible();
    });
    await test.step('Verify logo image is visible with correct alt text', async () => {
      LoggerUtil.info('Verifying logo image visibility and alt text');
      await expect(pm.homePage.logoImg.first()).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      LoggerUtil.info('Attaching screenshot for logo rendered');
      await test.info().attach('logo-rendered', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-012: Community search is present', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Verify search combobox exists with placeholder text', async () => {
      LoggerUtil.info('Verifying community search combobox visibility and placeholder');
      await expect(pm.homePage.communitySearch).toBeVisible();
      await expect(pm.homePage.communitySearch).toHaveAttribute(
        'placeholder',
        /search by zip, city, state, or community/i,
      );
    });
    await test.step('Attach screenshot', async () => {
      LoggerUtil.info('Attaching screenshot for community search');
      await test.info().attach('community-search', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-013: Footer renders on home page', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Scroll to footer', async () => {
      LoggerUtil.info('Scrolling to footer');
      await pm.homePage.footer.scrollIntoViewIfNeeded();
    });
    await test.step('Verify footer navigation is visible', async () => {
      LoggerUtil.info('Verifying footer navigation visibility');
      await expect(pm.homePage.footerNav).toBeVisible();
    });
    await test.step('Verify copyright text is visible', async () => {
      LoggerUtil.info('Verifying footer copyright text visibility');
      await expect(pm.homePage.footerCopyright).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      LoggerUtil.info('Attaching screenshot for footer rendered');
      await test.info().attach('footer-rendered', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-017: Skip to main content link', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Verify skip link exists with correct href', async () => {
      LoggerUtil.info('Verifying skip to main content link href');
      await expect(pm.homePage.skipToMainLink).toHaveAttribute('href', '#main-content');
    });
    await test.step('Attach screenshot', async () => {
      LoggerUtil.info('Attaching screenshot for skip to main link');
      await test.info().attach('skip-to-main-link', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('SMK-018: Top banner visible', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Verify top banner text is visible', async () => {
      await expect(pm.homePage.topBanner).toBeVisible();
    });
    await test.step('Attach screenshot', async () => {
      await test.info().attach('top-banner-visible', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });
});
