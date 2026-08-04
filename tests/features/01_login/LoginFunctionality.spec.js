const { loginUsers } = require('../../../test-data/login/loginUsers');
const { test } = require('../../../fixtures/fixture');


test('TC-LOGIN-001 - Verify login succeeds with valid credentials', async ({ loginPage }) => {
    await loginPage.login(
        loginUsers.validUser.email,
        loginUsers.validUser.password
    );
    await loginPage.verifyValidLogin();
});

test('TC-LOGIN-002 - Verify user can logout after successful login', async ({ loginPage }) => {
    await loginPage.login(
        loginUsers.validUser.email,
        loginUsers.validUser.password

    );
    await loginPage.verifyValidLogin();
    await loginPage.logout();
    await loginPage.verifyLoginPageLoaded();
});

// test('TC-LOGIN-003 - Verify login with valid credentials', async ({ loginPage }) => {
// });




