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
| `LoginPage.ts` | Login screen |
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
│   └── login/
├── regression/      ← feature-level guards
│   ├── dashboard/
│   └── login/
└── e2e/             ← full user journey tests
    ├── dashboard/
    └── login/
```

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
| `npm run smoke:dashboard` | Smoke dashboard suite | Dashboard smoke tests |
| `npm run smoke:login` | Smoke login suite | Login smoke tests |
| `npm run dash` | Regression dashboard suite | Dashboard regression tests |
| `npm run login` | Regression login suite | Login regression tests |
| `npm run e2e:dashboard` | E2E dashboard suite | Dashboard E2E tests |
| `npm run e2e:login` | E2E login suite | Login E2E tests |
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
5. Once approved, use a follow-up prompt to generate the actual Playwright test code.

## Template Blueprint File

Detailed framework blueprint is also available one level up:

- ../enterprise-playwright-framework-template.md
