const { users, generateEmail } = require('../test-data/users');
const { test, expect } = require('../fixtures/fixture');


test('TC001 - Invalid sign-up', async ({ signupPageFixture }) => {
    await signupPageFixture.goto();

    await signupPageFixture.openSignupLoginPage();

    await signupPageFixture.signup(
        users.signUp.validUser.name,
        users.signUp.existingUser.existingEmail
    );
    await signupPageFixture.verifyExistingEmail();
});

test.only('TC002 - Valid sign-up', async ({ signupPageFixture }) => {
    await signupPageFixture.goto();

    await signupPageFixture.openSignupLoginPage();
    
    await signupPageFixture.signup(
        users.signUp.validUser.name,
        generateEmail()
    );
    await signupPageFixture.verifySignupPage();
});