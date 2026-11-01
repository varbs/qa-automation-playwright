const base = require('@playwright/test');

const AccountInfoPage = require('../pages/auth/AccountInfoPage');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/auth/LoginPage');
const SignupPage = require('../pages/auth/SignupPage');
const ProductsPage = require('../pages/products/ProductsPage');
const ProductDetailPage = require('../pages/products/ProductDetailPage');
const CartPage = require('../pages/cart/CartPage');

exports.test = base.test.extend({

    page: async ({ page }, use) => {
        await page.route('**/*', (route) => {
            const blocked = ['doubleclick.net', 'googlesyndication.com', 'adsbygoogle.js'];
            if (blocked.some(ad => route.request().url().includes(ad))) {
                route.abort();
            } else {
                route.continue();
            }
        });
        await use(page);
    },

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

    productDetailPage: async ({ page }, use) => {
        const productDetailPage = new ProductDetailPage(page);
        await use(productDetailPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
});

exports.expect = base.expect;