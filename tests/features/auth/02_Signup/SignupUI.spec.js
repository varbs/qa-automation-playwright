const { test, expect } = require('../../../../fixtures/fixture');
const { createTcCounter } = require('../../../../utils/testCaseHelper');

const nextTcId = createTcCounter();

test.describe('Signup UI', () => {
    test(`TC-SIGNUP-UI-${nextTcId()} - Verify the signup page heading is displayed`, async ({ signupPage }) => {
        await expect(signupPage.signupHeading).toBeVisible();
    });

    test(`TC-SIGNUP-UI-${nextTcId()} - Verify Name textbox is displayed`, async ({ signupPage }) => {
        await expect(signupPage.nameTextbox).toBeVisible();
    });

    test(`TC-SIGNUP-UI-${nextTcId()} - Verify Email textbox is displayed`, async ({ signupPage }) => {
        await expect(signupPage.emailTextbox).toBeVisible();
    });

    test(`TC-SIGNUP-UI-${nextTcId()} - Verify Signup button is displayed`, async ({ signupPage }) => {
        await expect(signupPage.signupButton).toBeVisible();
    });

    test(`TC-SIGNUP-UI-${nextTcId()} - Verify Name placeholder`, async ({ signupPage }) => {
        await expect(signupPage.nameTextbox).toHaveAttribute(
            'placeholder',
            'Name'
        );
    });

    test(`TC-SIGNUP-UI-${nextTcId()} - Verify Email placeholder `, async ({ signupPage }) => {
        await expect(signupPage.emailTextbox).toHaveAttribute(
            'placeholder',
            'Email Address'
        );
    });

    test(`TC-SIGNUP-UI-${nextTcId()} - Verify Signup button is correct`, async ({ signupPage }) => {
        await expect(signupPage.signupButton).toHaveText('Signup');
    });

    test(`TC-SIGNUP-UI-${nextTcId()} - Verify page does not display validation messages on initial load`, async ({ signupPage }) => {
        await expect(signupPage.errorMessage).toBeHidden();
    });

    test(`TC-SIGNUP-UI-${nextTcId()} - Verify keyboard focus order`, async ({ signupPage, page }) => {
        await signupPage.verifySignupPageLoaded();

        // Start at the name field
        await signupPage.nameTextbox.focus();
        await expect(signupPage.nameTextbox).toBeFocused();

        // Move to email
        await page.keyboard.press('Tab');
        await expect(signupPage.emailTextbox).toBeFocused();

        // Move to signup Button
        await page.keyboard.press('Tab');
        await expect(signupPage.signupButton).toBeFocused();
    });

    test(`TC-SIGNUP-UI-${nextTcId()} - Verify signup form is displayed`, async ({ signupPage }) => {
    await signupPage.verifySignupPageLoaded();
});
})