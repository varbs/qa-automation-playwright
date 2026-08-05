const { loginUsers } = require('../../../test-data/login/loginUsers');
const { test } = require('../../../fixtures/fixture');


test('TC-LOGIN-FUNC-001 - Verify user can login successfully with valid registered credentials', async ({ loginPage }) => {
    await loginPage.login(
        loginUsers.validUser.email,
        loginUsers.validUser.password
    );
    await loginPage.verifyValidLogin();
});

test('TC-LOGIN-FUNC-002 - Verify user can logout successfully after login', async ({ loginPage }) => {
    await loginPage.login(
        loginUsers.validUser.email,
        loginUsers.validUser.password

    );
    await loginPage.verifyValidLogin();
    await loginPage.logout();
    await loginPage.verifyLoginPageLoaded();
});

test('TC-LOGIN-FUNC-003 - Verify login form submits successfully using the Enter key', async ({ loginPage }) => {
    await loginPage.loginUsingEnter(
        loginUsers.validUser.email,
        loginUsers.validUser.password

    );
    await loginPage.verifyValidLogin();
});


// Verify user session persists after page reload
// TC-LOGIN-FUNC-004 - Verify user session persists across internal page navigation
// TC-LOGIN-FUNC-005 - Verify login form submits successfully using the Enter key





