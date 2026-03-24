import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ListingsPage extends BasePage {
  readonly mainContent: Locator;
  readonly listingLinks: Locator;
  readonly stateHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.mainContent = page.getByRole('main');
    this.listingLinks = page.locator('a[href^="/"], a.market-footer-item');
    this.stateHeading = page.locator('h1, h2, h3').first();
  }

  async countStateItems(stateName: string) {
    const heading = this.page.getByRole('heading', { name: new RegExp(stateName, 'i') });
    const headingCount = await heading.count();
    const links = this.page.locator(`a[href^="/${stateName.toLowerCase()}"]`).filter({ hasText: new RegExp(stateName, 'i') });
    const linkCount = await links.count();
    return headingCount + linkCount;
  }

  async clickFirstStateLink(stateName: string) {
    const links = this.page.locator(`a[href^="/${stateName.toLowerCase()}"]`).filter({ hasText: new RegExp(stateName, 'i') });
    if ((await links.count()) === 0) throw new Error(`No links found for state ${stateName}`);
    await links.first().click();
  }

  async waitForStateListings(stateSlug: string, stateName?: string, timeout = 15000) {
    const locator = this.page.locator(`a[href^="/${stateSlug}"]`).filter({ hasText: new RegExp(stateName ?? stateSlug, 'i') });
    await locator.first().waitFor({ state: 'visible', timeout });
    const count = await locator.count();
    return count;
  }
}
