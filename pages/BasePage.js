const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    // ==========================
    // SHARED METHODS
    // ==========================

    async navigateDirectlyToLoginPage() {
        await this.page.goto('/login');
        await expect(this.page).toHaveURL('/login');
    }
    
    async pageReload() {
        await this.page.reload();
    }

    async verifyFocused(locator) {
        await expect(locator).toBeFocused();
    }

    // Uses validity.valueMissing instead of validationMessage,
    // since the message text differs per browser
    // (e.g. Chromium "Please fill out this field." vs WebKit "Fill out this field").
    async verifyRequiredField(locator) {
        const isValueMissing = await locator.evaluate(
            element => element.validity.valueMissing
        );
        expect(isValueMissing).toBe(true);
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

    // WebKit (Safari) skips buttons and links on plain Tab by default;
    // Alt+Tab moves focus to every focusable element there, but it also
    // stops on <input type="hidden">, so those are tabbed past.
    async pressTab() {
        const browserName = this.page.context().browser().browserType().name();
        if (browserName !== 'webkit') {
            await this.page.keyboard.press('Tab');
            return;
        }

        do {
            await this.page.keyboard.press('Alt+Tab');
        } while (await this.page.evaluate(() => document.activeElement?.type === 'hidden'));
    }

    async pause() {
        await this.page.pause();
    }

}

module.exports = BasePage;