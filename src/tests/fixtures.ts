import { test as base } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

export const test = base.extend<{ pm: PageManager }>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});

export { expect } from '@playwright/test';
