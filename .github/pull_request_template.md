## Title Format

<!-- Use Conventional Commits format for the PR title:
  type(scope): short description

  Types:
    feat     — new test, page object, or framework capability
    fix      — fix a broken test, flaky selector, or bug
    refactor — restructure code without changing behavior
    ci       — changes to GitHub Actions workflows
    docs     — documentation only
    chore    — dependency updates, config tweaks, cleanup

  Scope (optional): smoke, regression, e2e, pom, fixtures, ci

  Examples:
    feat(smoke): add community search validation tests
    fix(pom): update warranty page heading selector
    ci: add Firefox to scheduled smoke run
    docs: update README branching strategy
-->

## Description

<!-- What does this PR do and why? Link to any related issue or test plan IDs. -->

## Type of Change

- [ ] `feat` — New test(s) or framework feature
- [ ] `fix` — Bug fix / flaky test fix
- [ ] `refactor` — Code restructure (no behavior change)
- [ ] `ci` — CI/CD workflow change
- [ ] `docs` — Documentation update
- [ ] `chore` — Dependency update / config change

## Test Suite Affected

- [ ] Smoke
- [ ] Regression
- [ ] E2E
- [ ] None (docs/ci/chore only)

## Changes

<!-- List the specific changes made. Reference test IDs (SMK-XXX, REG-XXX, E2E-XXX) where applicable. -->

-

## Screenshots / Report Evidence

<!-- Paste or attach Playwright report screenshots showing the tests pass.
     For new tests, include the "Attach screenshot" output from the report. -->

## How to Verify

<!-- Steps a reviewer can follow to validate this PR locally: -->

1. `git checkout <this-branch>`
2. `npm install`
3. `npm run smoke` (or relevant script)
4. `npm run report` — verify results

## Checklist

- [ ] PR title follows conventional format: `type(scope): description`
- [ ] Tests pass locally
- [ ] No new lint/compile errors
- [ ] Screenshots verified in Playwright report
- [ ] PR targets the correct branch (`feature/*` → `develop`, `develop` → `master`)
- [ ] New page objects extend `BasePage` and are registered in `PageManager`
- [ ] New tests use `test.step()` and attach screenshots

## Branch Flow

```
feature/* or bugfix/*  →  develop  →  master
```

## Risk & Impact

<!-- What could go wrong? Are any existing tests affected? -->

-

## Rollback

<!-- If this causes issues, how do we revert? Usually: revert the merge commit. -->

-
