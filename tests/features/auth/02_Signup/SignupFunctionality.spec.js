const { test } = require("../../../../fixtures/fixture");

const SUBMIT_METHOD = require('../../../../constant/submitMethods');

const { completeSignup } = require('../../../../flows/auth/accountFlows');
const { generateSignupUser } = require('../../../../utils/generateUser');
const { createTcCounter } = require('../../../../utils/testCaseHelper');

const nextTcId = createTcCounter();

test.describe('Signup Functionality', () => {

    test(`TC-SIGNUP-FUNC-${nextTcId()} - Verify user can sign up with valid credentials`, async ({ signupPage, accountInfoPage }) => {
        const user = generateSignupUser();
        await completeSignup(
            signupPage,
            accountInfoPage,
            user);
    });

    test(`TC-SIGNUP-FUNC-${nextTcId()} - Verify signup form submits successfully using the Enter key`, async ({ signupPage, accountInfoPage }) => {
        const user = generateSignupUser();
        await completeSignup(
            signupPage,
            accountInfoPage,
            user,
            SUBMIT_METHOD.ENTER);
    });

    test.describe('New Created Account', () => {
        let user;

        test.beforeEach(async ({ signupPage, accountInfoPage }) => {
            user = generateSignupUser();
            await completeSignup(
                signupPage,
                accountInfoPage,
                user);
        });

        test(`TC-SIGNUP-FUNC-${nextTcId()} - Verify newly created user is logged in automatically`, async ({ homePage }) => {
            await homePage.continueToHomePage();
            await homePage.verifyUserisLoggedIn();
        });

        test.describe('Account Deletion', () => {

            test.beforeEach(async ({ homePage }) => {
                await homePage.continueToHomePage();
                await homePage.verifyUserisLoggedIn();

                await homePage.deleteAccountAndVerifyDeletion();
            });

            test(`TC-SIGNUP-FUNC-${nextTcId()} - Verify user can delete newly created account`, async () => {
                // Account deletion is verified by the beforeEach hook
            });

            test(`TC-SIGNUP-FUNC-${nextTcId()} - Verify deleted user cannot log in`, async ({ loginPage }) => {
                await loginPage.navigateToLoginPage();

                await loginPage.login(
                    user.email,
                    user.password
                );
                await loginPage.verifyInvalidLogin();
            });
        });
    });
});