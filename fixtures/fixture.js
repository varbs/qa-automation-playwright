// Import the entire Playwright Test module and store it in the variable "base".
// This gives access to Playwright's built-in test, expect, page, browser, etc.
const base = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const SignupPage = require('../pages/SignupPage');
const AccountInfo = require('../pages/AccountInformationPage');

// Create a custom version of Playwright's test by extending the built-in fixtures.
// This allows us to add our own fixtures (loginPage, signupPage, etc.).
exports.test = base.test.extend({

    // Create a fixture named "loginPage".
    // This fixture will automatically be available in any test that requests it.
    // { page } - Playwright's built-in browser page fixture.
    // use - A special Playwright function that makes the fixture available to the test.
    loginPage: async ({ page }, use) => {

        // Create an instance (object) of the LoginPage class.
        // The Playwright page is passed into the constructor so the Page Object can interact with the browser
        const loginPage = new LoginPage(page);


        // Perform common setup before the test starts.
        // Every test that uses this fixture will automatically:
        // 1. Open the website.
        // 2. Navigate to the Login/Signup page.
        await loginPage.openSignupLoginPage();
        await loginPage.verifyLoginPageLoaded();

        // Provide the loginPage object to the test (LoginPage.spec.js).
        // The test can now use:
        // async ({ loginPage }) => { ... }
        await use(loginPage);

        // Any code placed AFTER await use() runs AFTER the test finishes.
        // This is useful for cleanup if needed.
        // Example:
        // await page.close();

    },

    signupPage: async ({ page }, use) => {
        const signupPage = new SignupPage(page);
        await signupPage.openSignupLoginPage();

        await use(signupPage);
    },

    accountInfoPage: async ({ page }, use) => {
        await use(new AccountInfo(page));
    }


});


// Export Playwright's expect so tests can import both
// test and expect from this fixtures file.
//
// Example:
// const { test, expect } = require('../fixtures/fixtures');
exports.expect = base.expect;