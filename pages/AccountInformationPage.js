const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class AccountInfoPage extends BasePage {
    constructor(page) {
        super(page);

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
        if (title === "Mr.") {
            await this.mrTitle.check();
        } else if (title === "Mrs.") {
            await this.mrsTitle.check();
        } else {
            throw new Error(`Unsupported signup title: ${title}`);
        }
    }

    async enterPassword(password) {
        await this.password.fill(password);
    }

    async enterBirthDate(day, month, year) {
        await this.day.selectOption(day);
        await this.month.selectOption(month);
        await this.year.selectOption(year);
    }

    async setNewsletterSubscription(subscribe) {
        if (subscribe) {
            await this.newsletterCheckbox.check();
        } else {
            await this.newsletterCheckbox.uncheck();
        }
    }

    async setSpecialOffersSubscription(subscribe) {
        if (subscribe) {
            await this.specialOffersCheckbox.check();
        } else {
            await this.specialOffersCheckbox.uncheck();
        }
    }

    //---- Address Information section -----//
    async enterFirstName(firstName) {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName) {
        await this.lastName.fill(lastName);
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

    async verifyName(name) {
        await expect(this.name).toHaveValue(name);
    }

    async verifyEmail(email) {
        await expect(this.email).toHaveValue(email);
    }

    async verifySelectedCountry(expectedCountry) {
        await expect(this.country).toHaveValue(expectedCountry);
    }

    async verifyAccountCompletion() {
        await expect(this.accountCreatedMessage).toBeVisible();
    }
}

module.exports = AccountInfoPage;
