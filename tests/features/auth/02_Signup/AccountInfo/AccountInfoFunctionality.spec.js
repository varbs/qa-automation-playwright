const { test } = require("../../../../../fixtures/fixture");

const { SIGNUP_TITLE } = require('../../../../../constant/signupTitle');
const { ACCOUNT_OPTIONS } = require("../../../../../constant/accountOptions");

const { accountPreferenceCases } = require('../../../../../test-data/auth/signup/accountPreferenceCases');

const { signupUser } = require('../../../../../test-data/auth/signup/signupUsers');
const { updatedUser } = signupUser;

const { generateSignupUser } = require('../../../../..//utils/generateUser');

const { createTcCounter } = require('../../../../..//utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Account Information Functionality', () => {

    let user;

    test.beforeEach(async ({ signupPage, accountInfoPage }) => {
        user = generateSignupUser();

        await signupPage.signup(user.name, user.email);
        await accountInfoPage.verifyAccountInfoPageLoaded();
    });

    test.describe('Signup - Data', () => {
        test(`TC-ACC-FUN-${nextTcId()} - Verify name and email entered on Signup page are carried over correctly to Account Information page`, async ({ accountInfoPage }) => {
            await accountInfoPage.verifySignupDetails(user.name, user.email);
        });

        test (`TC-ACC-FUN-${nextTcId()} - Verify name can be Edited`, async ({ accountInfoPage }) => {
            await accountInfoPage.editName(`${updatedUser.firstName} ${updatedUser.lastName}`);
            await accountInfoPage.verifyName(`${updatedUser.firstName} ${updatedUser.lastName}`);
        });
    });

    test.describe(`Title Selection`, () => {
        for (const title of Object.values(SIGNUP_TITLE)) {
            test(`TC-ACC-FUNC-${nextTcId()} - Verify if user can select ${title} `, async ({ accountInfoPage }) => {
                await accountInfoPage.selectTitle(title);
                await accountInfoPage.verifySelectedTitle(title);
            });
        }
    });

    test.describe('Account Preference Cases', () => {
        for (const { option, label, checked } of accountPreferenceCases) {
            test(`TC-ACC-FUNC-${nextTcId()} - Verify user can ${checked ? 'check' : 'leave unchecked'} ${label}`, async ({ accountInfoPage }) => {
                switch (option) {
                    case ACCOUNT_OPTIONS.NEWSLETTER:
                        await accountInfoPage.setNewsletterSubscription(checked);
                        await accountInfoPage.verifyNewsletterSubscription(checked);
                        break;

                    case ACCOUNT_OPTIONS.SPECIAL_OFFERS:
                        await accountInfoPage.setSpecialOffersSubscription(checked);
                        await accountInfoPage.verifySpecialOffersSubscription(checked);
                        break;

                    default:
                        throw new Error(`Unsupported option: ${option}`);
                }
            });
        }
    });
});