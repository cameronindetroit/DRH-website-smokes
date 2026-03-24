## Description

Add a new `ListingsPage` page object to centralize listing-related locators and methods, and refactor `SMK-020` to use the new page object.

This change moves page-specific listing selectors into `ListingsPage` and exposes it via `PageManager` so tests use `pm.listingsPage`.

## Type of Change

- [x] `refactor` — Code restructure (no behavior change)

## Test Suite Affected

- [x] Smoke

## Changes

- Added `src/pages/ListingsPage.ts` (new page object)
- Updated `src/pages/PageManager.ts` to expose `listingsPage`
- Updated `src/tests/smoke/home/homeSmoke.spec.ts` (`SMK-020`) to use `pm.listingsPage`

## How to Verify

1. `git checkout feature/edge-404-redirect`
2. `npm install`
3. `npx playwright test src/tests/smoke/home/homeSmoke.spec.ts -g "SMK-020" --project=chromium`

## Checklist

- [x] PR title follows conventional format: `refactor(pom): add ListingsPage and use in SMK-020`
- [x] Tests pass locally
- [x] New page objects extend `BasePage` and are registered in `PageManager`
- [x] New tests use `test.step()` and attach screenshots where applicable
