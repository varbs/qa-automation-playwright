const { test } = require("../../../../fixtures/fixture")
const { VALIDATION_TYPES } = require('../../../../constant/validationTypes');

const { whitespaceCases } = require('../../../../test-data/common/whitespaceCases');
const { signupEmailFormatCases } = require('../../../../test-data/auth/signup/signupEmailFormatCases');

const { signupUser } = require('../../../../test-data/auth/signup/signupUsers');
const { validUser, emptyCredentials } = signupUser;

const { generateSignupUser } = require('../../../../utils/generateUser');
const { createTcCounter } = require('../../../../utils/testCaseHelper');
const { addWhitespace } = require('../../../../utils/stringHelper');

const nextTcId = createTcCounter();

test.describe('Signup - Name Field Validations', () => {

    let user;

    test.beforeEach(() => {
        user = generateSignupUser();
    });

    test.describe('Required Field Validation', () => {
        test(`TC-SIGNUP-VAL-${nextTcId()} - Verify user cannot proceed to account information when name is empty`, async ({ signupPage }) => {
            await signupPage.signup(
                emptyCredentials.name,
                user.email
            )
            await signupPage.verifyRequiredValidation(signupPage.nameTextbox);
        });
        test(`TC-SIGNUP-VAL-${nextTcId()} - Verify user cannot proceed to account information when both name and email are empty`, async ({ signupPage }) => {
            await signupPage.signup(
                emptyCredentials.name,
                emptyCredentials.email
            )
            await signupPage.verifyRequiredValidation(signupPage.nameTextbox);
        });
    });

    test.describe('Whitespace Handling', () => {
        for (const { scenario, leadingSpaces, trailingSpaces } of whitespaceCases) {

            test(`TC-SIGNUP-VAL-${nextTcId()} - Verify user can proceed to account information with name containing ${scenario}`, async ({ signupPage, accountInfoPage }) => {

                const name = addWhitespace(
                    user.name,
                    leadingSpaces,
                    trailingSpaces
                );

                await signupPage.signup(
                    name,
                    user.email
                );
                await accountInfoPage.verifyAccountInfoPageLoaded();
            });
        }
    });
});

test.describe('Signup - Email Field Validations', () => {

    let user;

    test.beforeEach(() => {
        user = generateSignupUser();
    });

    test.describe('Required Field Validation', () => {
        test(`TC-SIGNUP-VAL-${nextTcId()} - Verify user cannot proceed to account information when email is empty`, async ({ signupPage }) => {
            await signupPage.signup(
                user.name,
                emptyCredentials.email
            )
            await signupPage.verifyRequiredValidation(signupPage.emailTextbox);
        });
    });

    test.describe('Existing Email Validation', () => {
        test(`TC-SIGNUP-VAL-${nextTcId()} - Verify user cannot proceed to account information with an existing email`, async ({ signupPage }) => {
            await signupPage.signup(
                user.name,
                validUser.email
            )
            await signupPage.verifyExistingEmail();
        });
    })

    test.describe('Whitespace Handling', () => {
        for (const { scenario, leadingSpaces, trailingSpaces } of whitespaceCases) {

            test(`TC-SIGNUP-VAL-${nextTcId()} - Verify user can proceed to account information with email ${scenario}`, async ({ signupPage, accountInfoPage }) => {

                const email = addWhitespace(
                    user.email,
                    leadingSpaces,
                    trailingSpaces
                );

                await signupPage.signup(
                    user.name,
                    email
                );
                await accountInfoPage.verifyAccountInfoPageLoaded();
            });
        }
    });

    test.describe('Email Format Validation', () => {
        for (const { scenario, email, validationType } of signupEmailFormatCases) {

            test(`TC-SIGNUP-VAL-${nextTcId()}  - Verify signup behaviour with email ${scenario}`, async ({ signupPage, accountInfoPage }) => {

                await signupPage.signup(
                    user.name,
                    email
                );

                switch (validationType) {
                    case VALIDATION_TYPES.BROWSER: {
                        await signupPage.verifyBrowserEmailValidation(signupPage.emailTextbox);
                        break;
                    }
                    case VALIDATION_TYPES.PROCEED: {
                        await accountInfoPage.verifyAccountInfoPageLoaded();
                        break;
                    }
                    default: {
                        throw new Error(
                            `Unknown validation type: ${validationType}`);
                    }
                }
            });
        }
    });
});