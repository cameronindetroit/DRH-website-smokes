# Enterprise Playwright — D.R. Horton

Playwright test automation framework for D.R. Horton, built from the enterprise starter template.

This project includes:

- Reporting: Playwright HTML reports and test artifacts
- Encryption: crypto-js utilities and env handling support
- Logging: winston-based logging folder structure
- Utilities: faker, CSV helpers, timezone tooling
- Architecture: POM + PageManager + fixtures + helper layers

## Quick Start

1. Install dependencies:

npm install

2. Install Playwright browsers:

npx playwright install

3. Create env file:

src/config/.env.qa

4. Run tests:

npm test

---

## Reporting

Playwright's built-in **HTML reporter** is configured in `playwright.config.ts`:

```ts
reporter: [['html', { open: 'never' }]],
```

Additional artifact capture is enabled per-run:

| Artifact | Setting | When Captured |
|----------|---------|---------------|
| Trace | `on-first-retry` | Saved when a test retries after its first failure |
| Screenshot | `only-on-failure` | Captured automatically on any test failure |
| Video | `retain-on-failure` | Recorded for every test; only kept if the test fails |

**Viewing reports:**

```bash
npm run report        # opens the HTML report in a browser
```

Reports are written to `playwright-report/`. On CI, retries are set to `1`; locally retries default to `0`.

---

## Encryption

Environment-specific secrets are managed through two utility stubs and dotenv:

| File | Purpose |
|------|---------|
| `src/utils/CryptojsUtil.ts` | Wrapper around `crypto-js` for encrypting/decrypting sensitive values |
| `src/utils/EncryptEnvFile.ts` | Utility for encrypting entire `.env` files so they can be committed safely |
| `src/config/.env.qa` | Environment file loaded by dotenv (keys: `userid`, `password`) |

**How env loading works:**

```ts
dotenv.config({ path: `src/config/.env.${process.env.NODE_ENV ?? 'qa'}` });
```

- The `NODE_ENV` variable selects the environment file (defaults to `qa`).
- Create additional files like `.env.staging` or `.env.prod` under `src/config/` for other environments.
- The `crypto-js` package (v4.2.0) and its types are already installed and ready for implementation.

---

## Logging

Winston-based structured logging is scaffolded with:

| File | Purpose |
|------|---------|
| `src/utils/LoggerUtil.ts` | Logger utility class — wraps `winston` for consistent log output |
| `src/logging/` | Directory reserved for log output files |

The `winston` package (v3.19.0) is installed as a production dependency. The `LoggerUtil` class is intended to provide:

- Configurable log levels (info, warn, error, debug).
- Console and file transports.
- Structured JSON log output for CI/CD pipeline consumption.

---

## Utilities

| File | Package | Purpose |
|------|---------|---------|
| `src/utils/FakerDataUtil.ts` | `@faker-js/faker` v10.2.0 | Generate realistic test data (names, emails, addresses, etc.) |
| `src/utils/CsvtoJsonUtil.ts` | `csv-writer` v1.6.0 | Convert between CSV and JSON for data-driven testing |
| `src/utils/CryptojsUtil.ts` | `crypto-js` v4.2.0 | Encrypt/decrypt sensitive test values |
| `src/utils/EncryptEnvFile.ts` | `crypto-js` v4.2.0 | Encrypt `.env` files for safe storage |
| `src/utils/LoggerUtil.ts` | `winston` v3.19.0 | Structured logging utility |

An additional dependency, `moment-timezone` (v0.6.0), is available for timezone-aware date handling in tests.

Test data files live in `src/testdata/`:

- `contacts.json` — Contact-related test data
- `datademo.json` — Demo/sample dataset

---

## Architecture

The framework follows a layered architecture designed for scalability and maintainability:

```
┌─────────────────────────────────────────────┐
│              Spec Files (.spec.ts)           │   ← test scenarios
├─────────────────────────────────────────────┤
│              Fixtures (.fixtures.ts)         │   ← test context & setup
├─────────────────────────────────────────────┤
│              Helpers (*Helper.ts)            │   ← reusable test workflows
├─────────────────────────────────────────────┤
│              PageManager                     │   ← page object orchestrator
├─────────────────────────────────────────────┤
│              Page Objects (*Page.ts)         │   ← element locators & actions
├─────────────────────────────────────────────┤
│         Utilities + Config + Logging         │   ← cross-cutting concerns
└─────────────────────────────────────────────┘
```

### Page Object Model (POM)

Each page or component in the application has a dedicated page object in `src/pages/`:

| Page Object | Represents |
|-------------|------------|
| `HomePage.ts` | Home / landing page |
| `DashboardPage.ts` | Main dashboard |
| `DashboardGraphPage.ts` | Dashboard graph components |
| `DashboardKpisPage.ts` | Dashboard KPI widgets |
| `DataRequestPage.ts` | Data request form |
| `EventPage.ts` | Event management |
| `FAQPage.ts` | FAQ section |
| `FeatureBugRequestPage.ts` | Feature/bug request form |
| `ICPPage.ts` | ICP (Ideal Customer Profile) page |
| `SettingsPage.ts` | Settings screen |
| `ContactAccountAdminModalPage.ts` | Contact admin modal dialog |

### PageManager

`src/pages/PageManager.ts` acts as the **single entry point** for accessing all page objects. Tests never instantiate page objects directly — they go through the PageManager, which manages lifecycle and browser context.

### Fixtures

Fixtures provide scoped setup and teardown for test suites:

| File | Scope |
|------|-------|
| `src/tests/fixtures.ts` | Base fixture — re-exports Playwright's `test` and `expect` |
| `src/tests/smoke/dashboard/dashboardSmoke.fixtures.ts` | Smoke suite dashboard setup |
| `src/tests/regression/dashboard/dashboardRegression.fixtures.ts` | Regression suite dashboard setup |
| `src/tests/e2e/dashboard/dashboardE2E.fixtures.ts` | E2E suite dashboard setup |

Suite-specific fixtures extend the base to inject authenticated sessions, page managers, or pre-loaded test data.

### Helpers

Helpers encapsulate multi-step workflows that are shared across specs:

| Helper | Purpose |
|--------|---------|
| `DashboardAuthHelper.ts` | Authentication flows for dashboard tests |
| `DashboardE2EHelper.ts` | Common E2E workflow steps |
| `DashboardGraphDataHelper.ts` | Graph data setup and validation |
| `DashboardKpiDataHelper.ts` | KPI data setup and validation |

### Test Organization

Tests are organized into three tiers by scope:

```
src/tests/
├── smoke/           ← fast deployment-gate checks
│   ├── dashboard/
│   ├── home/
│   ├── navigation/
│   ├── pages/
│   └── privacy/
├── regression/      ← feature-level guards
│   └── dashboard/
└── e2e/             ← full user journey tests
    └── dashboard/
```

---

## Smoke Tests — drhorton.com

The smoke suite validates that every critical page on [drhorton.com](https://www.drhorton.com/) loads, renders key elements, and responds to basic user interactions. Tests are fast, independent, and designed to serve as a deployment gate.

### Smoke Test Architecture

```
src/
├── pages/
│   ├── BasePage.ts              ← shared header / footer / nav / cookie-banner locators
│   ├── HomePage.ts              ← hero, community search, logo
│   ├── WhoWeArePage.ts          ← /who-we-are
│   ├── SmartHomePage.ts         ← /smart-home
│   ├── ServicesPage.ts          ← /services
│   ├── CustomerCarePage.ts      ← /customer-care
│   ├── ContactUsPage.ts         ← /contact-us-page
│   ├── WarrantyPage.ts          ← /warranty
│   ├── MilitaryBenefitsPage.ts  ← /military-benefits
│   ├── CareersPage.ts           ← /careers
│   ├── StateLandingPage.ts      ← /:state (e.g. /texas)
│   └── PageManager.ts           ← lazy-instantiation factory for all page objects
└── tests/
    ├── fixtures.ts              ← base fixture injecting PageManager as `pm`
    └── smoke/
        ├── home/
        │   └── homeSmoke.spec.ts          ← SMK-001, 002, 012, 013, 017, 018
        ├── navigation/
        │   └── navigationSmoke.spec.ts    ← SMK-003
        ├── pages/
        │   └── pageLoadSmoke.spec.ts      ← SMK-004 – 011, 016
        └── privacy/
            └── cookieSmoke.spec.ts        ← SMK-014, 015
```

**How it connects:**

1. **BasePage** provides common locators (logo, nav, footer, cookie banner) and methods (`goto()`, `dismissCookieBanner()`, `navLink()`).
2. Each **Page Object** extends `BasePage`, adding page-specific locators (headings, forms) and an `open()` method.
3. **PageManager** exposes every page object via lazy getters — pages are only instantiated when accessed.
4. **fixtures.ts** extends Playwright's `test` to inject a `pm` (PageManager) instance into every test.
5. **Spec files** use `pm` to navigate, interact, assert, and attach screenshots:

```ts
test('SMK-001: Home page loads', { tag: ['@smoke'] }, async ({ pm, page }) => {
  await test.step('Verify page title', async () => {
    await expect(page).toHaveTitle(/D\.R\. Horton America.*Largest Home Builder/i);
  });
  await test.step('Attach screenshot', async () => {
    await test.info().attach('home-page-loaded', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });
});
```

### Test Inventory

| ID | Test | Spec File |
|----|------|-----------|
| SMK-001 | Home page loads | `homeSmoke.spec.ts` |
| SMK-002 | Logo renders on home page | `homeSmoke.spec.ts` |
| SMK-003 | Main navigation links resolve | `navigationSmoke.spec.ts` |
| SMK-004 | Who We Are page loads | `pageLoadSmoke.spec.ts` |
| SMK-005 | Smart Home page loads | `pageLoadSmoke.spec.ts` |
| SMK-006 | Services page loads | `pageLoadSmoke.spec.ts` |
| SMK-007 | Customer Care page loads | `pageLoadSmoke.spec.ts` |
| SMK-008 | Contact Us page loads | `pageLoadSmoke.spec.ts` |
| SMK-009 | Warranty page loads | `pageLoadSmoke.spec.ts` |
| SMK-010 | Military Benefits page loads | `pageLoadSmoke.spec.ts` |
| SMK-011 | Careers page loads | `pageLoadSmoke.spec.ts` |
| SMK-012 | Community search is present | `homeSmoke.spec.ts` |
| SMK-013 | Footer renders on home page | `homeSmoke.spec.ts` |
| SMK-014 | Cookie banner displays | `cookieSmoke.spec.ts` |
| SMK-015 | Cookie banner dismissible | `cookieSmoke.spec.ts` |
| SMK-016 | State landing page loads (Texas) | `pageLoadSmoke.spec.ts` |
| SMK-017 | Skip to main content link | `homeSmoke.spec.ts` |
| SMK-018 | Top banner visible | `homeSmoke.spec.ts` |

### Running Smoke Tests

```bash
# Run all smoke tests (all browsers)
npm run smoke

# Run by category
npm run smoke:home          # Home page tests
npm run smoke:navigation    # Navigation link tests
npm run smoke:pages         # Page load tests
npm run smoke:privacy       # Cookie banner tests

# Run Chromium only
npx playwright test src/tests/smoke --project=chromium

# Run by @smoke tag
npx playwright test --grep @smoke

# Run headed (visible browser)
npx playwright test src/tests/smoke --headed --project=chromium
```

### Report with Screenshots

Every smoke test attaches a full-page screenshot to the Playwright HTML report. This gives immediate visual confirmation of each page's state at assertion time.

**Open the report:**

```bash
npm run report
```

**What you see in the report:**

```
┌──────────────────────────────────────────────────┐
│  Playwright Test Report                          │
│  18 passed                                       │
├──────────────────────────────────────────────────┤
│  ▸ Home Page Smoke Tests           (6 tests)     │
│  ▸ Navigation Smoke Tests          (1 test)      │
│  ▸ Page Load Smoke Tests           (9 tests)     │
│  ▸ Cookie Banner Smoke Tests       (2 tests)     │
└──────────────────────────────────────────────────┘
```

Click into any test to see:

1. **Steps** — Each `test.step()` is listed with pass/fail and duration.
2. **Attachments** — Named screenshots appear inline below the steps:

| Test | Attached Screenshot(s) |
|------|------------------------|
| SMK-001 | `home-page-loaded` |
| SMK-002 | `logo-rendered` |
| SMK-003 | `nav-who-we-are`, `nav-smart-home`, `nav-services`, `nav-customer-care` |
| SMK-004 – SMK-011, SMK-016 | One per page (e.g. `who-we-are-page`, `smart-home-page`, …, `texas-landing-page`) |
| SMK-012 | `community-search` |
| SMK-013 | `footer-rendered` |
| SMK-014 | `cookie-banner-visible` |
| SMK-015 | `cookie-banner-dismissed` |
| SMK-017 | `skip-to-main-link` |
| SMK-018 | `top-banner-visible` |

**Attachment pattern used in specs:**

```ts
await test.step('Attach screenshot', async () => {
  await test.info().attach('descriptive-name', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});
```

Screenshots are embedded directly in the HTML report — no external image hosting required. The report is fully self-contained in `playwright-report/index.html`.

---

### NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm test` | `npx playwright test` | Run all tests |
| `npm run ui` | `--ui` | Open Playwright UI mode |
| `npm run headed` | `--headed` | Run in headed browser |
| `npm run debug` | `--debug` | Run with Playwright inspector |
| `npm run chr` | `--project=chromium` | Chromium only |
| `npm run ff` | `--project=firefox` | Firefox only |
| `npm run wk` | `--project=webkit` | WebKit only |
| `npm run smoke` | `src/tests/smoke` | All smoke tests |
| `npm run smoke:home` | Smoke home suite | Home page smoke tests |
| `npm run smoke:navigation` | Smoke navigation suite | Navigation link smoke tests |
| `npm run smoke:pages` | Smoke pages suite | Page load smoke tests |
| `npm run smoke:privacy` | Smoke privacy suite | Cookie banner smoke tests |
| `npm run smoke:dashboard` | Smoke dashboard suite | Dashboard smoke tests |
| `npm run dash` | Regression dashboard suite | Dashboard regression tests |
| `npm run e2e:dashboard` | E2E dashboard suite | Dashboard E2E tests |
| `npm run last` | `--last-failed` | Re-run only failed tests |
| `npm run report` | `show-report` | Open HTML report |

---

A reusable prompt template is included for generating a formal test plan via the Playwright MCP server — **without writing any test code** on the first pass.

**Location:** `prompts/website-test-plan-review.prompt.md`

### What It Does

1. **Site Discovery** — Navigates the target URL, follows every link, maps the full site tree, and catalogues interactive elements across responsive breakpoints.
2. **Functional Assessment** — Evaluates forms, auth flows, navigation, state management, error handling, and accessibility basics.
3. **Formal Test Plan** — Produces ID'd test cases organized into three suites:
   - **Smoke** — App loads, core paths work, no 404s.
   - **Regression** — Feature-level guards (forms, dropdowns, modals, data display, layout).
   - **E2E** — Full user journeys crossing multiple pages.
4. **Risk Assessment** — High-risk areas, coverage gaps, test data needs, and open questions.

### Output

Both files are written to the `plans/` folder, date-stamped:

- `plans/test-plan-review-YYYYMMDD.md` — Markdown source
- `plans/test-plan-review-YYYYMMDD.pdf` — PDF generated via the browser

### Usage

1. Open `prompts/website-test-plan-review.prompt.md`.
2. Fill in the **Variables** table at the bottom (`TARGET_URL`, credentials, focus areas, etc.).
3. Pass the completed prompt through the Playwright MCP server.
4. Review the generated plan in `plans/`.
5. Once approved, use the smoke test generation prompt (below) to generate the actual Playwright test code.

---

### Smoke Test Generation Prompt

**Location:** `prompts/smoke-test-generation.prompt.md`

This is the **follow-up prompt** referenced above. After the test plan is approved, this prompt instructs the LLM to read the plan and generate production-ready Playwright smoke tests using the framework's built-in tooling.

#### What It Does

1. **Reads the Plan** — Parses every `SMK-*` test case from the approved test plan markdown.
2. **Explores the Site** — Uses Playwright MCP browser tools to capture real, accessible selectors (`getByRole`, `getByLabel`, `getByText`, etc.).
3. **Builds the POM** — Populates page classes (`BasePage`, `HomePage`, etc.) with discovered locators and action methods following the project's constructor-injection pattern.
4. **Wires Fixtures** — Updates `fixtures.ts` with `PageManager` integration and layers smoke-specific fixtures on top.
5. **Implements Specs** — One `test()` per `SMK-*` ID with `test.step()` for report clarity, `@smoke` tags for filtering, and screenshot attachments.
6. **Updates Scripts** — Adds per-folder `smoke:*` npm scripts if missing.
7. **Validates** — Runs compile check, lists tests, executes headed, reviews report, and fixes failures.

#### Output

| File | Purpose |
|------|---------|
| `src/pages/BasePage.ts` | Shared header/footer/banner/nav locators and methods |
| `src/pages/HomePage.ts` | Home page POM (populated) |
| `src/pages/PageManager.ts` | Factory providing all page objects (populated) |
| Additional `*Page.ts` files | One per page referenced by smoke tests |
| `src/tests/fixtures.ts` | Base fixture wiring PageManager |
| `src/tests/smoke/home/homeSmoke.spec.ts` | Home page smoke tests |
| `src/tests/smoke/navigation/navigationSmoke.spec.ts` | Navigation smoke tests |
| `src/tests/smoke/pages/pageLoadSmoke.spec.ts` | Page load smoke tests |
| `src/tests/smoke/privacy/cookieSmoke.spec.ts` | Cookie banner smoke tests |

#### Usage

1. Open `prompts/smoke-test-generation.prompt.md`.
2. Fill in the **Variables** table at the bottom (`PLAN_FILE`, `TARGET_URL`, credentials, browser).
3. Pass the completed prompt through the Playwright MCP server.
4. The LLM will explore the site, build page objects, and generate all smoke specs.
5. Review the HTML report: `npm run report`.

---

## Template Blueprint File

Detailed framework blueprint is also available one level up:

- ../enterprise-playwright-framework-template.md
