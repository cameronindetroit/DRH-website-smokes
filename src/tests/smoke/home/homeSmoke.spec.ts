  
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
        await test.step('On Texas map page search for Ohio and validate Ohio results', async () => {
          LoggerUtil.info('Locating state search input on state landing page');
          try {
            const statePage = pm.stateLandingPage;
            // Try common combobox labeled search first
            let searchInput = page.getByRole('combobox', { name: /search/i }).first();
            if ((await searchInput.count()) === 0) {
              // fallback to input[type="search"] or generic textbox
              searchInput = page.locator('input[type="search"]').first();
            }

            await expect(searchInput).toBeVisible({ timeout: 10000 });
            LoggerUtil.info('Typing "Ohio" into state search input');
            await searchInput.fill('Ohio');
            // trigger dropdown/options
            await searchInput.press('ArrowDown');

            LoggerUtil.info('Waiting for Ohio options to appear');
            const ohioOptions = page.getByRole('link').filter({ hasText: /Ohio/i });
            await expect(ohioOptions.first()).toBeVisible({ timeout: 10000 });

            let count = await ohioOptions.count();
            LoggerUtil.info(`Found ${count} Ohio option(s) via link role`);

            // fallback: look for explicit anchors that reference /ohio or market items
            if (count === 0) {
              LoggerUtil.info('No Ohio options found via role=link; trying fallback selectors');
              const fallbackOhio = page.locator('a[href^="/ohio"], a.market-footer-item:has-text("Ohio"), a:has-text("Ohio")');
              count = await fallbackOhio.count();
              LoggerUtil.info(`Found ${count} Ohio option(s) via fallback selectors`);
              if (count > 0) {
                LoggerUtil.info('Clicking first fallback Ohio option to navigate to Ohio page');
                await fallbackOhio.first().click();
              }
            } else {
              // Click the first Ohio option and wait for navigation to Ohio page
              LoggerUtil.info('Clicking first Ohio option to navigate to Ohio page');
              await ohioOptions.first().click();
            }
            // If no option was clicked (count === 0) then fail fast with screenshot
            if (count === 0) {
              LoggerUtil.error('No Ohio option was clicked; failing test with screenshot');
              await test.info().attach('no-ohio-click', { body: await page.screenshot(), contentType: 'image/png' });
              throw new Error('No Ohio options found or clicked on Texas page');
            }
            await page.waitForURL('**/ohio**', { timeout: 10000 });
            LoggerUtil.info('Navigation to Ohio page detected');

            // Validate the state landing page shows Ohio using ListingsPage
            const listingsPage = pm.listingsPage;
            await expect(listingsPage.mainContent).toBeVisible({ timeout: 10000 });
            const total = await listingsPage.countStateItems('Ohio');
            LoggerUtil.info(`Found ${total} Ohio item(s) on listings page`);
            expect(total).toBeGreaterThan(0);

            await test.info().attach('ohio-search-results', { body: await page.screenshot(), contentType: 'image/png' });
          } catch (error) {
            LoggerUtil.error('Error searching for Ohio on state page', { error });
            throw error;
          }
        });
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

test('EDGE-404-REDIRECT: Non-existent path redirects to home', { tag: ['@edge'] }, async ({ pm, page }) => {
  await test.step('Navigate to a non-existent path and assert redirect-to-home', async () => {
    LoggerUtil.info('Navigating to a likely-nonexistent path to observe redirect behavior');
    try {
      const [resp] = await Promise.all([
        page.waitForResponse((r) => (r.status() === 301 || r.status() === 302) && r.url().includes('/this-path-does-not-exist')),
        page.goto('https://www.drhorton.com/this-path-does-not-exist', { waitUntil: 'domcontentloaded' }),
      ]);

      LoggerUtil.info('Asserting the site redirected the request');
      expect([301, 302]).toContain(resp.status());
      await expect(page).toHaveURL('https://www.drhorton.com/');
      // Basic visible element sanity check for homepage using page model locator
      await expect(pm.homePage.topBanner).toBeVisible();
      await test.info().attach('redirected-home-screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    } catch (error) {
      LoggerUtil.error('Error asserting redirect-to-home behavior', { error });
      throw error;
    }
  });
});
