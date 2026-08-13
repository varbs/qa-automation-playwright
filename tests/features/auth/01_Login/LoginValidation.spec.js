const { test } = require('../../../../fixtures/fixture');

const { VALIDATION_TYPES } = require('../../../../constant/validationTypes');

const { loginUsers } = require('../../../../test-data/auth/login/loginUsers');
const { validUser, incorrectPassword, emptyCredentials } = loginUsers;

const { whitespaceCases } = require('../../../../test-data/common/whitespaceCases');
const { loginEmailFormatCases } = require('../../../../test-data/auth/login/loginEmailFormatCases');
const { emailCaseValidation } = require('../../../../test-data/common/emailCaseValidation');

const { createTcCounter } = require('../../../../utils/testCaseHelper');
const { generateNonExistingUser } = require('../../../../utils/generateUser');
const { addWhitespace } = require('../../../../utils/stringHelper');

const nextTcId = createTcCounter();

test.describe('Login - Invalid Credentials', () => {
    test(`TC-LOGIN-VAL-${nextTcId()} - Verify login fails with non-existing account credentials`, async ({ loginPage }) => {
        const { email, password }  = generateNonExistingUser();
        await loginPage.login(
            email, 
            password
        );
        await loginPage.verifyInvalidLogin();
    });

    test(`TC-LOGIN-VAL-${nextTcId()} - Verify login fails with an unregistered email and valid password`, async ({ loginPage }) => {
        const { email } = generateNonExistingUser();
        await loginPage.login(
            email,
            validUser.password
        );
        await loginPage.verifyInvalidLogin();
    });

    test(`TC-LOGIN-VAL-${nextTcId()} - Verify login fails with an incorrect password`, async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            incorrectPassword.password
        );
        await loginPage.verifyInvalidLogin();
    });
});

test.describe('Login - Required Field Validation', () => {

    test(`TC-LOGIN-VAL-${nextTcId()} - Verify login is blocked when both email and password are empty`, async ({ loginPage }) => {
        await loginPage.login(
            emptyCredentials.email,
            emptyCredentials.password
        );
        await loginPage.verifyRequiredValidation(loginPage.emailTextbox);
    });

    test(`TC-LOGIN-VAL-${nextTcId()} - Verify login is blocked when the email field is left empty`, async ({ loginPage }) => {
        await loginPage.login(
            emptyCredentials.email,
            validUser.password
        );
        await loginPage.verifyRequiredValidation(loginPage.emailTextbox);
    });

    test(`TC-LOGIN-VAL-${nextTcId()} - Verify login is blocked when the password field is left empty`, async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            emptyCredentials.password
        );
        await loginPage.verifyRequiredValidation(loginPage.passwordTextbox);
    });
});

test.describe('Login - Email Whitespace Handling', () => {
    for (const{ scenario, leadingSpaces, trailingSpaces } of whitespaceCases) {

        test(`TC-LOGIN-VAL-${nextTcId()}- Verify login succeeds with email containing ${scenario}`, async ({ loginPage }) => {

            const email = addWhitespace(
                validUser.email,
                leadingSpaces,
                trailingSpaces
            );

            await loginPage.login(
                email,
                validUser.password
            );
            await loginPage.verifyValidLogin();
        });
    }
});

test.describe('Login - Email Format Validation', () => {
    for (const{ scenario, email, validationType } of loginEmailFormatCases) {

        test(`TC-LOGIN-VAL-${nextTcId()}- Verify login is blocked with ${scenario}`, async ({ loginPage }) => {
            await loginPage.login(
                email,
                validUser.password
            );
            switch (validationType) {
                case VALIDATION_TYPES.BROWSER: {
                    await loginPage.verifyBrowserEmailValidation(loginPage.emailTextbox);
                    break;
                }
                case VALIDATION_TYPES.APPLICATION: {
                    await loginPage.verifyInvalidLogin();
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

test.describe('Login - Email Case Validation', () => {
    for (const { scenario, email } of emailCaseValidation) {

        test(`TC-LOGIN-VAL-${nextTcId()}- Verify login is blocked with email ${scenario}`, async ({ loginPage }) => {
            await loginPage.login(
                email,
                validUser.password
            );
            await loginPage.verifyInvalidLogin();
        });
    }
});

