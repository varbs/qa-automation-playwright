const { test } = require("../../../fixtures/fixture");

test.describe('Signup Functionality', () => {
    test('TC-SIGNUP-FUNC-001 - Verify user can proceed to account information after entering a valid name and email', async ({ signupPage, signupUser }) => {
        await signupPage.signup(
            signupUser.name,
            signupUser.email
        );
        await signupPage.verifySignupPage();
    });
});