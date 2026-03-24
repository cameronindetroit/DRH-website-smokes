import { chromium } from 'playwright';
import fs from 'fs';

(async ()=>{
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.drhorton.com/');
  // Wait for page to be ready
  await page.waitForLoadState('domcontentloaded');
  // pick a sample state from testdata
  const states = JSON.parse(fs.readFileSync(new URL('../src/testdata/states.json', import.meta.url), 'utf8'));
  const sample = states.find(s => s.name && s.name.length > 0) || states[0];
  const name = sample.name;
  console.log('Using sample state:', name);

  const search = await page.getByRole('combobox', { name: /Search by zip, city, state, or community/i }).first();
  console.log('Found search combobox? ', !!search);
  await search.fill(name);
  await search.focus();
  await page.waitForTimeout(800);
  // Press ArrowDown to reveal options
  await search.press('ArrowDown');
  await page.waitForTimeout(800);

  // Dump inner HTML of any autocomplete container near the combobox
  const combobox = await page.$('input[aria-haspopup], input[role="combobox"]');
  if (combobox) {
    const container = await combobox.evaluateHandle((el)=>el.closest('form') || document.body);
    const html = await container.evaluate((n)=>n.innerHTML.substring(0, 10000));
    console.log('Nearby HTML snippet:\n', html.slice(0, 2000));
  }

  const links = await page.getByRole('link').allTextContents();
  console.log('Links count:', links.length);
  // Find link matching name
  const matchingLinks = await page.getByRole('link', { name }).allTextContents().catch(()=>[]);
  console.log('Matching links by exact name:', matchingLinks);

  const options = await page.getByRole('option').allTextContents().catch(()=>[]);
  console.log('Options found (role=option):', options.slice(0,20));

  const listitems = await page.locator('li').allTextContents().catch(()=>[]);
  console.log('List item sample (first 20):', listitems.slice(0,20));

  // Save screenshot and page content
  await page.screenshot({ path: 'tmp/state-search.png', fullPage: true });
  const fullHtml = await page.content();
  fs.writeFileSync('tmp/state-search.html', fullHtml);
  console.log('Saved tmp/state-search.png and tmp/state-search.html');

  await browser.close();
})();
