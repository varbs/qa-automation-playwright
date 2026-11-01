# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Playwright + JavaScript (CommonJS) UI test automation for https://automationexercise.com, a live public site. There is no app to build here; the repo holds only tests. A Postman collection in `postman/` covers the site's REST API.

## Commands

```bash
npm install && npx playwright install       # setup
npx playwright test                              # all tests on chromium, firefox, webkit, edge and chrome
npx playwright test --project='logged-out-*'     # auth suites only (all browsers)
npx playwright test --project='logged-in-*'      # products/cart suites only (all browsers)
npx playwright test --project='*-chromium'       # one browser only
npx playwright test tests/features/05_Products/                 # one suite
npx playwright test path/to/File.spec.js -g "TC-CART-FUNC-002"  # one test by title
npx playwright test --headed                 # or: npm run test:headed
npx playwright show-report                   # or: npm run test:report
```

API collection (Newman):
```bash
npx newman run "postman/Automation exercise API.postman_collection.json" \
  --env-var "baseUrl=https://automationexercise.com/api" \
  --env-var "email=..." --env-var "password=..."
```
Collection folders run in numbered order (`01` → `04`), so account create/delete runs last and doesn't break the login checks that depend on an existing account.

There is no linter or formatter configured.

## Environment

`.env` must define `LOGIN_EMAIL` and `LOGIN_PASSWORD` for an existing account on the site. `global-setup.js` uses them to log in once before every run and writes `.auth/session.json`. If the credentials are missing or wrong, **every** run fails in global setup, even logged-out-only runs. CI (`.github/workflows/playwright.yml`) reads them from GitHub secrets.

## Architecture

**Projects: auth state × browser, selected by folder name** (`playwright.config.js`). The config generates a `logged-out-<browser>` and a `logged-in-<browser>` project for each of chromium, firefox, webkit, edge (`msedge` channel) and chrome (`chrome` channel). The edge and chrome projects need those browsers installed locally. CI runs only the chromium, firefox and webkit projects, to stay under the workflow's 60-minute timeout:
- `logged-out-*` matches `**/01_Login/**`, `**/02_Signup/**`, `**/03_AccountDeletion/**` and `**/04_Logout/**`. Each test starts in a fresh browser.
- `logged-in-*` matches `**/05_Products/**`, `**/06_Cart/**` and `**/07_ContactUs/**`. These tests load `storageState: .auth/session.json`.

The session file is saved once (from Chromium) and reused by all three browsers. All logged-in projects share one account, and its cart is stored on the server. When projects run in parallel, tests that add to or clear the cart can interfere with each other across browsers and across spec files.

A new suite folder must match one of these `testMatch` globs or it will not run. The numeric prefix decides which project it belongs to.

**Custom fixture (`fixtures/fixture.js`)**: specs import `test` from here, not from `@playwright/test`. It:
- overrides `page` to block ad domains (doubleclick, googlesyndication), which otherwise cause flaky overlays on this site;
- provides each page object as a fixture. `loginPage` and `signupPage` fixtures already navigate to `/login` and check that the page loaded, so tests using them start on that page. The other page-object fixtures (`homePage`, `productsPage`, `cartPage`, …) only construct the object, and the test has to navigate.
A new page object must be registered here before tests can use it.

**Page Object Model (`pages/`)**: every page extends `BasePage`, which provides shared checks such as HTML5 required-field and `typeMismatch` email validation. Locators are defined in the constructor. Assertions live in page methods named `verify*`, so specs mostly call page methods rather than `expect` directly.

**Flows (`flows/`)**: multi-page journeys such as `completeSignup(signupPage, accountInfoPage, user, opts)`. Each step is wrapped in `.catch` that rethrows with a step-specific message.

**Test data**:
- `test-data/` holds static and data-driven case tables. Specs loop over them with `for...of` to generate tests.
- `utils/generateUser.js` builds unique Faker/uuid users for signup.
- `constants/` holds enums such as `VALIDATION_TYPES` and `SUBMIT_METHOD`.

**Test ID convention**: test titles start with `TC-<AREA>-<TYPE>-NNN` (e.g. `TC-LOGIN-VAL-003`, `TC-CART-FUNC-001`), numbered by `createTcCounter()` from `utils/testCaseHelper.js`. Each spec file creates its own counter at module level. IDs therefore depend on declaration order: inserting a test renumbers every test after it.

Specs are split per feature into `*Functionality.spec.js`, `*UI.spec.js` and `*Validation.spec.js`.

## Work in progress

These files are untracked and still being written:
- `playwright.api.config.js` and `api-clients/productsApi.js` are empty.
- `fixtures/apiFixture.js` only exports a `buildApiUser` payload builder.

They look like the start of a Playwright API-testing layer. `07_ContactUs` is in the config but has no tests yet.
