const { users } = require('../../../test-data/users');
const { test, expect } = require('../../../fixtures/fixture');


test('TC-LOGIN-006 - Verify login with empty email and password', async ({ loginPage }) => {
    await loginPage.login("", "");
    await loginPage.verifyEmailFieldIsRequired();
    await loginPage.verifyEmailFieldIsFocused();
});

test('TC-LOGIN-007 - Verify login with empty email', async ({ loginPage }) => {
    await loginPage.login(
        "", users.login.validUser.password);
    await loginPage.verifyEmailFieldIsFocused();
    await loginPage.verifyEmailFieldIsRequired();
});

test('TC-LOGIN-008 - Verify login with empty password', async ({ loginPage }) => {
    await loginPage.login(
        users.login.validUser.email, "");
    await loginPage.verifyPasswordFieldIsFocused();
    await loginPage.verifyPasswordFieldIsRequired();
});

test('TC-LOGIN-009 - Verify login with email containing leading spaces', async ({ loginPage }) => {
    await loginPage.login(
        "  " + users.login.validUser.email,
        users.login.validUser.password);
    await loginPage.verifyValidLogin();
});

test('TC-LOGIN-010 - Verify login with email containing trailing spaces', async ({ loginPage }) => {
    await loginPage.login(
        users.login.validUser.email + "  ",
        users.login.validUser.password);
    await loginPage.verifyValidLogin();
});