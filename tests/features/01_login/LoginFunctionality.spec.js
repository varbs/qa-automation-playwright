const { test } = require('../../../fixtures/fixture');

const SUBMIT_METHOD = require('../../../constant/submitMethods');

const { loginUsers } = require('../../../test-data/login/loginUsers');
const { validUser } = loginUsers;

test.describe('Login Functionality', () => {
    test('TC-LOGIN-FUNC-001 - Verify user can login successfully with valid registered credentials', async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            validUser.password
        );
        await loginPage.verifyValidLogin();
    });

    test('TC-LOGIN-FUNC-002 - Verify user can logout successfully after login', async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            validUser.password
        );
        await loginPage.verifyValidLogin();
        await loginPage.logout();
        await loginPage.verifyLoginSignupPageLoaded();
    });

    test('TC-LOGIN-FUNC-003 - Verify login form submits successfully using the Enter key', async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            validUser.password,
            SUBMIT_METHOD.ENTER
        );
        await loginPage.verifyValidLogin();
    });


    test('TC-LOGIN-FUNC-004 - Verify behavior when accessing the login page while already logged in', async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            validUser.password
        );
        await loginPage.verifyValidLogin();
        await loginPage.loginPageUrl;
        await loginPage.verifyValidLogin();
    });

    test('TC-LOGIN-FUNC-005 - Verify user session persists after page reload', async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            validUser.password
        );
        await loginPage.verifyValidLogin();
        await loginPage.pageReload();
        await loginPage.verifyValidLogin();
    });
    // TC-LOGIN-FUNC-004 - Verify user session persists across internal page navigation
});




