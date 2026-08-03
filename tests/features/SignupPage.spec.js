const { users, generateEmail } = require("../../test-data/users");
const { test, expect } = require("../../fixtures/fixture");

test("TC001 - Invalid sign-up", async ({ signupPage }) => {

    await signupPage.openSignupLoginPage();

    await signupPage.signup(
        users.signUp.validUser.name,
        users.signUp.existingUser.existingEmail,
    );
    await signupPage.pause();
    await signupPage.verifyExistingEmail();
});

test("TC002 - Valid sign-up", async ({ signupPage, accountInfoPage }) => {
    const email = generateEmail();

    await signupPage.openSignupLoginPage();

    await signupPage.signup(users.signUp.validUser.name, email);

    await signupPage.verifySignupPage();

    await accountInfoPage.selectTitle(users.signUp.validUser.userInfo.title);

    await accountInfoPage.verifyName(users.signUp.validUser.name);
    await accountInfoPage.verifyEmail(email);
    await accountInfoPage.enterPassword(users.signUp.validUser.userInfo.password);
    await accountInfoPage.enterBirthDate(
        users.signUp.validUser.userInfo.dateOfBirth.day,
        users.signUp.validUser.userInfo.dateOfBirth.month,
        users.signUp.validUser.userInfo.dateOfBirth.year,
    );
    await accountInfoPage.setNewsletterSubscription(
        users.signUp.validUser.userInfo.newsletter,
    );
    await accountInfoPage.setSpecialOffersSubscription(
        users.signUp.validUser.userInfo.specialoffers,
    );
    await accountInfoPage.enterFirstname(
        users.signUp.validUser.userInfo.firstName,
    );
    await accountInfoPage.enterLastname(
        users.signUp.validUser.userInfo.lastName
    );

    await accountInfoPage.enterCompany(
        users.signUp.validUser.addressInfo.company
    );
    await accountInfoPage.fillAddress(
        users.signUp.validUser.addressInfo.address,
        users.signUp.validUser.addressInfo.address2
    )
    await accountInfoPage.verifyCountryOptions();
    await accountInfoPage.selectCountry(
        users.signUp.validUser.addressInfo.country
    )
    await accountInfoPage.verifySelectedCountry(
        users.signUp.validUser.addressInfo.country
    );
    await accountInfoPage.enterState(
        users.signUp.validUser.addressInfo.state
    )
    await accountInfoPage.enterCity(
        users.signUp.validUser.addressInfo.city
    );
    await accountInfoPage.enterZipcode(
        users.signUp.validUser.addressInfo.zipCode
    );
    await accountInfoPage.enterMobile(
        users.signUp.validUser.addressInfo.mobileNum
    );
    await accountInfoPage.pause();

    await accountInfoPage.createClick();
    await accountInfoPage.verifyAccountCompletion();


    await accountInfoPage.pause();
});
