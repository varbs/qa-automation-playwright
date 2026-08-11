const { test } = require("../../../fixtures/fixture");

const { completeSignup } = require('../../../flows/accountFlows');

const { signupCountries } = require('../../../test-data/signup/signupCountries');

const { generateSignupUser } = require('../../../utils/generateUser');


test.describe('Signup Functionality', () => {
    test('TC-SIGNUP-FUNC-001 - Verify user can sign up with valid credentials', async ({ signupPage, accountInfoPage }) => {
        const user = generateSignupUser();
        await completeSignup(signupPage, accountInfoPage, user);
    });

    test('TC-SIGNUP-FUNC-002 - Verify newly created user is logged in automatically', async ({ signupPage, accountInfoPage, homePage }) => {
        const user = generateSignupUser();
        // Use the default country
        await completeSignup(signupPage, accountInfoPage, user);

        await homePage.continueToHomePage();
        await homePage.verifyUserisLoggedIn();
    });

    test('TC-SIGNUP-FUNC-003 - Verify user can delete newly created account', async ({ signupPage, accountInfoPage, homePage }) => {
        const user = generateSignupUser();
        // Override the default country
        await completeSignup(signupPage, accountInfoPage, user, signupCountries.australia);

        await homePage.continueToHomePage();
        await homePage.verifyUserisLoggedIn();

        await homePage.deleteAccountAndVerifyDeletion();
    });

    test('TC-SIGNUP-FUNC-004 - Verify deleted user cannot log in', async ({ signupPage, accountInfoPage, loginPage, homePage }) => {
        const user = generateSignupUser();
        await completeSignup(signupPage, accountInfoPage, user);

        await homePage.continueToHomePage();
        await homePage.verifyUserisLoggedIn();

        await homePage.deleteAccountAndVerifyDeletion();

        await homePage.continueToHomePage();
        await homePage.verifyUserIsLoggedOut();

        await loginPage.navigateToLoginPage();

        await loginPage.login(
            user.email,
            user.password
        );

        await loginPage.verifyInvalidLogin();
    });
});