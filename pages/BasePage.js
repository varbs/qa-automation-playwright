// BasePage is the parent class for all page objects.
//
// Instead of repeating common code (like opening the website or
// clicking the Signup/Login link) in every page class, we place
// those shared methods here.
//
// Other page classes (LoginPage, SignupPage, ProductsPage, etc.)
// inherit these features by extending BasePage.
class BasePage {

    // The constructor runs automatically whenever a page object
    // is created.
    //
    // Example:
    // const loginPage = new LoginPage(page);
    //
    // Since LoginPage extends BasePage, the BasePage constructor
    // also runs and receives the same Playwright page object.
    constructor(page) {

        // Store Playwright's page object.
        //
        // "page" represents the current browser tab.
        // Saving it as this.page allows every method in this class
        // (and every child class) to interact with the browser.
        this.page = page;

        // ==========================
        // SHARED LOCATORS
        // ==========================

        // Locator for the "Signup / Login" navigation link.
        //
        // Since several page objects may need to navigate to the
        // Login/Signup page, we define this locator only once.
        //
        // Child classes automatically inherit this locator.
        this.signupLoginLink = page.getByRole('link', {
            name: 'Signup / Login'
        });
    }

    // ==========================
    // SHARED METHODS
    // ==========================

    // Navigate to the website's home page.
    async openSignupLoginPage() {
        await this.page.goto('/'); 
        await this.signupLoginLink.click();

    }

    async pause() {
        await this.page.pause();
    }

}

// Export the BasePage class.
//
// This allows other files to inherit its shared methods and
// locators.
//
// Example:
//
// const BasePage = require('./BasePage');
//
// class LoginPage extends BasePage {
//     constructor(page) {
//         super(page);
//     }
// }
module.exports = BasePage;