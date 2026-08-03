const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class AccountInfo extends BasePage {
    constructor(page) {
        super(page);

        // User Info
        this.mrtitle = this.page.getByRole("radio", { name: "Mr." });
        this.mstitle = this.page.getByRole("radio", { name: "Mrs." });
        this.name = this.page.locator("#name");
        this.email = this.page.getByLabel("Email");
        this.password = this.page.getByLabel("Password");

        this.day = this.page.locator("#days");
        this.month = this.page.locator("#months");
        this.year = this.page.locator("#years");

        this.newsletterCheckbox = this.page.getByRole("checkbox", {
            name: "Sign up for our newsletter!",
        });
        this.specialoffersCheckbox = this.page.getByRole("checkbox", {
            name: "Receive special offers from our partners!",
        });

        // Address info
        this.firstName = this.page.getByLabel("First name *");
        this.lastName = this.page.getByLabel("Last name *");

        this.company = this.page.getByRole('textbox', { name: 'Company', exact: true });
        this.address = this.page.getByLabel("Address *");
        this.address2 = this.page.getByLabel("Address 2");
        this.country = this.page.getByLabel("Country *");
        this.state = this.page.getByLabel("State *");
        // this.city = this.page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.city = this.page.locator("#city");
        this.zipCode = this.page.locator("#zipcode");
        this.mobileNum = this.page.getByLabel("Mobile Number *");

        this.createAccountBbtn = this.page.getByRole("button", {
            name: "Create Account",
        });

        // account completion
        this.successMessage = this.page.getByText('Account Created!')
    }

    //----- User's Info section -----
    // Select the user's title (Mr. or Mrs.)
    async selectTitle(title) {
        if (title === "Mr.") {
            await this.mrtitle.check();
        } else if (title === "Mrs.") {
            await this.mstitle.check();
        }
    }

    // Enter the user's password.
    async enterPassword(password) {
        await this.password.fill(password);
    }

    // Select the user's birthdate
    async enterBirthDate(day, month, year) {
        await this.day.selectOption(day),
            await this.month.selectOption(month),
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
            await this.specialoffersCheckbox.check();
        } else {
            await this.specialoffersCheckbox.uncheck();
        }
    }


    //---- Address Info section -----
    // Enter the user's firstname
    async enterFirstname(fname) {
        await this.firstName.fill(fname);
    }
    // Enter the user's lastname
    async enterLastname(lname) {
        await this.lastName.fill(lname);
    }
    // Enter the user's company
    async enterCompany(company) {
        await this.company.fill(company);
    }
    // Fill the user's address
    async fillAddress(address, address2) {
        await this.address.fill(address),
            await this.address2.fill(address2);
    }
    // Verify the country's dropdown has options
    async verifyCountryOptions() {
        // Get the text of all options in the Country dropdown
        const options = await this.country.locator('option').allTextContents();

        // Print the total number of country for debugging
        console.log(`Total countries: ${options.length}`);

        // Print all country names for debugging
        console.log('Countries:', options);

        // Verify the dropdown contains options
        expect(options.length).toBeGreaterThan(1);

        // Verify the dropdown contains specific countries
        expect(options).toContain('India');
        expect(options).toContain('Canada');
        expect(options).toContain('Singapore');
    }
    // Select the user's country
    async selectCountry(country) {
        await this.country.selectOption(country);
    }
    // Verify the user's selected country is correct
    async verifySelectedCountry(country) {
        // Get the currently selected value
        const selectedCountry = await this.country.inputValue();

        // Print the selected country for debuggin
        console.log('Selected country: ', selectedCountry);

        // Verify the selected country matches the expected value
        expect(selectedCountry).toBe(country);

        //await expect(this.country).toHaveValue(country);
    }
    // Enter the user's state
    async enterState(state) {
        await this.state.fill(state);
    }
    // Enter the user's city
    async enterCity(city) {
        await this.city.fill(city);
    }
    // Enter the user's zipcode
    async enterZipcode(zipcode) {
        await this.zipCode.fill(zipcode);
    }
    // Enter the user's mobile number
    async enterMobile(number) {
        await this.mobileNum.fill(number);
    }

    // Create the account
    async createClick() {
        await this.createAccountBbtn.click();
    }

    //assertions
    async verifyName(name) {
        await expect(this.name).toHaveValue(name);
    }
    async verifyEmail(email) {
        await expect(this.email).toHaveValue(email);
    }
    async verifyAccountCompletion() {
        await expect(this.successMessage).toBeVisible();
    }
}

module.exports = AccountInfo;
