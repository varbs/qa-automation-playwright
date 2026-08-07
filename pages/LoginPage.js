const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
const SUBMIT_METHOD = require('../constant/submitMethods');

// =====================================
// LoginPage Page Object
// =====================================
//
// Represents the Login page of the application - contains locators and methods to the Login Page
// This class extends BasePage, so it automatically inherits common functionality such as:
// - navigateToLoginPage()

class LoginPage extends BasePage {
    constructor(page) {

        super(page);

        // ==========================
        // LOCATORS
        // ==========================

        this.loginPageUrl = '/login';
        this.homePageUrl = '/';


        this.loginTitle = this.page.getByRole('heading', {
            name: 'Login to your account'
        });


        this.loginForm = this.page.locator('form').filter({
            hasText: 'Login'
        });
        this.signupForm = this.page.locator('.signup-form');

        // Use tolerant selectors for email/password fields to reduce brittleness across environments
        this.emailTextbox = this.loginForm.locator('input[type="email"], input[name="email"], input[placeholder="Email Address"]');
        this.passwordTextbox = this.loginForm.getByPlaceholder('Password');

        this.loginButton = this.loginForm.getByRole('button', { name: 'Login' });

        // Make the invalid message search tolerant (case-insensitive regex) and not strictly scoped to the form
        this.invalidLoginMessage = this.page.getByText(/email or password is incorrect/i);

        this.loggedInUserLabel = this.page.getByText('Logged in as');
        // Remove accidental trailing space and use a tolerant regex match for the logout link
        this.logoutButton = this.page.getByRole('link', { name: /Logout/i });
    }

    // ==========================
    // ACTION METHODS
    // ==========================

    async enterEmail(email) {
        await this.emailTextbox.fill(email);
    }

    async enterPassword(password) {
        await this.passwordTextbox.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(email, password, submitBy = SUBMIT_METHOD.BUTTON) {
        await this.enterEmail(email);
        await this.enterPassword(password);

        switch (submitBy) {
            case SUBMIT_METHOD.BUTTON: {
                await this.clickLogin();
                // Wait for navigation/network to settle so subsequent assertions don't race
                await this.page.waitForLoadState('networkidle');
                break;
            }
            case SUBMIT_METHOD.ENTER: {
                await this.page.keyboard.press('Enter');
                break;
            }
            default: {
                throw new Error(`Unsupported submit method: ${submitBy}`);
            }
        }
    }

    async logout() {
        await this.logoutButton.click();
    }

    // ==========================
    // VERIFICATION METHODS
    // ==========================

    async verifyLoginSignupPageLoaded() {
        // Use a tolerant URL assertion for the login page
        await expect(this.page).toHaveURL(/\/login\/?$/);
        await expect(this.loginTitle).toBeVisible();
        await expect(this.loginForm).toBeVisible();
        await expect(this.signupForm).toBeVisible();
    }

    async verifyValidLogin() {
        // Allow the page to settle and use a tolerant host/path match for CI environments
        await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
        await expect(this.loggedInUserLabel).toBeVisible();

    }

    async verifyInvalidLogin() {
        // Give the app a little extra time to render an error message in slower CI
        await expect(this.invalidLoginMessage).toBeVisible({ timeout: 7000 });
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

    async verifyLoginForm() {
        await expect(this.loginForm).toBeVisible();
        await expect(this.loginTitle).toBeVisible();
        await expect(this.emailTextbox).toBeVisible();
        await expect(this.passwordTextbox).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}

module.exports = LoginPage;
