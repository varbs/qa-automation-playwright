const { test } = require('../../../../fixtures/fixture');

const SUBMIT_METHOD = require('../../../../constant/submitMethods');

const { loginUsers } = require('../../../../test-data/auth/login/loginUsers');
const { validUser } = loginUsers;

const { createTcCounter } = require('../../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Login Functionality', () => {

    test(`TC-LOGIN-FUNC-${nextTcId()} - Verify user can login successfully with valid registered credentials`, async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            validUser.password
        );
        await loginPage.verifyValidLogin();
    });

    test.describe('Authenticated user', () => {

        test.beforeEach(async ({ loginPage }) => {
            await loginPage.login(
                validUser.email,
                validUser.password
            );
            await loginPage.verifyValidLogin();
        });

        test(`TC-LOGIN-FUNC-${nextTcId()} - Verify user can logout successfully after login`, async ({ loginPage }) => {
            await loginPage.logout();
            await loginPage.verifyLoginSignupPageLoaded();
        });

        test(`TC-LOGIN-FUNC-${nextTcId()} - Verify login form submits successfully using the Enter key`, async ({ loginPage }) => {
            await loginPage.logout();

            await loginPage.login(
                validUser.email,
                validUser.password,
                SUBMIT_METHOD.ENTER
            );
            await loginPage.verifyValidLogin();
        });

        test(`TC-LOGIN-FUNC-${nextTcId()} - Verify behavior when accessing the login page while already logged in`, async ({ loginPage, page }) => {
            await page.goto('/login');
            await loginPage.verifyValidLogin();
        });

        test(`TC-LOGIN-FUNC-${nextTcId()} - Verify user session persists after page reload`, async ({ loginPage }) => {
            await loginPage.pageReload();
            await loginPage.verifyValidLogin();
        });
    });
});
    // TC-LOGIN-FUNC-004 - Verify user session persists across internal page navigation
