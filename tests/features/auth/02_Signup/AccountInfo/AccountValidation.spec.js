const { test } = require('../../../../../fixtures/fixture');

const { generateSignupUser } = require('../../../../../utils/generateUser');
const { createTcCounter } = require('../../../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Account Information Required Validation', () => {

    let user;

    test.beforeEach(async ({ signupPage, accountInfoPage }) => {
        user = generateSignupUser();

        await signupPage.signup(user.name, user.email);
        await accountInfoPage.verifyAccountInfoPageLoaded();
    });

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when Name field is empty `, async ({ accountInfoPage }) => {
        await accountInfoPage.editName('');
        await accountInfoPage.createAccount();

        await accountInfoPage.verifyRequiredValidation(accountInfoPage.name);
    });

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when Password is empty`, async ({ accountInfoPage }) => {
        await accountInfoPage.enterPassword('');
        await accountInfoPage.createAccount();

        await accountInfoPage.verifyRequiredValidation(accountInfoPage.password);
    });

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when First name is empty`, async ({ accountInfoPage }) => {
        await accountInfoPage.enterPassword(user.password);
        await accountInfoPage.enterFirstName('');
        await accountInfoPage.createAccount();

        await accountInfoPage.verifyRequiredValidation(accountInfoPage.firstName);
    });

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when Last name is empty`, async ({ accountInfoPage }) => {
        await accountInfoPage.enterPassword(user.password);
        await accountInfoPage.enterFirstName(user.firstName);
        await accountInfoPage.enterLastName('');
        await accountInfoPage.createAccount();

        await accountInfoPage.verifyRequiredValidation(accountInfoPage.lastName);
    });

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when Address is empty`, async ({ accountInfoPage }) => {
        await accountInfoPage.enterPassword(user.password);
        await accountInfoPage.enterFirstName(user.firstName);
        await accountInfoPage.enterLastName(user.lastName);
        await accountInfoPage.fillAddress('', user.address2);
        await accountInfoPage.createAccount();

        await accountInfoPage.verifyRequiredValidation(accountInfoPage.address);
    });

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when State is empty`, async ({ accountInfoPage }) => {
        await accountInfoPage.enterPassword(user.password);
        await accountInfoPage.enterFirstName(user.firstName);
        await accountInfoPage.enterLastName(user.lastName);
        await accountInfoPage.fillAddress(user.address1, user.address2);
        await accountInfoPage.enterState('');
        await accountInfoPage.createAccount();

        await accountInfoPage.verifyRequiredValidation(accountInfoPage.state);
    });

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when City is empty`, async ({ accountInfoPage }) => {
        await accountInfoPage.enterPassword(user.password);
        await accountInfoPage.enterFirstName(user.firstName);
        await accountInfoPage.enterLastName(user.lastName);
        await accountInfoPage.fillAddress(user.address1, user.address2);
        await accountInfoPage.enterState(user.state);
        await accountInfoPage.enterCity('');
        await accountInfoPage.createAccount();

        await accountInfoPage.verifyRequiredValidation(accountInfoPage.city);
    });

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when Zipcode is empty`, async ({ accountInfoPage }) => {
        await accountInfoPage.enterPassword(user.password);
        await accountInfoPage.enterFirstName(user.firstName);
        await accountInfoPage.enterLastName(user.lastName);
        await accountInfoPage.fillAddress(user.address1, user.address2);
        await accountInfoPage.enterState(user.state);
        await accountInfoPage.enterCity(user.city);
        await accountInfoPage.enterZipCode('');
        await accountInfoPage.createAccount();

        await accountInfoPage.verifyRequiredValidation(accountInfoPage.zipCode);
    });

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when Mobile number is empty`, async ({ accountInfoPage }) => {
        await accountInfoPage.enterPassword(user.password);
        await accountInfoPage.enterFirstName(user.firstName);
        await accountInfoPage.enterLastName(user.lastName);
        await accountInfoPage.fillAddress(user.address1, user.address2);
        await accountInfoPage.enterState(user.state);
        await accountInfoPage.enterCity(user.city);
        await accountInfoPage.enterZipCode(user.zipCode);
        await accountInfoPage.enterMobile('');
        await accountInfoPage.createAccount();

        await accountInfoPage.verifyRequiredValidation(accountInfoPage.mobileNumber);
    });

});
