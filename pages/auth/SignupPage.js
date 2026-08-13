const { expect } = require("@playwright/test");
const BasePage = require("../BasePage");
const SUBMIT_METHOD = require('../../constant/submitMethods');


class SignupPage extends BasePage {
  constructor(page) {
    
    super(page);

    this.signupForm = this.page.locator(".signup-form");
    this.signupHeading = this.signupForm.getByRole('heading', { name: 'New User Signup!' });

    this.nameTextbox = this.signupForm.getByPlaceholder("Name");
    this.emailTextbox = this.signupForm.getByPlaceholder("Email Address");
    this.signupButton = this.signupForm.getByRole("button", { name: "Signup" });

    this.errorMessage = this.signupForm.getByText(
      "Email Address already exist!",
    );
  }

  async enterName(name) {
    await this.nameTextbox.fill(name);
  }

  async enterEmail(email) {
    await this.emailTextbox.fill(email);
  }

  async signupClick() {
    await this.signupButton.click();
  }

  async signup(name, email, submitBy = SUBMIT_METHOD.BUTTON) {
    await this.enterName(name);
    await this.enterEmail(email);

     switch (submitBy) {
            case SUBMIT_METHOD.BUTTON: {
                await this.signupClick();
                break;
            }
            case SUBMIT_METHOD.ENTER: {
                await this.page.keyboard.press('Enter');
                break;
            }
            default: {
                throw new Error(`Unsupported submit method: ${submitBy}`);
            }
        };
  }

  async verifyExistingEmail() {
    await expect(this.errorMessage).toBeVisible();
  }

  async verifySignupPageLoaded(){
    await expect(this.page).toHaveURL('/login');
    await expect(this.signupForm).toBeVisible();
  }
};

module.exports = SignupPage;
