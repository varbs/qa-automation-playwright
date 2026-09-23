const { test } = require('../../../../../fixtures/fixture');

const { accountRequiredFieldCases } = require('../../../../../test-data/auth/signup/accountRequiredFieldCases');

const { generateSignupUser } = require('../../../../../utils/generateUser');
const { createTcCounter } = require('../../../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Account Information Required Validation', () => {

    let user;

    test.beforeEach(async ({ signupPage, accountInfoPage }) => {
        user = generateSignupUser();

        await signupPage.signup(user.name, user.email);
        await accountInfoPage.verifyAccountInfoPageLoaded();

        await accountInfoPage.enterRequiredFields(user);
    });

    for (const { field, clear, getLocator } of accountRequiredFieldCases ){
        test(`TC-ACC-VAL-${nextTcId()} - Verify account creation is blocked when ${field} is empty`, async ({ accountInfoPage }) => {
            await clear(accountInfoPage);
            await accountInfoPage.createAccount();

            await accountInfoPage.verifyRequiredValidation(getLocator(accountInfoPage));
        });
    }
});
