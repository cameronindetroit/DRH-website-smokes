Title: ci: skip utility PDF-generation test in CI

Body:
Skip the utility `src/tests/utils/generate-pdf.spec.ts` test when running in CI (detects `GITHUB_ACTIONS` or `CI`). This prevents PDF generation from running in workflows and causing failures.

What to run locally to create the PR (replace <branch> if different):

```bash
# if you haven't pushed the branch yet
git push --set-upstream origin $(git rev-parse --abbrev-ref HEAD)

# create the PR (uses repo default base)
gh pr create --title "ci: skip utility PDF-generation test in CI" --body "Skip the utility src/tests/utils/generate-pdf.spec.ts test when running in CI (detects GITHUB_ACTIONS or CI). This prevents PDF generation from running in workflows and causing failures." --head $(git rev-parse --abbrev-ref HEAD)
```
