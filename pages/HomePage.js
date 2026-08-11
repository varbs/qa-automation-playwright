const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class HomePage extends BasePage {
    constructor(page) {
        super(page);

        // Logged-in as user
        this.loggedInUserLabel = this.page.getByText('Logged in as');

        // Account deletion
        this.deleteAccountButton = this.page.getByRole('link', { name: 'Delete Account' });

        // Account deleted
        this.deletedMessage = this.page.getByText('Account Deleted!')
        this.deletedUrl = '/delete_account';

        // Continue
        this.continueButton = this.page.getByRole('link', { name: 'Continue' });
    }
    
    //--- Account actions ----//

    async continueToHomePage(){
        await this.continueButton.click();
    }
    
    async deleteAccount(){
        await this.deleteAccountButton.click();
    }

    //--- Assertions ---//
    async verifyUserisLoggedIn(){
        await expect(this.loggedInUserLabel).toBeVisible();
    }

    async verifyAccountDeleted(){
        await expect(this.page).toHaveURL(this.deletedUrl);
        await expect(this.deletedMessage).toBeVisible();
    }

    async verifyUserIsLoggedOut(){
        await expect(this.page).toHaveURL('/');
    }

    //--- Combined worflows ---//
    async deleteAccountAndVerifyDeletion(){
        await this.deleteAccount();
        await this.verifyAccountDeleted();
    }

};

module.exports = HomePage;