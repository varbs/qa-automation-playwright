const { loginUsers } = require('../../../test-data/login/loginUsers');
const { emailWhitespaceCases } = require('../../../test-data/common/emailWhitespaceCases');
const { emailFormatCases } = require('../../../test-data/common/emailFormatCases');
const { test } = require('../../../fixtures/fixture');
const { VALIDATION_TYPES } = require('../../../constant/validationTypes');



test.describe('Login - Invalid Credentials', () => {
    test('TC-LOGIN-004 - Verify login fails with invalid credentials', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.invalidEmail,
            loginUsers.invalidPassword
        );
        await loginPage.verifyInvalidLogin();
    });
    test('TC-LOGIN-005 - Verify login fails with an invalid email', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.invalidEmail,
            loginUsers.validUser.password
        );
        await loginPage.verifyInvalidLogin();
    });

    test('TC-LOGIN-006 - Verify login fails with an incorrect password', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.validUser.email,
            loginUsers.invalidPassword
        );
        await loginPage.verifyInvalidLogin();
    });

});

test.describe('Login - Required Field Validation', () => {

    test('TC-LOGIN-007 - Verify login with empty email and password', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.emptyCredentials.email,
            loginUsers.emptyCredentials.password
        );
        await loginPage.verifyEmailFieldIsFocused();
        await loginPage.verifyEmailFieldIsRequired();
    });

    test('TC-LOGIN-008 - Verify login with empty email', async ({ loginPage }) => {
        await loginPage.login(
            loginUsers.emptyCredentials.email,
            loginUsers.validUser.password
        );
        await loginPage.verifyEmailFieldIsFocused();
        await loginPage.verifyEmailFieldIsRequired();

    });

    test('TC-LOGIN-009 - Verify login with empty password', async ({ loginPage }) => {
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

        const testCaseId = String(10 + index).padStart(3, '0');

        test(`TC-LOGIN-${testCaseId} - Verify login with email ${scenario}`, async ({ loginPage }) => {

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

        const testCaseId = String(13 + index).padStart(3, '0');

        test(`TC-LOGIN-${testCaseId} - Verify login rejects ${scenario}`, async ({ loginPage }) => {
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

