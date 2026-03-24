import type { TestInfo, Page } from '@playwright/test';

export async function attachScreenshot(testInfo: TestInfo, name: string, page: Page, fullPage = false) {
  await testInfo.attach(name, {
    body: await page.screenshot({ fullPage }),
    contentType: 'image/png',
  });
}
