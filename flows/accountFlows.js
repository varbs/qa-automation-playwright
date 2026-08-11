const { SIGNUP_TITLE } = require('../constant/signupTitle');
const { signupCountries } = require('../test-data/signup/signupCountries');
const { signupBirthDates } = require('../test-data/signup/signupBirthDates');

const { valid } = signupBirthDates;

async function completeSignup(
    signupPage, 
    accountInfoPage, 
    user,
    country = signupCountries.canada
) {
    await signupPage.signup(user.name, user.email);
    await signupPage.verifySignupPage();

    await accountInfoPage.selectTitle(SIGNUP_TITLE.MR);
    await accountInfoPage.enterPassword(user.password);
    await accountInfoPage.enterBirthDate(
        valid.day,
        valid.month,
        valid.year
    );

    await accountInfoPage.enterFirstName(user.firstName);
    await accountInfoPage.enterLastName(user.lastName);

    await accountInfoPage.enterAddressDetails({ ...user, country });
    await accountInfoPage.verifySelectedCountry(country);

    await accountInfoPage.createAccount();

    await accountInfoPage.verifyAccountCompletion();
};

module.exports = { completeSignup };