# QA Automation — Automation Exercise

Playwright + JavaScript test automation portfolio project for [automationexercise.com](https://automationexercise.com). It covers UI tests across five browsers, plus API tests in Playwright and Postman.

## Test Suites

### UI

| Suite | Functionality | UI | Validation |
|---|---|---|---|
| Login | ✅ | ✅ | ✅ |
| Signup | ✅ | ✅ | ✅ |
| Account Information | ✅ | ✅ | ✅ |
| Account Deletion | ✅ | — | — |
| Logout | ✅ | — | — |
| Products | ✅ | ✅ | — |
| Cart | ✅ | — | — |

### API (Playwright)

| Suite | Functionality | Validation |
|---|---|---|
| Products | ✅ | ✅ |
| Account | ✅ | ✅ |

## What's Covered

### Products
- Product listing page navigation and visibility
- Product detail page: name, category, price, availability, condition, brand
- Add to cart from product list and product detail page
- Quantity controls: manual input, ArrowUp / ArrowDown keyboard interaction
- Product search: valid keyword, no results, case-insensitive, empty keyword, keyword match, navigate from results
- UI assertions: page title, product card images, names, prices, Add to Cart and View Product buttons, search bar

### Cart
- Navigate to the cart page
- Add a single product and multiple products to the cart by name
- _Temporarily disabled:_ checks that added items show the correct name, price and quantity. All browsers share one account, and its cart is stored on the server, so these checks clash when the browsers run in parallel.

### Products API
- `GET /api/productsList` returns a list of products, and each product has an id, name and price
- `GET /api/brandsList` returns a list of brands
- `POST /api/searchProduct` returns products matching the search term
- Validation:
  - `POST /api/productsList` and `PUT /api/brandsList` are rejected as unsupported methods
  - a search request without a search term is refused

### Account API
- Full account lifecycle in one test: create → read back by email → log in → update → confirm the update → delete → confirm login now fails
- A newly created account can log in
- Validation:
  - login without an email, or with invalid details, is refused
  - `DELETE /api/verifyLogin` is rejected as an unsupported method
  - updating an account that doesn't exist is refused
  - creating an account with an email that's already registered is refused
  - creating an account without a name, email or password is refused

## Cross-Browser Testing

Every UI test runs on five browsers:

| Browser | Project suffix | Runs in CI |
|---|---|---|
| Chromium | `-chromium` | ✅ |
| Firefox | `-firefox` | ✅ |
| WebKit (Safari) | `-webkit` | ✅ |
| Microsoft Edge | `-edge` | Local only |
| Google Chrome | `-chrome` | Local only |

Edge and Chrome use the browsers installed on your machine, so install them before running those projects.

## Session Management

Each browser has two projects: logged-out and logged-in. They keep authenticated and unauthenticated tests apart.

| Project | Test Suites | Auth |
|---|---|---|
| `logged-out-<browser>` | Login, Signup, Account Information, Account Deletion, Logout | Fresh browser |
| `logged-in-<browser>` | Products, Cart, Contact Us _(coming soon)_ | Reuses saved session |

A `globalSetup` script runs once before all tests. It logs in and saves the session to `.auth/session.json`. The `logged-in-*` projects load that file automatically, so their tests start already logged in.

## Tech Stack

- [Playwright](https://playwright.dev/): test framework, browser automation and API testing
- JavaScript (Node.js)
- [Faker.js](https://fakerjs.dev/): dynamic test data generation
- [Postman](https://www.postman.com/) / [Newman](https://github.com/postmanlabs/newman): API collection
- GitHub Actions: CI/CD pipeline

## Patterns Used

- **Page Object Model (POM):** page interactions are wrapped in reusable classes.
- **API client classes:** API endpoints are wrapped in `ProductsApi` and `AccountApi`.
- **Data-driven testing:** test cases are generated from data files with `for...of` loops.
- **Custom fixtures:** Playwright's `test` is extended with ready-made page objects and API clients.
- **Reusable flows:** shared login and signup steps live in flow helpers.
- **Session management:** `storageState` keeps the login session across test suites.
- **Test tagging:** tests are tagged `@smoke` or `@regression` so you can run a subset.

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

Copy `.env.example` to `.env` and fill in the credentials of an existing automationexercise.com account:

```env
LOGIN_EMAIL=your@email.com
LOGIN_PASSWORD=yourpassword
```

The UI tests need these credentials. If they're missing or wrong, every UI run fails in global setup, even logged-out-only runs. The `.auth/` folder is git-ignored and generated automatically at runtime.

### Running UI Tests

```bash
# Run all UI tests on all five browsers
npx playwright test

# Run tagged subsets
npm run test:smoke
npm run test:regression
npm run test:smoke:chromium        # smoke tests on Chromium only

# Run a specific project or browser
npx playwright test --project='logged-out-*'
npx playwright test --project='logged-in-*'
npx playwright test --project='*-firefox'

# Run a specific suite
npx playwright test tests/features/05_Products/

# Open the HTML report
npx playwright show-report
```

Local runs retry a failed test once, and CI retries twice. The live site sometimes returns Cloudflare 520 errors, and the retries absorb them. A test that passes on retry is reported as "flaky".

### Running API Tests

The Playwright API tests have their own config and report. They don't need browsers or login credentials. The account tests create throwaway accounts and delete them afterwards.

```bash
npm run test:api
npm run test:api:report            # open the API HTML report
```

### Running the Postman Collection

A Postman collection in [`postman/`](postman/) covers products/brands, search, login and the account lifecycle. Its folders run in numbered order (`01` → `04`), so account creation and deletion happen last. That way they don't interfere with the login checks, which need an existing account.

```bash
npx newman run postman/automation-exercise-api.postman_collection.json \
  --env-var "baseUrl=https://automationexercise.com/api" \
  --env-var "email=your@email.com" \
  --env-var "password=yourpassword"
```

## Continuous Integration

GitHub Actions runs on every push and pull request to `main`, with two jobs in parallel:

| Job | What it runs | Report artifact |
|---|---|---|
| `test` | UI tests on Chromium, Firefox and WebKit | `playwright-report` |
| `api-test` | Playwright API tests | `playwright-report-api` |

The UI job reads `LOGIN_EMAIL` and `LOGIN_PASSWORD` from GitHub repository secrets.
