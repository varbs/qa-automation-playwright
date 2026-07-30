// users contains predefined login credentials
const { users } = require('../test-data/users');

// Import the custom fixture instead of Playwright's default test.
const { test, expect } = require('../fixtures/fixture');


// TC001 - Verify login fails with invalid credentials
test('TC001 - Invalid login', async ({ loginPage }) => {

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

    // Perform the login using invalid credentials
    // from the shared test data.
    await loginPage.login(
        users.login.invalidEmail.email,
        users.login.invalidEmail.password
    );
    

    // Verify the application displays the expected
    // invalid login error.
    await loginPage.verifyInvalidLogin();
    await loginPage.pause();
    
});

// TC002 - Verify login succeeds with valid credentials
test('TC002 - Valid login', async ({loginPage}) => {
    // Perform login using a valid test account.
    //
    // Keeping credentials in a separate test-data file
    // makes tests easier to maintain and reuse.
    await loginPage.login(
        users.login.validUser.email,
        users.login.validUser.password
        
    );

    // Verify the user is successfully logged in.
    await loginPage.verifyValidLogin();
    await loginPage.pause();
});


