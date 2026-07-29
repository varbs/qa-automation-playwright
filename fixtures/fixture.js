// imports playwright's testing library
// {test , expect} = import the whole module as base
// ex: base.test or base.expect
const base = require('@playwright/test');

//importing the Page Object classes
const LoginPage = require('../pages/LoginPage');
const SignupPage = require('../pages/SignupPage');

exports.test = base.test.extend({

    // Fixture : loginPage
    // Page - plawright built-in page object (ex. page.goto(), page.fill())
    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);

        //await use(new LoginPage(page));


    },

   signupPage: async ({ page }, use) => {
    
        const signupPage = new SignupPage(page);

        await use(signupPage);


    }

});

exports.expect = base.expect;