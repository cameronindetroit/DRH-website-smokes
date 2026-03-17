import { type Page, type Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly logoImg: Locator;
  readonly skipToMainLink: Locator;
  readonly mainNav: Locator;
  readonly footer: Locator;
  readonly footerNav: Locator;
  readonly footerSocialLinks: Locator;
  readonly footerLegalLinks: Locator;
  readonly footerCopyright: Locator;
  readonly topBanner: Locator;
  readonly cookieBanner: Locator;
  readonly cookieDismissBtn: Locator;
  readonly cookieRejectBtn: Locator;
  readonly cookieManageBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'D R Horton logo, go to the home page' });
    this.logoImg = page.getByRole('img', { name: 'D R Horton logo, go to the home page' });
    this.skipToMainLink = page.getByRole('link', { name: 'Skip to main content' });
    this.mainNav = page.getByRole('navigation', { name: 'main' });
    this.footer = page.getByRole('contentinfo');
    this.footerNav = page.getByRole('navigation', { name: 'footer navigation' });
    this.footerSocialLinks = this.footerNav.locator('..').locator('+ ul');
    this.footerLegalLinks = page.getByRole('link', { name: 'Privacy policy' }).locator('..');
    this.footerCopyright = page.getByText('D.R. Horton is an Equal Housing Opportunity Builder');
    this.topBanner = page.getByText('New homes. Now ready.');
    this.cookieBanner = page.getByRole('dialog', { name: /cookie/i });
    this.cookieDismissBtn = this.cookieBanner.getByRole('button', { name: /dismiss/i });
    this.cookieRejectBtn = this.cookieBanner.getByRole('button', { name: /reject/i });
    this.cookieManageBtn = this.cookieBanner.getByRole('button', { name: /manage/i });
  }

  async goto(path = '/') {
    await this.page.goto(`https://www.drhorton.com${path}`);
  }

  async dismissCookieBanner() {
    try {
      await this.cookieBanner.waitFor({ state: 'visible', timeout: 3000 });
      await this.cookieDismissBtn.click();
      await this.cookieBanner.waitFor({ state: 'hidden' });
    } catch {
      // Banner may not appear if cookies are already set
    }
  }

  navLink(name: string): Locator {
    return this.mainNav.getByRole('link', { name });
  }

  footerLink(name: string): Locator {
    return this.footerNav.getByRole('link', { name });
  }
}
