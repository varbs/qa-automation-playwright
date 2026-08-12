const { SIGNUP_TITLE } = require('../../constant/signupTitle');
const { signupCountries } = require('../../test-data/auth/signup/signupCountries');
const { signupBirthDates } = require('../../test-data/auth/signup/signupBirthDates');

const { valid } = signupBirthDates;

async function completeSignup(
    signupPage,
    accountInfoPage,
    user,
    country = signupCountries.canada,
    title = SIGNUP_TITLE.MRS,
    birthDate = valid
) {
    await signupPage.signup(user.name, user.email)
        .catch(err => { throw new Error(`Failed to complete signup form: ${err.message}`) });

    await accountInfoPage.verifyAccountInfoPageLoaded()
        .catch(err => { throw new Error(`Failed to load the Account Information Page: ${err.message}`) });

    await accountInfoPage.selectTitle(title)
        .catch(err => { throw new Error(`Failed to select the title: ${err.message}`) });

    await accountInfoPage.enterPassword(user.password)
        .catch(err => { throw new Error(`Failed to enter the password: ${err.message}`) });

    // Pass the entire birthDate object { day, month, year } to enterBirthDate
    await accountInfoPage.enterBirthDate(birthDate)
        .catch(err => { throw new Error(`Failed to select the birthdate: ${err.message}`) });

    await accountInfoPage.enterFirstName(user.firstName)
        .catch(err => { throw new Error(`Failed to enter the first name: ${err.message}`) });

    await accountInfoPage.enterLastName(user.lastName)
        .catch(err => { throw new Error(`Failed to enter the last name: ${err.message}`) });

    await accountInfoPage.enterAddressDetails({ ...user, country })
        .catch(err => { throw new Error(`Failed to enter the address details: ${err.message}`) });

    await accountInfoPage.verifySelectedCountry(country)
        .catch(err => { throw new Error(`Country verification failed - expected ${country}: ${err.message}`) });

    await accountInfoPage.createAccount()
        .catch(err => { throw new Error(`Failed to create the account: ${err.message}`) });

    await accountInfoPage.verifyAccountCompletion()
        .catch(err => { throw new Error(`Account completion verification failed ${err.message}`) });
};

module.exports = { completeSignup };