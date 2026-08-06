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

        this.emailTextbox = this.loginForm.getByRole('textbox', { name: 'Email Address' });
        this.passwordTextbox = this.loginForm.getByPlaceholder('Password');

        this.loginButton = this.loginForm.getByRole('button', { name: 'Login' });

        this.invalidLoginMessage = this.loginForm.getByText(
            'Your email or password is incorrect'
        );

        this.loggedInUserLabel = this.page.getByText('Logged in as');
        this.logoutButton = this.page.getByRole('link', { name: 'Logout ' });

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
        await expect(this.page).toHaveURL(this.loginPageUrl);
        await expect(this.loginTitle).toBeVisible();
        await expect(this.loginForm).toBeVisible();
        await expect(this.signupForm).toBeVisible();
    }

    async verifyValidLogin() {
        await expect(this.page).toHaveURL(this.homePageUrl);
        await expect(this.loggedInUserLabel).toBeVisible();

    }

    async verifyInvalidLogin() {
        await expect(this.invalidLoginMessage).toBeVisible();
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
