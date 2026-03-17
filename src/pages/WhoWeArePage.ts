import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class WhoWeArePage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1, name: 'Together, we are America\'s builder.' });
  }

  async open() {
    await this.goto('/who-we-are');
  }
}
