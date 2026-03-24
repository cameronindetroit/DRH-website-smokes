import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class StateLandingPage extends BasePage {
  readonly mainContent: Locator;
  readonly mapRegion: Locator;

  constructor(page: Page) {
    super(page);
    this.mainContent = page.getByRole('main');
    this.mapRegion = page.getByRole('region', { name: 'Map' });
  }

  async open(state: string) {
    await this.goto(`/${state}`);
  }

  async searchAndOpenState(stateName: string, opts: { attachScreenshots?: boolean; testInfo?: any; stateSlug?: string } = {}) {
    const { attachScreenshots = false, testInfo, stateSlug } = opts;

    // Try common combobox labeled search first
    let searchInput = this.page.getByRole('combobox', { name: /search/i }).first();
    if ((await searchInput.count()) === 0) {
      // fallback to input[type="search"] or generic textbox
      searchInput = this.page.locator('input[type="search"]').first();
    }

    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill(stateName);
    if (attachScreenshots && testInfo) {
      await testInfo.attach('state-search-input-filled', {
        body: await this.page.screenshot({ fullPage: false }),
        contentType: 'image/png',
      });
    }
    await searchInput.press('ArrowDown');

    // Helper to escape regex metacharacters
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const stateWordRE = new RegExp(`\\b${escapeRegExp(stateName)}\\b`, 'i');

    // Prefer role=option inside any listbox (autocomplete); fall back to link matches.
    let chosenLocator = null as any;
    try {
      const listbox = this.page.getByRole('listbox').first();
      const optsLocator = listbox.getByRole('option');
      const optCount = await optsLocator.count();
      for (let i = 0; i < optCount; i++) {
        const txt = (await optsLocator.nth(i).innerText()).trim();
        if (txt.toLowerCase() === stateName.trim().toLowerCase()) { chosenLocator = optsLocator.nth(i); break; }
      }
      if (!chosenLocator) {
        for (let i = 0; i < optCount; i++) {
          const txt = (await optsLocator.nth(i).innerText()).trim();
          if (txt.toLowerCase().endsWith(', ' + stateName.trim().toLowerCase())) { chosenLocator = optsLocator.nth(i); break; }
        }
      }
      if (!chosenLocator) {
        for (let i = 0; i < optCount; i++) {
          const txt = (await optsLocator.nth(i).innerText()).trim();
          if (txt.toLowerCase().includes(stateName.trim().toLowerCase())) { chosenLocator = optsLocator.nth(i); break; }
        }
      }
    } catch (e) {
      // ignore and fallback to link search
    }

    if (!chosenLocator) {
      // Use word-boundary regex to avoid matching 'Arkansas' when searching 'Kansas'
      const links = this.page.getByRole('link');
      const count = await links.count();
      for (let i = 0; i < count; i++) {
        const txt = (await links.nth(i).innerText()).trim();
        if (stateWordRE.test(txt)) { chosenLocator = links.nth(i); break; }
      }
    }

    if (!chosenLocator) {
      // last-resort fallback: search anchors with href starting with slug or exact text
      const fallback = this.page.locator(`a[href^="/${stateSlug ?? stateName.toLowerCase()}"] , a:has-text("${stateName}")`);
      const fcount = await fallback.count();
      if (fcount > 0) chosenLocator = fallback.first();
    }

    if (!chosenLocator) throw new Error(`Could not find dropdown option or link for state: ${stateName}`);

    await chosenLocator.waitFor({ state: 'visible', timeout: 10000 });
    if (attachScreenshots && testInfo) {
      await testInfo.attach('state-search-dropdown', {
        body: await this.page.screenshot({ fullPage: false }),
        contentType: 'image/png',
      });
    }

    await chosenLocator.click();

    if (stateSlug) {
      await this.page.waitForURL(`**/${stateSlug}**`, { timeout: 15000 });
    }
  }
}
