// users contains predefined login credentials
const { users } = require('../../../test-data/users');

// Import the custom fixture instead of Playwright's default test.
const { test, expect } = require('../../../fixtures/fixture');


test('TC-LOGIN-001 - Verify login succeeds with valid credentials', async ({ loginPage }) => {
    // Perform login using a valid test account.
    await loginPage.login(
        users.login.validUser.email,
        users.login.validUser.password
    );

    // Verify the user is successfully logged in.
    await loginPage.verifyValidLogin();
    await loginPage.pause();
});


test('TC-LOGIN-002 - Verify login fails with an unregistered email', async ({ loginPage }) => {
    await loginPage.login(
        users.login.invalidEmail.email,
        users.login.validUser.password
    )
    await loginPage.verifyInvalidLogin();
});

test('TC-LOGIN-003 - Verify login fails with an incorrect password', async ({ loginPage }) => {
    await loginPage.login(
        users.login.validUser.email,
        users.login.invalidPassword.password
    )
    await loginPage.verifyInvalidLogin();
});

test('TC-LOGIN-004 - Verify login fails with invalid credentials', async ({ loginPage }) => {

    // loginPage comes from the custom fixture.
    //
    // Before this test starts, the fixture has already:
    // 1. Opened the browser.
    // 2. Created a Playwright page.
    // 3. Created:
    //
    //    const loginPage = new LoginPage(page);
    //
    // 4. Passed the LoginPage object into this test.
    //
    // Because of this, we don't need to create
    // LoginPage manually.
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
    await loginPage.verifyHomePageUrl();
});


