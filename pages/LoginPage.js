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
class LoginPage extends BasePage{
    constructor(page){

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
        this.loginForm = this.page.locator('form').filter({ hasText: 'Login'});

        // Email textbook inside the login form
        this.emailTextbox = this.loginForm.getByPlaceholder('Email Address');

        // Password textbox inside the login form
        this.passwordTextbox = this.loginForm.getByPlaceholder('Password');

        // Login button inside the login form
        this.loginButton = this.loginForm.getByRole( 'button', { name: 'Login' });

        // Error message displayed after an invalid login
        this.errorMessage = page.getByText(
            'Your email or password is incorrect'
        );

        // Text shown after a successful login
        this.validLogin = page.getByText('Logged in as');

    }


    // ==========================
    // ACTION METHODS
    // ==========================

    // Enter user's email
    async enterEmail (email){
        await this.emailTextbox.fill(email);
    }
    
    // Enter user's password
    async enterPassword (password){
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

    // ==========================
    // ASSERTIONS
    // ==========================

    // Verify that an invalid login error message appears.
    async verifyInvalidLogin() {
        await expect(this.errorMessage).toBeVisible();
    }

    // Verify that the user has successfully logged in.
    async verifyValidLogin(){
        await expect(this.validLogin).toBeVisible();    
    }

}

// Export the LoginPage class so it can be
// imported into fixtures or test files.
module.exports = LoginPage;
