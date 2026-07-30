const { users, generateEmail } = require('../test-data/users');
const { test, expect } = require('../fixtures/fixture');


test('TC001 - Invalid sign-up', async ({ signupPage }) => {
    await signupPage.goto();

    await signupPage.openSignupLoginPage();

    await signupPage.signup(
        users.signUp.validUser.name,
        users.signUp.existingUser.existingEmail
    );
    await signupPage.verifyExistingEmail();
});

test.only('TC002 - Valid sign-up', async ({ signupPage }) => {
    await signupPage.goto();

    await signupPage.openSignupLoginPage();
    
    await signupPage.signup(
        users.signUp.validUser.name,
        generateEmail()
    );
    await signupPage.verifySignupPage();
});