class BasePage {

    constructor(page) {
        this.page = page;

        this.signupLoginLink = page.getByRole('link', {
            name: 'Signup / Login'
        });
    }


    async goto() {
        await this.page.goto('https://automationexercise.com');
    }


    async openSignupLoginPage() {
        await this.signupLoginLink.click();
        await this.page.waitForLoadState('networkidle');

    }

}

module.exports = BasePage;