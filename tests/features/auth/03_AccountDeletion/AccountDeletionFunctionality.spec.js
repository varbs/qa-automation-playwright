const { test } = require("../../../../fixtures/fixture");

const { completeSignup } = require('../../../../flows/auth/accountFlows');
const { generateSignupUser } = require('../../../../utils/generateUser');
const { createTcCounter } = require('../../../../utils/testCaseHelper');

const nextTcId = createTcCounter();

test.describe('Account Deletion Functionality', () => {
    let user;

    test.beforeEach(async ({ homePage, signupPage, accountInfoPage }) => {
        user = generateSignupUser();
        await completeSignup(
            signupPage,
            accountInfoPage,
            user);

        await homePage.continueToHomePage();
        await homePage.verifyUserisLoggedIn();

        await homePage.deleteAccountAndVerifyDeletion();
    });

    test(`TC-DEL-FUNC-${nextTcId()} - Verify logged in user can delete their account`, async () => {
        // Account deletion is verified by the beforeEach hook
    });

    test(`TC-DEL-FUNC-${nextTcId()} - Verify deleted account cannot log in`, async ({ loginPage }) => {
        await loginPage.navigateDirectlyToLoginPage();

        await loginPage.login(
            user.email,
            user.password
        );
        await loginPage.verifyInvalidLogin();
    });
});