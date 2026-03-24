import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';

test('generate-edge-negative-smoke-tests-pdf', async ({ page }) => {
  const htmlPath = path.join(process.cwd(), 'plans', 'edge-negative-smoke-tests.html');
  if (!fs.existsSync(htmlPath)) throw new Error('HTML file not found: ' + htmlPath);
  const html = fs.readFileSync(htmlPath, 'utf8');
  await page.setContent(html, { waitUntil: 'load' });
  const out = path.join(process.cwd(), 'plans', 'edge-negative-smoke-tests.pdf');
  await page.pdf({ path: out, format: 'A4' });
  console.log('Wrote PDF to', out);
});
