import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class WarrantyPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1, name: 'Submit a warranty request' });
  }

  async open() {
    await this.goto('/warranty');
  }
}
