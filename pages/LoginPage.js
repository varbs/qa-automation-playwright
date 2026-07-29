const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

//represents the login page
class LoginPage extends BasePage{
    constructor(page){

        super(page);  

        this.page = page;

        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });

        this.loginForm = page.locator('form').filter({ hasText: 'Login'});
        this.emailTextbox = this.loginForm.getByPlaceholder('Email Address');
        this.passwordTextbox = this.loginForm.getByPlaceholder('Password');
        this.loginButton = this.loginForm.getByRole( 'button', { name: 'Login' });

        this.errorMessage = page.getByText(
            'Your email or password is incorrect'
        );

        this.validLogin = page.getByText('Logged in as');

    }

     // Navigate to the website
    async goto() {
        await this.page.goto('https://automationexercise.com');
        
    }

    // Open the Login page
    async openLoginPage() {
        await this.signupLoginLink.click();
    }

    //enter email
    async enterEmail (email){
        await this.emailTextbox.fill(email);
    }
    
    //enter password
    async enterPassword (password){
        await this.passwordTextbox.fill(password);
    }

    // Click Login button
    async clickLogin() {
        await this.loginButton.click();
    }

    // Complete login flow
    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    // Verify Invalid login
    async verifyInvalidLogin() {
        await expect(this.errorMessage).toBeVisible();
    }

    // Verify Valid login
    async verifyValidLogin(){
        await expect(this.validLogin).toBeVisible();    
    }

}

module.exports = LoginPage;
