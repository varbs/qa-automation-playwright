const { test, expect } = require("../../../../../fixtures/fixture");

const { signupCountries } = require('../../../../../test-data/auth/signup/signupCountries');

const { generateSignupUser } = require('../../../../../utils/generateUser');
const { createTcCounter } = require('../../../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Account Information UI', () => {
    let user;

    test.beforeEach(async ({ signupPage, accountInfoPage }) => {
        user = generateSignupUser();

        await signupPage.signup(user.name, user.email);
        await accountInfoPage.verifyAccountInfoPageLoaded();
    });

    // --- Page Level ---
    test(`TC-ACC-UI-${nextTcId()} - Verify if the Page heading is displayed correctly`, async ({ accountInfoPage }) => {
        await expect(accountInfoPage.accountInfoHeading).toBeVisible();
    });

    test(`TC-ACC-UI-${nextTcId()} - Verify if the Create Account button is visible`, async ({ accountInfoPage }) => {
        await expect(accountInfoPage.createAccountButton).toBeVisible();
    });

    // --- Title ---
    test(`TC-ACC-UI-${nextTcId()} - Verify if the Title radio buttons are visible`, async ({ accountInfoPage }) => {
        await expect(accountInfoPage.mrTitle).toBeVisible();
        await expect(accountInfoPage.mrsTitle).toBeVisible();
    });

    test.describe(`Name field`, () => {
        test(`TC-ACC-UI-${nextTcId()} - Verify if the Name is pre-filled with value from signup page`, async ({ accountInfoPage }) => {
            await expect(accountInfoPage.name).toHaveValue(user.name);
        });

        test(`TC-ACC-UI-${nextTcId()} - Verify if the Name field is editable`, async ({ accountInfoPage }) => {
            await expect(accountInfoPage.name).toBeEditable();
        });
    });

    test.describe(`Email field`, () => {
        test(`TC-ACC-UI-${nextTcId()} - Verify if the Email is pre-filled and disabled with value from signup page`, async ({ accountInfoPage }) => {
            await expect(accountInfoPage.email).toHaveValue(user.email);
        });

        test(`TC-ACC-UI-${nextTcId()} - Verify if the Email field is read-only`, async ({ accountInfoPage }) => {
            await expect(accountInfoPage.email).toBeDisabled();
        });
    });

    test(`TC-ACC-UI-${nextTcId()} - Verify password field masks input`,
        async ({ accountInfoPage }) => {
            await expect(accountInfoPage.password).toHaveAttribute('type', 'password');
        });

    test(`TC-ACC-UI-${nextTcId()} - Verify checkboxes are unchecked by default`, async ({ accountInfoPage }) => {
        await expect(accountInfoPage.newsletterCheckbox).not.toBeChecked();
        await expect(accountInfoPage.specialOffersCheckbox).not.toBeChecked();
    });

    test(`TC-ACC-UI-${nextTcId()} - Verify form data is retained after a validation error`,
        async ({ accountInfoPage }) => {
            await accountInfoPage.enterPassword(user.password);
            await accountInfoPage.enterFirstName(user.firstName);
            await accountInfoPage.enterLastName(user.lastName);

            await accountInfoPage.createAccount();

            // some browsers may block reading the value of password fields 
            // for security reasons, so we can't assert the password value directly. 
            // Instead, we can check that the field is not empty.
            await expect(accountInfoPage.password).not.toHaveValue('');

            await expect(accountInfoPage.firstName).toHaveValue(user.firstName);
            await expect(accountInfoPage.lastName).toHaveValue(user.lastName);
        });

    test.describe('Country Dropdown', () => {
        for (const [name, value] of Object.entries(signupCountries)) {
            test(`TC-ACC-UI-${nextTcId()} - Verify ${name} is available in the country dropdown`,
                async ({ accountInfoPage }) => {
                    await accountInfoPage.selectCountry(value);
                    await accountInfoPage.verifySelectedCountry(value);
                });
        }
    });
})
