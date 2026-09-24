const { test } = require('../../../../../fixtures/fixture');

const { accountRequiredFieldCases } = require('../../../../../test-data/auth/signup/accountRequiredFieldCases');
const { getRequiredFields } = require('../../../../../test-data/auth/signup/signupUsers');

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

    test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when all required fields are empty`, async ({ accountInfoPage }) => {
        await accountInfoPage.createAccount();
        await accountInfoPage.verifyRequiredValidation(accountInfoPage.password);
    });

    for (const { field, clear, getLocator } of accountRequiredFieldCases) {
        test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when ${field} is empty`, async ({ accountInfoPage }) => {
            await accountInfoPage.enterRequiredFields(getRequiredFields(user));

            await clear(accountInfoPage);
            await accountInfoPage.createAccount();

            await accountInfoPage.verifyRequiredValidation(getLocator(accountInfoPage));
        });
    }
});
