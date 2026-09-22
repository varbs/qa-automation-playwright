const base = require('@playwright/test');

const AccountInfoPage = require('../pages/auth/AccountInformationPage');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/auth/LoginPage');
const SignupPage = require('../pages/auth/SignupPage');

exports.test = base.test.extend({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateDirectlyToLoginPage();
        await loginPage.verifyLoginPageLoaded();

        await use(loginPage);
    },

    signupPage: async ({ page }, use) => {
        const signupPage = new SignupPage(page);

        await signupPage.navigateDirectlyToLoginPage();
        await signupPage.verifySignupPageLoaded();        
        await use(signupPage);
    },

    accountInfoPage: async ({ page }, use) => {
        const accountInfoPage = new AccountInfoPage(page);
        await use(accountInfoPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }});

exports.expect = base.expect;