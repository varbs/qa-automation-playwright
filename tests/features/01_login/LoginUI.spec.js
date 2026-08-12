const { test, expect } = require('../../../fixtures/fixture');

test.describe('Login UI', () => {
    test('TC-LOGIN-UI-001 - Verify the Login page title is displayed', async ({ loginPage }) => {
        await expect(loginPage.loginTitle).toBeVisible();
    });

    test('TC-LOGIN-UI-002 - Verify the Email Address field is displayed', async ({ loginPage }) => {
        await expect(loginPage.emailTextbox).toBeVisible();
    });

    test('TC-LOGIN-UI-003 - Verify the Password field is displayed', async ({ loginPage }) => {
        await expect(loginPage.passwordTextbox).toBeVisible();
    });

    test('TC-LOGIN-UI-004 - Verify the Login button is displayed', async ({ loginPage }) => {
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('TC-LOGIN-UI-005 - Verify email field placeholder text', async ({ loginPage }) => {
        await expect(loginPage.emailTextbox).toHaveAttribute(
            'placeholder',
            'Email Address'
        );
    });

    test('TC-LOGIN-UI-006 - Verify password field placeholder text', async ({ loginPage }) => {
        await expect(loginPage.passwordTextbox).toHaveAttribute(
            'placeholder',
            'Password'
        );
    });

    test('TC-LOGIN-UI-007 - Verify password characters are masked', async ({ loginPage }) => {
        await expect(loginPage.passwordTextbox).toHaveAttribute(
            'type',
            'password'
        );
    });

    test('TC-LOGIN-UI-008 - Verify Login and Signup sections are displayed', async ({ loginPage }) => {
        await loginPage.verifyLoginSignupPageLoaded();
    });

    test('TC-LOGIN-UI-009 - Verify Login button text', async ({ loginPage }) => {
        await expect(loginPage.loginButton).toHaveText('Login');
    });

    test('TC-LOGIN-UI-010 - Verify page does not display validation messages on initial load', async ({ loginPage }) => {
        await expect(loginPage.invalidLoginMessage).toBeHidden();
    });

    test('TC-LOGIN-UI-011 - Verify keyboard focus order', async ({ loginPage, page }) => {
        await loginPage.verifyLoginSignupPageLoaded();

        // Start at the email field
        await loginPage.emailTextbox.focus();
        await expect(loginPage.emailTextbox).toBeFocused();

        // Move to password
        await page.keyboard.press('Tab');
        await expect(loginPage.passwordTextbox).toBeFocused();

        // Move to login Button
        await page.keyboard.press('Tab');
        await expect(loginPage.loginButton).toBeFocused();
    });

});