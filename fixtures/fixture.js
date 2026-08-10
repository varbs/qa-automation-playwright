const base = require('@playwright/test');

const AccountInfoPage = require('../pages/AccountInformationPage');
const LoginPage = require('../pages/LoginPage');
const SignupPage = require('../pages/SignupPage');

exports.test = base.test.extend({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.verifyLoginSignupPageLoaded();

        await use(loginPage);
    },

    signupPage: async ({ page }, use) => {
        const signupPage = new SignupPage(page);

        await signupPage.navigateToLoginPage();
        await use(signupPage);
    },

    accountInfoPage: async ({ page }, use) => {
        const accountInfoPage = new AccountInfoPage(page);
        await use(accountInfoPage);
    }
});

exports.expect = base.expect;