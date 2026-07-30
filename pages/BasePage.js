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

    // Opens the application's homepage.
    //
    // Any page object that extends BasePage can simply call:
    //
    // await this.goto();
    //
    // instead of writing page.goto(...) repeatedly.
    async goto() {
        await this.page.goto('https://automationexercise.com');
    }

    // Navigates from the homepage to the Login/Signup page.
    //
    // Since this navigation is used by multiple tests and page
    // objects, placing it in BasePage avoids duplicate code.
    async openSignupLoginPage() {
        await this.signupLoginLink.click();

        // Wait until the page finishes loading.
        //
        // networkidle means Playwright waits until
        // there are no active network requests for a short time.
        //
        // This helps make sure the next test step
        // runs only after the page has finished loading.
        await this.page.waitForLoadState('networkidle');

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