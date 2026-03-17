import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CustomerCarePage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1, name: 'How can we help?' });
  }

  async open() {
    await this.goto('/customer-care');
  }
}
