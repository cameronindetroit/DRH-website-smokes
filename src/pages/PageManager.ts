import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HomePage } from './HomePage';
import { WhoWeArePage } from './WhoWeArePage';
import { SmartHomePage } from './SmartHomePage';
import { ServicesPage } from './ServicesPage';
import { CustomerCarePage } from './CustomerCarePage';
import { ContactUsPage } from './ContactUsPage';
import { WarrantyPage } from './WarrantyPage';
import { MilitaryBenefitsPage } from './MilitaryBenefitsPage';
import { CareersPage } from './CareersPage';
import { StateLandingPage } from './StateLandingPage';
import { ListingsPage } from './ListingsPage';

export class PageManager {
  readonly page: Page;
  private _basePage?: BasePage;
  private _homePage?: HomePage;
  private _whoWeArePage?: WhoWeArePage;
  private _smartHomePage?: SmartHomePage;
  private _servicesPage?: ServicesPage;
  private _customerCarePage?: CustomerCarePage;
  private _contactUsPage?: ContactUsPage;
  private _warrantyPage?: WarrantyPage;
  private _militaryBenefitsPage?: MilitaryBenefitsPage;
  private _careersPage?: CareersPage;
  private _stateLandingPage?: StateLandingPage;
  private _listingsPage?: import('./ListingsPage').ListingsPage;

  constructor(page: Page) {
    this.page = page;
  }

  get basePage() { return (this._basePage ??= new BasePage(this.page)); }
  get homePage() { return (this._homePage ??= new HomePage(this.page)); }
  get whoWeArePage() { return (this._whoWeArePage ??= new WhoWeArePage(this.page)); }
  get smartHomePage() { return (this._smartHomePage ??= new SmartHomePage(this.page)); }
  get servicesPage() { return (this._servicesPage ??= new ServicesPage(this.page)); }
  get customerCarePage() { return (this._customerCarePage ??= new CustomerCarePage(this.page)); }
  get contactUsPage() { return (this._contactUsPage ??= new ContactUsPage(this.page)); }
  get warrantyPage() { return (this._warrantyPage ??= new WarrantyPage(this.page)); }
  get militaryBenefitsPage() { return (this._militaryBenefitsPage ??= new MilitaryBenefitsPage(this.page)); }
  get careersPage() { return (this._careersPage ??= new CareersPage(this.page)); }
  get stateLandingPage() { return (this._stateLandingPage ??= new StateLandingPage(this.page)); }
  get listingsPage() { return (this._listingsPage ??= new ListingsPage(this.page)); }
}
