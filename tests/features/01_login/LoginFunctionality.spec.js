const { users } = require('../../../test-data/users');
const { test } = require('../../../fixtures/fixture');


test('TC-LOGIN-001 - Verify login succeeds with valid credentials', async ({ loginPage }) => {
    // Perform login using a valid test account.
    await loginPage.login(
        users.login.validUser.email,
        users.login.validUser.password
    );
    // Verify the user is successfully logged in.
    await loginPage.verifyValidLogin();
});


test('TC-LOGIN-002 - Verify login fails with an unregistered email', async ({ loginPage }) => {
    await loginPage.login(
        users.login.invalidEmail.email,
        users.login.validUser.password
    );
    await loginPage.verifyInvalidLogin();
});

test('TC-LOGIN-003 - Verify login fails with an incorrect password', async ({ loginPage }) => {
    await loginPage.login(
        users.login.validUser.email,
        users.login.invalidPassword.password
    );
    await loginPage.verifyInvalidLogin();
});

test('TC-LOGIN-004 - Verify login fails with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(
        users.login.invalidEmail.email,
        users.login.invalidEmail.password
    );
    // Verify the application displays the expected invalid login error.
    await loginPage.verifyInvalidLogin();
});


test('TC-LOGIN-005 - Verify logout functionality', async ({ loginPage }) => {
    await loginPage.login(
        users.login.validUser.email,
        users.login.validUser.password

    );
    await loginPage.verifyValidLogin();
    await loginPage.clickLogout();
    await loginPage.verifyLoginPageLoaded();
});


