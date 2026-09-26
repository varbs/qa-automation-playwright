const base = require('@playwright/test');

const AccountInfoPage = require('../pages/auth/AccountInformationPage');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/auth/LoginPage');
const SignupPage = require('../pages/auth/SignupPage');
const ProductsPage = require('../pages/products/ProductsPage');
const ProductsDetailPage = require('../pages/products/ProductsDetailPage');

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
    },


    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    productsDetailPage: async ({ page }, use) => {
        const productsDetailPage = new ProductsDetailPage(page);
        await use(productsDetailPage);
    }
});


exports.expect = base.expect;