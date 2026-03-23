## Title Format

feat(smoke): assert redirect behavior for non-existent paths

## Description

This PR updates the home smoke tests to validate the site's behavior when navigating to a non-existent path. The site redirects such requests to the homepage; the new `EDGE-404-REDIRECT` test asserts the redirect (301/302) and verifies homepage content via the `pm.homePage.topBanner` locator. Temporary video-recording scripts and generated assets were removed.

## Type of Change

- [x] `feat` — New test(s) or framework feature

## Test Suite Affected

- [x] Smoke

## Changes

- Updated: `src/tests/smoke/home/homeSmoke.spec.ts` — replaced simulated 404 test with `EDGE-404-REDIRECT` that asserts redirect-to-home and checks `pm.homePage.topBanner`.
- Removed: `tmp/record-404-video.js`, `tmp/record-404-video.cjs` and recorded assets.
- Added: none

## Screenshots / Report Evidence

Attach test run screenshot or Playwright report evidence when available.

## How to Verify

1. `git checkout feature/edge-404-redirect`
2. `npm install`
3. `npx playwright test src/tests/smoke/home/homeSmoke.spec.ts -g "EDGE-404-REDIRECT" --project=chromium`
4. Confirm test passes and that the Playwright report shows the attached screenshot.

## Checklist

- [x] PR title follows conventional format: `type(scope): description`
- [ ] Tests pass locally
- [ ] No new lint/compile errors
- [ ] Screenshots verified in Playwright report
- [ ] PR targets the correct branch (`feature/*` → `develop`, `develop` → `master`)

## Risk & Impact

Low. Modifies only smoke tests and removes temporary debugging artifacts. No production code changes.

## Rollback

Revert the merge commit to undo.
