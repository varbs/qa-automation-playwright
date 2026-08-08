const { test } = require("../../../fixtures/fixture");

const { SIGNUP_TITLE } = require('../../../constant/signupTitle');

const { signupBirthDates }  = require('../../../test-data/signup/signupBirthDates');
const { valid } = signupBirthDates;

const { generateSignupUser } = require('../../../utils/generateUser');


test.describe('Signup Functionality', () => {
    test('TC-SIGNUP-FUNC-001 - Verify user can sign up with valid credentials', async ({ signupPage, accountInfoPage }) => {
        const user = generateSignupUser();

        await signupPage.signup(user.name, user.email);
        await signupPage.verifySignupPage();
        
        await accountInfoPage.selectTitle(SIGNUP_TITLE.MR);
        await accountInfoPage.enterPassword(user.password);
        await accountInfoPage.enterBirthDate(
            valid.day,
            valid.month,
            valid.year
        );
        await accountInfoPage.enterFirstname(user.firstName);
        await accountInfoPage.enterLastname(user.lastName);

        await accountInfoPage.enterAddressDetails(user);
        await accountInfoPage.pause();
    });
});