## Title Format

feat(smoke): assert redirect behavior for non-existent paths

## Description

This PR updates the home smoke tests to validate the site's behavior when navigating to a non-existent path. The site redirects such requests to the homepage; the new `EDGE-404-REDIRECT` test asserts the redirect (301/302) and verifies homepage content via the `pm.homePage.topBanner` locator. Temporary video-recording scripts and generated assets were removed.

## Type of Change


## Test Suite Affected


## Changes


## Screenshots / Report Evidence

Attach test run screenshot or Playwright report evidence when available.

## How to Verify

1. `git checkout feature/edge-404-redirect`
2. `npm install`
3. `npx playwright test src/tests/smoke/home/homeSmoke.spec.ts -g "EDGE-404-REDIRECT" --project=chromium`
4. Confirm test passes and that the Playwright report shows the attached screenshot.

## Checklist


## Risk & Impact

Low. Modifies only smoke tests and removes temporary debugging artifacts. No production code changes.

## Rollback

Revert the merge commit to undo.
## Summary

This PR makes the smoke home search data-driven and more robust.

- Replace hard-coded state picks with a data-driven `src/testdata/states.json` file.
- Add `RandomUtil` (seeded mulberry32 RNG) and support `SMK_SEED` for reproducible smoke selections.
- Refactor `SMK-020` to use the new selection flow and attach selection metadata to test info.
- Harden state selection on both the Home search and State landing search to avoid ambiguous matches (exact-match algorithm for listbox options and link fallbacks).
- Add a scraper script `scripts/scrape_drhorton_states.mjs` used to populate `states.json`.

## Type of Change

- [x] `feat` — New feature / behavior change

## Files Changed (high level)

- `src/testdata/states.json` — new data file (37 states + cities)
- `src/utils/RandomUtil.ts` — new seeded RNG helper
- `src/tests/smoke/home/homeSmoke.spec.ts` — refactored to use `RandomUtil` and attach selection-info
- `src/pages/HomePage.ts` — hardened `selectStateFromSearch` (exact-match listbox logic)
- `src/pages/StateLandingPage.ts` — hardened `searchAndOpenState` (exact-match selection)
- `scripts/scrape_drhorton_states.mjs` — scraper to generate `states.json`
- README updated with `SMK_SEED`/selection docs

## How to Test Locally

1. Install deps: `npm install`
2. Run the smoke suite (chromium):

```bash
npx playwright test src/tests/smoke --project=chromium
```

3. Reproduce a deterministic selection (example):

```bash
SMK_SEED=42 npx playwright test src/tests/smoke/home/homeSmoke.spec.ts -g "SMK-020" --project=chromium
```

## Notes

- The selection metadata (method, seed, chosen indexes, chosen states) is attached to the test so CI/debugging can reproduce picks.
- If CI prefers deterministic rotation, `RotationUtil` is still available and untouched; `SMK_ROTATION_INDEX` can be used where desired.

## PR Title Suggestion

`feat(smoke): data-driven state selection + seeded RNG and selector hardening`

## Checklist

- [x] Commit message follows conventional format
- [x] Tests pass locally (smoke suite)
- [x] README updated
- [x] PR description explains verification steps

---

Additional details and artifacts (screenshots, run logs) are available in the Playwright report and test-results folder.
