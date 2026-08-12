const { test } = require("../../../../fixtures/fixture");

const { completeSignup } = require('../../../../flows/auth/accountFlows');

const { signupCountries } = require('../../../../test-data/auth/signup/signupCountries');

const { generateSignupUser } = require('../../../../utils/generateUser');


test.describe('Signup Functionality', () => {

    let user;

    test.beforeEach(async ({ signupPage, accountInfoPage }) => {
        user = generateSignupUser();
        await completeSignup(signupPage, accountInfoPage, user);
    });

    test('TC-SIGNUP-FUNC-001 - Verify user can sign up with valid credentials', async () => {
        // Covered by beforeEach
    });

    test('TC-SIGNUP-FUNC-002 - Verify newly created user is logged in automatically', async ({ homePage }) => {
        await homePage.continueToHomePage();
        await homePage.verifyUserisLoggedIn();
    });

    test.describe('Account Deletion', () => {
        test.beforeEach(async ({ homePage }) => {
            await homePage.continueToHomePage();
            await homePage.verifyUserisLoggedIn();

            await homePage.deleteAccountAndVerifyDeletion();
        })
        test('TC-SIGNUP-FUNC-003 - Verify user can delete newly created account', async ({ homePage }) => {
            // Covered by beforeEach
        });

        test('TC-SIGNUP-FUNC-004 - Verify deleted user cannot log in', async ({ homePage, loginPage }) => {
            await loginPage.navigateToLoginPage();

            await loginPage.login(
                user.email,
                user.password
            );

            await loginPage.verifyInvalidLogin();
        });
    })

});