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
}
