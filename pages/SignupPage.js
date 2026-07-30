const { expect } = require('@playwright/test');
const BasePage = require('./BasePage')


class SignupPage extends BasePage{
    constructor(page){

        super(page);   // ✅ must be first
                
        this.signupForm = page.locator('.signup-form');

        this.name = this.signupForm.getByPlaceholder('Name');
        this.email = this.signupForm.getByPlaceholder('Email Address');
        this.signupButton = this.signupForm.getByRole('button', { name: 'Signup' });

        this.errorMessage = this.signupForm.getByText('Email Address already exist!');

        this.accountInfoHeading = page.getByRole('heading', { name: 'Enter Account Information'});


    }

    async enterName(name){
        await this.name.fill(name);
    }

    async enterEmail(email){
        await this.email.fill(email);
    }

    async signupClick(){
        await this.signupButton.click();
    }

    async signup(name, email){
        await this.enterName(name);
        await this.enterEmail(email);
        await this.signupClick();

    }

    async verifyExistingEmail(){
        await expect(this.errorMessage).toBeVisible();
    }

    async verifySignupPage(){
        await expect(this.accountInfoHeading).toBeVisible();
    }
}
module.exports = SignupPage;