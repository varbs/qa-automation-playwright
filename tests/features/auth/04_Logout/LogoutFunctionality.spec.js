const { test, expect } = require('../../../../fixtures/fixture');

const { loginUsers } = require('../../../../test-data/auth/login/loginUsers');
const { validUser } = loginUsers;

const { createTcCounter } = require('../../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Logout Functionality', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            validUser.password
        );
        await loginPage.verifyValidLogin();
    });

    test(`TC-LOGOUT-FUNC-${nextTcId()} - Verify user can logout successfully`, async ({ homePage }) => {
        await homePage.logout();
        await expect(homePage.loggedInUserLabel).not.toBeVisible();
    });

    test(`TC-LOGOUT-FUNC-${nextTcId()} - Verify user is redirected to login page after logout`, async ({ homePage }) => {
        await homePage.logout();
        await homePage.verifyUserIsLoggedOut();
    });
});