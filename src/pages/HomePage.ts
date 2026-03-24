import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heroHeading: Locator;
  readonly communitySearch: Locator;
  readonly mapViewButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heroHeading = page.getByRole('heading', { level: 1, name: 'Find your community. Find your home.' });
    this.communitySearch = page.getByRole('combobox', { name: 'Search by zip, city, state, or community' });
    this.mapViewButton = page.getByRole('button', { name: 'Map view' });
  }

  async open() {
    await this.goto('/');
  }

  async selectStateFromSearch(stateName: string, stateSlug?: string) {
    await this.communitySearch.fill(stateName);
    await this.communitySearch.focus();
    await this.communitySearch.press('ArrowDown');

    // Prefer the dropdown 'option' inside the combobox's listbox. Some runs render
    // results as role=option while the footer contains link anchors with the same
    // visible text which can make role=link ambiguous. Try option first, then
    // fall back to a role=link scoped search.
    const listbox = this.page.getByRole('listbox').first();
    try {
      await listbox.waitFor({ state: 'visible', timeout: 8000 });
    } catch (e) {
      // listbox may not expose role=listbox in every rendering; ignore and try fallback below
    }

    // Prefer an exact text match inside the listbox options to avoid matching
    // multiple items like "Madison, Wisconsin" when searching for "Wisconsin".
    let stateOptionLocator = null as any;
    try {
      const options = listbox.getByRole('option');
      const count = await options.count();
      let chosenIndex = -1;
      const target = stateName.trim().toLowerCase();
      // 1) exact match
      for (let i = 0; i < count; i++) {
        const txt = (await options.nth(i).innerText()).trim().toLowerCase();
        if (txt === target) { chosenIndex = i; break; }
      }
      // 2) endsWith ", <state>" (e.g. "Madison, Wisconsin") prefer exact state-only first
      if (chosenIndex === -1) {
        for (let i = 0; i < count; i++) {
          const txt = (await options.nth(i).innerText()).trim().toLowerCase();
          if (txt.endsWith(', ' + target)) { chosenIndex = i; break; }
        }
      }
      // 3) contains state name
      if (chosenIndex === -1) {
        for (let i = 0; i < count; i++) {
          const txt = (await options.nth(i).innerText()).trim().toLowerCase();
          if (txt.includes(target)) { chosenIndex = i; break; }
        }
      }

      if (chosenIndex >= 0) stateOptionLocator = options.nth(chosenIndex);
    } catch (err) {
      // ignore and fallback to link below
    }

    if (!stateOptionLocator) {
      // Fallback: scoped link search (may pick footer link). Use first() to avoid multiple matches.
      stateOptionLocator = this.page.getByRole('link', { name: stateName }).first();
    }

    await stateOptionLocator.waitFor({ state: 'visible', timeout: 10000 });
    await stateOptionLocator.click();

    if (stateSlug) {
      await this.page.waitForURL(`**/${stateSlug}`, { timeout: 15000 });
    }
  }
}

