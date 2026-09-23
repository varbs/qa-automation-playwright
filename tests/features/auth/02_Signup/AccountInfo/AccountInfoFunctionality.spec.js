const { test } = require("../../../../../fixtures/fixture");

const { SIGNUP_TITLE } = require('../../../../../constants/signupTitle');

const { accountPreferenceCases } = require('../../../../../test-data/auth/signup/accountPreferenceCases');
const { signupUser, getRequiredFields } = require('../../../../../test-data/auth/signup/signupUsers');
const { updatedUser } = signupUser;

const { generateSignupUser } = require('../../../../../utils/generateUser');

const { createTcCounter } = require('../../../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Account Information Functionality', () => {

    let user;

    test.beforeEach(async ({ signupPage, accountInfoPage }) => {
        user = generateSignupUser();

        await signupPage.signup(user.name, user.email);
        await accountInfoPage.verifyAccountInfoPageLoaded();
    });


    test(`TC-ACC-FUNC-${nextTcId()} - Verify if user can successfully create an account with only required fields filled`, async ({ accountInfoPage }) => {
        await accountInfoPage.enterRequiredFields(getRequiredFields(user));

        await accountInfoPage.createAccount();
        await accountInfoPage.verifyAccountCompletion();
    });

    test.describe('Signup - Data', () => {
        test(`TC-ACC-FUNC-${nextTcId()} - Verify name and email entered on Signup page are carried over correctly to Account Information page`, async ({ accountInfoPage }) => {
            await accountInfoPage.verifySignupDetails(user.name, user.email);
        });

        test(`TC-ACC-FUNC-${nextTcId()} - Verify name can be editable`, async ({ accountInfoPage }) => {
            await accountInfoPage.verifyNameIsEditable();
        })

        test(`TC-ACC-FUNC-${nextTcId()} - Verify pre-filled name can be changed to a new value`, async ({ accountInfoPage }) => {
            const newName = `${updatedUser.firstName} ${updatedUser.lastName}`;

            await accountInfoPage.editName(newName);
            await accountInfoPage.verifyName(newName);
        });
    });

    test.describe(`Title Selection`, () => {
        for (const title of Object.values(SIGNUP_TITLE)) {
            test(`TC-ACC-FUNC-${nextTcId()} - Verify if user can select ${title}`, async ({ accountInfoPage }) => {
                await accountInfoPage.selectTitle(title);
                await accountInfoPage.verifySelectedTitle(title);
            });

            test(`TC-ACC-FUNC-${nextTcId()} - Verify successful account creation with ${title}`, async ({ accountInfoPage }) => {
                await accountInfoPage.selectTitle(title);
                await accountInfoPage.enterRequiredFields(getRequiredFields(user));

                await accountInfoPage.createAccount();
                await accountInfoPage.verifyAccountCompletion();
            });
        }
    });

    test.describe('Account Preference Cases', () => {
        for (const { label, checked, set, verify } of accountPreferenceCases) {
            test(`TC-ACC-FUNC-${nextTcId()} - Verify user can ${checked ? 'check' : 'leave unchecked'} ${label}`, async ({ accountInfoPage }) => {
                await set(accountInfoPage, checked);
                await verify(accountInfoPage, checked);
            });
        }
    });
});