# QA Automation — Automation Exercise

Playwright + JavaScript test automation portfolio project for [automationexercise.com](https://automationexercise.com).

## Test Suites

| Suite | Functionality | UI | Validation |
|---|---|---|---|
| Login | ✅ | ✅ | ✅ |
| Signup | ✅ | ✅ | ✅ |
| Account Information | ✅ | ✅ | ✅ |
| Account Deletion | ✅ | — | — |
| Logout | ✅ | — | — |
| Products | ✅ | — | — |

## Tech Stack

- [Playwright](https://playwright.dev/) — test framework and browser automation
- JavaScript (Node.js)
- [Faker.js](https://fakerjs.dev/) — dynamic test data generation
- GitHub Actions — CI/CD pipeline

## Patterns Used

- **Page Object Model (POM)** — page interactions abstracted into reusable classes
- **Data-driven testing** — test cases driven by data files using `for...of` loops
- **Custom fixtures** — extended Playwright `test` with pre-wired page objects
- **Reusable flows** — shared login/signup steps extracted into flow helpers
- **Session management** — `storageState` used to persist login session across test suites

## Session Management

Tests are split into two Playwright projects to separate authenticated and unauthenticated contexts.

| Project | Test Suites | Auth |
|---|---|---|
| `logged-out` | Login, Signup, Account Information, Account Deletion, Logout | Fresh browser |
| `logged-in` | Products, Cart, Contact Us _(coming soon)_ | Reuses saved session |

A `globalSetup` script runs once before all tests — it logs in and saves the session to `.auth/session.json`. The `logged-in` project loads that file automatically so tests start already authenticated.

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/varbs/qa-automation-playwright.git
cd qa-automation-playwright
npm install
npx playwright install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```env
LOGIN_EMAIL=your@email.com
LOGIN_PASSWORD=yourpassword
```

> The `.auth/` folder is git-ignored and generated automatically at runtime.

### Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific project
npx playwright test --project=logged-out
npx playwright test --project=logged-in

# Run a specific suite
npx playwright test tests/features/05_Products/

# Open the HTML report
npx playwright show-report
```