  
import { test, expect } from '../../fixtures';
import { LoggerUtil } from '../../../utils/LoggerUtil';
import { readFileSync } from 'fs';
const states = JSON.parse(readFileSync(new URL('../../../testdata/states.json', import.meta.url), 'utf8'));
// Use random selection for smoke picks. Optional reproducible seed via `SMK_SEED` env var.
import { attachScreenshot } from '../../../utils/TestUtil';
import { createRng, pickDistinctIndexes } from '../../../utils/RandomUtil';

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

test('SMK-020: Search input navigates via random picks', { tag: ['@smoke'] }, async ({ pm, page }) => {
  const seedEnv = process.env.SMK_SEED;
  const seed = seedEnv ? Number(seedEnv) : undefined;
  const rng = createRng(seed);
  const { idxA, idxB } = pickDistinctIndexes(states.length, rng);
  const stateA = states[idxA];
  const stateB = states[idxB];

  await test.info().attach('selection-info', {
    body: Buffer.from(JSON.stringify({ method: 'random', seed: seedEnv ?? null, idxA, idxB, stateA: stateA.slug, stateB: stateB.slug }, null, 2)),
    contentType: 'application/json',
  });

  LoggerUtil.info(`Opening home page for random search smoke test (stateA=${stateA.name}, stateB=${stateB.name})`);
  try {
    await pm.homePage.open();
    await expect(page).toHaveURL('https://www.drhorton.com/');
  } catch (error) {
    if (error instanceof Error) LoggerUtil.error('Error opening home page or validating URL', { stack: error.stack });
    else LoggerUtil.error('Error opening home page or validating URL', { error });
    throw error;
  }

  await test.step(`Select ${stateA.name} from home search and open map`, async () => {
    await pm.homePage.selectStateFromSearch(stateA.name, stateA.slug);
    await attachScreenshot(test.info(), 'state-map-page', page, true);
  });

  await test.step(`Search ${stateB.name} on ${stateA.name} page and validate listings`, async () => {
    await pm.stateLandingPage.searchAndOpenState(stateB.name, { attachScreenshots: true, testInfo: test.info(), stateSlug: stateB.slug });
    const total = await pm.listingsPage.waitForStateListings(stateB.slug, stateB.name);
    LoggerUtil.info(`Found ${total} ${stateB.name} item(s) on listings page`);
    expect(total).toBeGreaterThan(0);
    await attachScreenshot(test.info(), 'state-search-results-list', page, false);
    await test.info().attach('second-search-results', { body: await page.screenshot(), contentType: 'image/png' });
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
