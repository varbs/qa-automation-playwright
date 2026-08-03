const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

// =====================================
// LoginPage Page Object
// =====================================
//
// Represents the Login page of the application.
//
// This class extends BasePage, so it automatically
// inherits common functionality such as:
//
// - goto()
// - openSignupLoginPage()
//
// It only contains locators and methods that are
// specific to the Login page.
class LoginPage extends BasePage {
    constructor(page) {

        // Call the BasePage constructor first.
        // This initializes the Playwright page object
        // and all shared locators/methods from BasePage.
        super(page);

        // Store the Playwright page object so this class
        // can interact with the current browser tab.
        // this.page = page; <- The BasePage constructor already has this, no need to code it again

        // ==========================
        // LOCATORS
        // ==========================

        // Locate the Login form.
        // The page contains both Login and Signup forms,
        // so filter() ensures we only interact with
        // the Login section.
        this.loginForm = this.page.locator('form').filter({ hasText: 'Login' });

        this.loginTitle = this.page.getByRole('heading', { name: 'Login to your account' });


        // Email textbook inside the login form
        this.emailTextbox = this.loginForm.getByPlaceholder('Email Address');

        // Password textbox inside the login form
        this.passwordTextbox = this.loginForm.getByPlaceholder('Password');

        // Login button inside the login form
        this.loginButton = this.loginForm.getByRole('button', { name: 'Login' });

        // Error message displayed after an invalid login
        this.errorMessage = this.loginForm.getByText(
            'Your email or password is incorrect'
        );

        // Text shown after a successful login
        this.validLogin = this.page.getByText('Logged in as');

        // Log out button
        this.logoutButton = this.page.getByRole('link', { name: 'Logout ' });

        // login page url
        this.loginPageUrl = 'https://automationexercise.com/login';

    }


    // ==========================
    // ACTION METHODS
    // ==========================

    // Enter user's email
    async enterEmail(email) {
        await this.emailTextbox.fill(email);
    }

    // Enter user's password
    async enterPassword(password) {
        await this.passwordTextbox.fill(password);
    }

    // Click  theLogin button
    async clickLogin() {
        await this.loginButton.click();
    }

    // Complete the login process.
    //
    // Assumes the browser is already on the
    // Login page.
    //
    // Usually the fixture or test is responsible for:
    // await loginPage.goto();
    // await loginPage.openSignupLoginPage();
    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    // Click the logout button to log out the user.
    async clickLogout() {
        await this.logoutButton.click();
    }

    // ==========================
    // ASSERTIONS
    // ==========================

    // Verify that the Login page has loaded by checking for the presence of the login title.
    async verifyLoginPageLoaded(){
        await expect(this.loginTitle).toBeVisible();
    }

    // Verify that an invalid login error message appears.
    async verifyInvalidLogin() {
        await expect(this.errorMessage).toBeVisible();
    }

    // Verify that the user has successfully logged in.
    async verifyValidLogin() {
        await expect(this.validLogin).toBeVisible();
    }

    // Verify that the email field is required
    async verifyEmailFieldIsRequired() {
        const message = await this.emailTextbox.evaluate(
            element => element.validationMessage
        )
        console.log('Validation message:', message);
        expect(message).toContain('Please fill');
    }
    
    // Verify that the email field is focused after clicking login button and the field is empty
    async verifyEmailFieldIsFocused() {
        await expect(this.emailTextbox).toBeFocused();
    }

    // Verify that the password field is focused after clicking 
    // the login btn with password field empty
    async verifyPasswordFieldIsFocused() {
        await expect(this.passwordTextbox).toBeFocused();
    }
    // Verify that the password field is required
    async verifyPasswordFieldIsRequired() {
        const message = await this.passwordTextbox.evaluate(
            element => element.validationMessage
        )
        console.log('Validation message:', message);
        expect(message).toContain('Please fill');
    }

    // Verify that the password field is focused after clicking 
    // the login btn with password field empty
    async verifyPasswordFieldIsFocused() {
        await expect(this.passwordTextbox).toBeFocused();
    }

    // Verify that the user is redirected to the home page after logging out.
    async verifyLoginPageLoaded() {
        await expect(this.page).toHaveURL(this.loginPageUrl);
        await expect(this.loginForm).toBeVisible();
    }
}

// Export the LoginPage class so it can be
// imported into fixtures or test files.
module.exports = LoginPage;
