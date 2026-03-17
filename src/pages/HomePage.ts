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
}

