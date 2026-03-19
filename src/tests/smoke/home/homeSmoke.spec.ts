import { test, expect } from '../../fixtures';
import { LoggerUtil } from '../../../utils/LoggerUtil';

test.describe('Home Page Smoke Tests', () => {
  test.beforeEach(async ({ pm }) => {
    LoggerUtil.info('Opening home page and dismissing cookie banner');
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

  test('SMK-001: Home page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Verify page title', async () => {
      LoggerUtil.info('Verifying home page title');
      try {
        await expect(page).toHaveTitle(/D\.R\. Horton America.*Largest Home Builder/i);
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error verifying home page title', { stack: error.stack });
        } else {
          LoggerUtil.error('Error verifying home page title', { error });
        }
        throw error;
      }
    });
    await test.step('Verify hero heading is visible', async () => {
      LoggerUtil.info('Verifying hero heading visibility');
      try {
        await expect(pm.homePage.heroHeading).toBeVisible();
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error verifying hero heading visibility', { stack: error.stack });
        } else {
          LoggerUtil.error('Error verifying hero heading visibility', { error });
        }
        throw error;
      }
    });
    await test.step('Attach screenshot', async () => {
      LoggerUtil.info('Attaching screenshot for home page loaded');
      try {
        await test.info().attach('home-page-loaded', {
          body: await page.screenshot(),
          contentType: 'image/png',
        });
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error attaching screenshot for home page loaded', { stack: error.stack });
        } else {
          LoggerUtil.error('Error attaching screenshot for home page loaded', { error });
        }
        throw error;
      }
    });
  });

  test('SMK-002: Logo renders on home page', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Verify logo link is visible', async () => {
      LoggerUtil.info('Verifying logo link visibility');
      try {
        await expect(pm.homePage.logo.first()).toBeVisible();
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error verifying logo link visibility', { stack: error.stack });
        } else {
          LoggerUtil.error('Error verifying logo link visibility', { error });
        }
        throw error;
      }
    });
    await test.step('Verify logo image is visible with correct alt text', async () => {
      LoggerUtil.info('Verifying logo image visibility and alt text');
      try {
        await expect(pm.homePage.logoImg.first()).toBeVisible();
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error verifying logo image visibility and alt text', { stack: error.stack });
        } else {
          LoggerUtil.error('Error verifying logo image visibility and alt text', { error });
        }
        throw error;
      }
    });
    await test.step('Attach screenshot', async () => {
      LoggerUtil.info('Attaching screenshot for logo rendered');
      try {
        await test.info().attach('logo-rendered', {
          body: await page.screenshot(),
          contentType: 'image/png',
        });
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error attaching screenshot for logo rendered', { stack: error.stack });
        } else {
          LoggerUtil.error('Error attaching screenshot for logo rendered', { error });
        }
        throw error;
      }
    });
  });

  test('SMK-012: Community search is present', { tag: ['@smoke'] }, async ({ pm, page }) => {
    await test.step('Verify search combobox exists with placeholder text', async () => {
      LoggerUtil.info('Verifying community search combobox visibility and placeholder');
      try {
        await expect(pm.homePage.communitySearch).toBeVisible();
        await expect(pm.homePage.communitySearch).toHaveAttribute(
          'placeholder',
          /search by zip, city, state, or community/i,
        );
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error verifying community search combobox visibility and placeholder', { stack: error.stack });
        } else {
          LoggerUtil.error('Error verifying community search combobox visibility and placeholder', { error });
        }
        throw error;
      }
    });
    await test.step('Attach screenshot', async () => {
      LoggerUtil.info('Attaching screenshot for community search');
      try {
        await test.info().attach('community-search', {
          body: await page.screenshot(),
          contentType: 'image/png',
        });
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error attaching screenshot for community search', { stack: error.stack });
        } else {
          LoggerUtil.error('Error attaching screenshot for community search', { error });
        }
        throw error;
      }
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
