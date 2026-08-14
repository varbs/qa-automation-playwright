const { expect } = require("@playwright/test");
const BasePage = require("../BasePage");
const { SIGNUP_TITLE } = require('../../constant/signupTitle');
const { ACCOUNT_OPTIONS } = require('../../constant/accountOptions');

class AccountInfoPage extends BasePage {
    constructor(page) {
        super(page);

        this.accountInfoHeading = page.getByRole("heading", {
            name: "Enter Account Information",
        });

        //--- User Information ---//
        this.mrTitle = this.page.getByRole("radio", { name: "Mr." });
        this.mrsTitle = this.page.getByRole("radio", { name: "Mrs." });
        this.name = this.page.locator("#name");
        this.email = this.page.getByLabel("Email");
        this.password = this.page.getByLabel("Password");

        this.day = this.page.locator("#days");
        this.month = this.page.locator("#months");
        this.year = this.page.locator("#years");

        this.newsletterCheckbox = this.page.getByRole("checkbox", {
            name: "Sign up for our newsletter!",
        });
        this.specialOffersCheckbox = this.page.getByRole("checkbox", {
            name: "Receive special offers from our partners!",
        });

        //--- Address Information ---//
        this.firstName = this.page.getByLabel("First name *");
        this.lastName = this.page.getByLabel("Last name *");

        this.company = this.page.getByRole('textbox', { name: 'Company', exact: true });
        this.address = this.page.getByLabel("Address *");
        this.address2 = this.page.getByLabel("Address 2");
        this.country = this.page.getByLabel("Country *");
        this.state = this.page.getByLabel("State *");
        this.city = this.page.locator("#city");
        this.zipCode = this.page.locator("#zipcode");
        this.mobileNumber = this.page.getByLabel("Mobile Number *");

        //--- Account actions ---//
        this.createAccountButton = this.page.getByRole("button", {
            name: "Create Account",
        });

        //---Account created ---//
        this.accountCreatedMessage = this.page.getByText('Account Created!')
    }

    //----- User's Info section -----
    async selectTitle(title) {
        switch (title) {
            case SIGNUP_TITLE.MR:
                await this.mrTitle.check();
                break;

            case SIGNUP_TITLE.MRS:
                await this.mrsTitle.check();
                break;

            default:
                throw new Error(`Unsupported signup title: ${title}`);
        }
    }

    async enterPassword(password) {
        await this.password.fill(password);
    }

    // Accepts a single birthDate object and destructures it into day, month, and year
    // This matches how birthDate is passed from completeSignup as { day, month, year }
    async enterBirthDate({ day, month, year }) {
        await this.day.selectOption(day);
        await this.month.selectOption(month);
        await this.year.selectOption(year);
    }

    async setNewsletterSubscription(checked) {
        if (checked) {
            await this.newsletterCheckbox.check();
        } else {
            await this.newsletterCheckbox.uncheck();
        }
    }

    async verifyNewsletterSubscription(checked) {
        await expect(this.newsletterCheckbox).toBeChecked({ checked });
    }

    async setSpecialOffersSubscription(checked) {
        if (checked) {
            await this.specialOffersCheckbox.check();
        } else {
            await this.specialOffersCheckbox.uncheck();
        }
    }

    async verifySpecialOffersSubscription(checked) {
        await expect(this.specialOffersCheckbox).toBeChecked({ checked });
    }

    //---- Address Information section -----//
    async enterFirstName(firstName) {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName) {
        await this.lastName.fill(lastName);
    }

    async editName (name){
        await this.name.fill(name);
    }

    async verifyName(name){
        await expect(this.name).toHaveValue(name);
    }

    async verifyNameIsEditable(name){
        await expect(this.name).toBeEditable();
    }

    async enterCompany(company) {
        await this.company.fill(company);
    }

    async fillAddress(address, address2) {
        await this.address.fill(address);
        await this.address2.fill(address2);
    }

    async selectCountry(country) {
        await this.country.selectOption(country);
    }

    async enterState(state) {
        await this.state.fill(state);
    }

    async enterCity(city) {
        await this.city.fill(city);
    }

    async enterZipCode(zipCode) {
        await this.zipCode.fill(zipCode);
    }

    async enterMobile(number) {
        await this.mobileNumber.fill(number);
    }

    async enterAddressDetails(address) {
        await this.enterCompany(address.company);
        await this.fillAddress(address.address1, address.address2);
        await this.selectCountry(address.country);
        await this.enterState(address.state);
        await this.enterCity(address.city);
        await this.enterZipCode(address.zipCode);
        await this.enterMobile(address.mobile);
    }

    //---- Account actions -----//
    async createAccount() {
        await this.createAccountButton.click();
    }

    //---- Assertions -----//

    async verifyAccountInfoPageLoaded() {
        await expect(this.accountInfoHeading).toBeVisible();
    }

    async verifySignupDetails(name, email) {
        await expect(this.name).toHaveValue(name);
        await expect(this.email).toHaveValue(email);
    }

    async verifySelectedTitle(title) {
        switch (title) {
            case SIGNUP_TITLE.MR:
                await expect(this.mrTitle).toBeChecked();
                break;

            case SIGNUP_TITLE.MRS:
                await expect(this.mrsTitle).toBeChecked();
                break

            default:
                throw new Error(`Unsupported signup title: ${title}`);
        }
    }

    async verifySelectedCountry(expectedCountry) {
        await expect(this.country).toHaveValue(expectedCountry);
    }

    async verifyAccountCompletion() {
        await expect(this.accountCreatedMessage).toBeVisible();
    }
}

module.exports = AccountInfoPage;
