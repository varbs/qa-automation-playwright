const { loginUsers } = require('../../../test-data/login/loginUsers');
const { emailWhitespaceCases } = require('../../../test-data/common/emailWhitespaceCases');
const { emailFormatCases } = require('../../../test-data/common/emailFormatCases');
const { emailCaseValidation } = require('../../../test-data/common/emailCaseValidation');


const { test } = require('../../../fixtures/fixture');

const { VALIDATION_TYPES } = require('../../../constant/validationTypes');



test.describe('Login - Invalid Credentials', () => {
    test('TC-LOGIN-VAL-001 - Verify login fails with a valid email and incorrect password', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.invalidEmail,
            loginUsers.invalidPassword
        );
        await loginPage.verifyInvalidLogin();
    });
    test('TC-LOGIN-VAL-002 - Verify login fails with an unregistered email address', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.invalidEmail,
            loginUsers.validUser.password
        );
        await loginPage.verifyInvalidLogin();
    });

    test('TC-LOGIN-VAL-003 - Verify login fails with an incorrect password', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.validUser.email,
            loginUsers.invalidPassword
        );
        await loginPage.verifyInvalidLogin();
    });

});

test.describe('Login - Required Field Validation', () => {

    test('TC-LOGIN-VAL-004 - Verify login is blocked when both email and password are empty', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.emptyCredentials.email,
            loginUsers.emptyCredentials.password
        );
        await loginPage.verifyEmailFieldIsFocused();
        await loginPage.verifyEmailFieldIsRequired();
    });

    test('TC-LOGIN-VAL-005 - Verify login is blocked when the email field is left empty', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.emptyCredentials.email,
            loginUsers.validUser.password
        );
        await loginPage.verifyEmailFieldIsFocused();
        await loginPage.verifyEmailFieldIsRequired();

    });

    test('TC-LOGIN-VAL-006 - Verify login is blocked when the password field is left empty', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.validUser.email,
            loginUsers.emptyCredentials.password
        );
        await loginPage.verifyPasswordFieldIsFocused();
        await loginPage.verifyPasswordFieldIsRequired();
    });
});

test.describe('Login - Email Whitespace Handling', () => {
    for (const [index, { scenario, leadingSpaces, trailingSpaces }] of emailWhitespaceCases.entries()) {

        const testCaseId = String(7 + index).padStart(3, '0');

        test(`TC-LOGIN-VAL-${testCaseId} - Verify login with email ${scenario}`, async ({ loginPage }) => {

            const email = ' '.repeat(leadingSpaces) +
                loginUsers.validUser.email +
                ' '.repeat(trailingSpaces);

            await loginPage.login(
                email,
                loginUsers.validUser.password
            );
            await loginPage.verifyValidLogin();
        });
    };
});

test.describe('Login - Email Format validation', () => {
    for (const [index, { scenario, email, validationType }] of emailFormatCases.entries()) {

        const testCaseId = String(10 + index).padStart(3, '0');

        test(`TC-LOGIN-VAL-${testCaseId} - Verify login is blocked with ${scenario}`, async ({ loginPage }) => {
            await loginPage.login(
                email,
                loginUsers.validUser.password
            );
            switch (validationType) {
                case VALIDATION_TYPES.BROWSER:
                    await loginPage.verifyBrowserEmailValidation();
                    break;
                case VALIDATION_TYPES.APPLICATION:
                    await loginPage.verifyInvalidLogin();
                    break;
                default:
                    throw new Error(
                        `Unknow validation type: ${validationType}`);
            }
        })
    };
});

test.describe('Login - Email Case validation', () => {
    for (const [index, { scenario, email }] of emailCaseValidation.entries()) {

        const testCaseId = String(16 + index).padStart(3, '0');

        test(`TC-LOGIN-VAL-${testCaseId} - Verify login is blocked with email${scenario}`, async ({ loginPage }) => {
            await loginPage.login(
                email,
                loginUsers.validUser.password
            );
            await loginPage.verifyInvalidLogin();
        });
    };
});

