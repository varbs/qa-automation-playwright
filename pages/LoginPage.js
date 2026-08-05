const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

// =====================================
// LoginPage Page Object
// =====================================
//
// Represents the Login page of the application - contains locators and methods to the Login Page
// This class extends BasePage, so it automatically inherits common functionality such as:
// - openSignupLoginPage()

class LoginPage extends BasePage {
    constructor(page) {

        // Call the BasePage constructor first.
        // This initializes the Playwright page object and all shared locators/methods from BasePage.
        super(page);

        // Store the Playwright page object so this class can interact with the current browser tab.
        // this.page = page; <- The BasePage constructor already has this, no need to code it again

        // ==========================
        // LOCATORS
        // ==========================

        // URL
        this.loginPageUrl = '/login';
        this.homePageUrl = '/';

        // Page
        this.loginTitle = this.page.getByRole('heading', {
            name: 'Login to your account'
        });

        // Login form 
        this.loginForm = this.page.locator('form').filter({
            hasText: 'Login'
        });

        // Form fields
        this.emailTextbox = this.loginForm.getByRole('textbox', { name: 'Email Address' });
        this.passwordTextbox = this.loginForm.getByPlaceholder('Password');

        // Form actions
        this.loginButton = this.loginForm.getByRole('button', { name: 'Login' });

        // Validation messages
        this.errorMessage = this.loginForm.getByText(
            'Your email or password is incorrect'
        );

        // User state
        this.validLogin = this.page.getByText('Logged in as');
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

    // Complete the login process.
    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async loginUsingEnter(email, password){
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.page.keyboard.press('Enter');
    }

    async logout() {
        await this.logoutButton.click();
    }

    // ==========================
    // VERIFICATION METHODS
    // ==========================

    async verifyLoginPageLoaded() {
        await expect(this.page).toHaveURL(this.loginPageUrl);
        await expect(this.loginTitle).toBeVisible();
        await expect(this.loginForm).toBeVisible();
    }

    // Verify successful login
    async verifyValidLogin() {
        await expect(this.page).toHaveURL('/');
        await expect(this.validLogin).toBeVisible();

    }

    // Verify invalid login
    async verifyInvalidLogin() {
        await expect(this.errorMessage).toBeVisible();
    }


    async verifyEmailFieldIsFocused() {
        await expect(this.emailTextbox).toBeFocused();
    }

    async verifyPasswordFieldIsFocused() {
        await expect(this.passwordTextbox).toBeFocused();
    }

    async verifyEmailFieldIsRequired() {
        const message = await this.emailTextbox.evaluate(
            element => element.validationMessage
        )
        console.log('Validation message:', message);
        expect(message).toContain('Please fill');
    }

    async verifyPasswordFieldIsRequired() {
        const message = await this.passwordTextbox.evaluate(
            element => element.validationMessage
        )
        console.log('Validation message:', message);
        expect(message).toContain('Please fill');
    }

    // Verify that the browser detects an invalid email format
    // using the built-in HTML5 email validation.
    async verifyBrowserEmailValidation() {
        const isTypeMismatch = await this.emailTextbox.evaluate(
            element => element.validity.typeMismatch
        );
        expect(isTypeMismatch).toBe(true);
    }


}

module.exports = LoginPage;
