const { test, expect } = require('../../../../fixtures/fixture');
const { createTcCounter } = require('../../../../utils/testCaseHelper');

const nextTcId = createTcCounter();

test.describe('Login UI', () => {
    test(`TC-LOGIN-UI-${nextTcId()} - Verify the Login page title is displayed`, async ({ loginPage }) => {
        await expect(loginPage.loginTitle).toBeVisible();
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify the Email Address field is displayed`, async ({ loginPage }) => {
        await expect(loginPage.emailTextbox).toBeVisible();
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify the Password field is displayed`, async ({ loginPage }) => {
        await expect(loginPage.passwordTextbox).toBeVisible();
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify the Login button is displayed`, async ({ loginPage }) => {
        await expect(loginPage.loginButton).toBeVisible();
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify email field placeholder text`, async ({ loginPage }) => {
        await expect(loginPage.emailTextbox).toHaveAttribute(
            'placeholder',
            'Email Address'
        );
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify password field placeholder text`, async ({ loginPage }) => {
        await expect(loginPage.passwordTextbox).toHaveAttribute(
            'placeholder',
            'Password'
        );
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify password characters are masked`, async ({ loginPage }) => {
        await expect(loginPage.passwordTextbox).toHaveAttribute(
            'type',
            'password'
        );
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify Login and Signup sections are displayed`, async ({ loginPage }) => {
        await loginPage.verifyLoginSignupPageLoaded();
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify Login button text`, async ({ loginPage }) => {
        await expect(loginPage.loginButton).toHaveText('Login');
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify page does not display validation messages on initial load`, async ({ loginPage }) => {
        await expect(loginPage.invalidLoginMessage).toBeHidden();
    });

    test(`TC-LOGIN-UI-${nextTcId()} - Verify keyboard focus order`, async ({ loginPage, page }) => {
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