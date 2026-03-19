  
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

test('SMK-020: Search input navigates to Texas map page', { tag: ['@smoke'] }, async ({ pm, page }) => {
    // Troubleshooting: Only validate navigation to home page
    LoggerUtil.info('Opening home page for Texas search input smoke test');
    try {
      await pm.homePage.open();
      await expect(page).toHaveURL('https://www.drhorton.com/');
    } catch (error) {
      if (error instanceof Error) {
        LoggerUtil.error('Error opening home page or validating URL', { stack: error.stack });
      } else {
        LoggerUtil.error('Error opening home page or validating URL', { error });
      }
      throw error;
    }
    await test.step('Enter "Texas" in search input', async () => {
      LoggerUtil.info('Waiting for search input to be visible');
      try {
        await expect(pm.homePage.communitySearch).toBeVisible({ timeout: 10000 });
        LoggerUtil.info('Entering "Texas" in home page search input');
        await pm.homePage.communitySearch.fill('Texas');
        const inputScreenshot = await pm.homePage.page.screenshot({ fullPage: false });
        await test.info().attach('Search input filled', { body: inputScreenshot, contentType: 'image/png' });
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error entering "Texas" in search input', { stack: error.stack });
        } else {
          LoggerUtil.error('Error entering "Texas" in search input', { error });
        }
        throw error;
      }
    });
    await test.step('Select Texas from dropdown and validate navigation', async () => {
      LoggerUtil.info('Waiting for Texas dropdown option to be visible');
      try {
        const texasOption = pm.homePage.page.getByRole('link', { name: 'Texas' });
        await expect(texasOption).toBeVisible({ timeout: 10000 });
        // Trigger dropdown display by focusing or clicking the search input
        await pm.homePage.communitySearch.focus();
        await pm.homePage.communitySearch.press('ArrowDown');
        // Wait for dropdown option to be visible before screenshot
        await expect(texasOption).toBeVisible({ timeout: 5000 });
        const dropdownScreenshot = await pm.homePage.page.screenshot({ fullPage: false });
        await test.info().attach('Dropdown displayed', { body: dropdownScreenshot, contentType: 'image/png' });
        LoggerUtil.info('Clicking Texas dropdown option');
        await texasOption.click();
        LoggerUtil.info('Waiting for navigation to Texas map page');
        await pm.homePage.page.waitForURL('**/texas', { timeout: 10000 });
        LoggerUtil.info('Navigation to Texas map page successful');
        const texasMapScreenshot = await pm.homePage.page.screenshot({ fullPage: true });
        await test.info().attach('Texas map page', { body: texasMapScreenshot, contentType: 'image/png' });
        await expect(pm.homePage.page).toHaveURL(/texas/);
      } catch (error) {
        if (error instanceof Error) {
          LoggerUtil.error('Error selecting Texas or validating navigation', { stack: error.stack });
        } else {
          LoggerUtil.error('Error selecting Texas or validating navigation', { error });
        }
        throw error;
      }
    });
  });
