import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SmartHomePage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
  }

  async open() {
    await this.goto('/smart-home');
  }
}
