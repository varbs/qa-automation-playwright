const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;

        // ==========================
        // SHARED LOCATORS
        // ==========================

        this.signupLoginLink = this.page.getByRole('link', {
            name: 'Signup / Login'
        });
    }

    // ==========================
    // SHARED METHODS
    // ==========================

    async navigateToLoginPage() {
        await this.page.goto('/login');
        await expect(this.page).toHaveURL('/login');
    }

    async pageReload(){
        await this.page.reload();
    }

    async verifyFocused(locator) {
        await expect(locator).toBeFocused();
    }

    async verifyRequiredField(locator) {
        const message = await locator.evaluate(
            element => element.validationMessage
        );
        expect(message).toContain('Please fill');
    }

    async verifyRequiredValidation(locator) {
        await this.verifyFocused(locator);
        await this.verifyRequiredField(locator);
    }

    // Verify that the browser detects an invalid email format
    // using the built-in HTML5 email validation.
    async verifyBrowserEmailValidation(locator) {
        const isTypeMismatch = await locator.evaluate(
            element => element.validity.typeMismatch
        );
        expect(isTypeMismatch).toBe(true);
    }

    async pause() {
        await this.page.pause();
    }

}

module.exports = BasePage;