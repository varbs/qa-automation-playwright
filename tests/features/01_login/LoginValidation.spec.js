const { test } = require('../../../fixtures/fixture');

const { loginUsers } = require('../../../test-data/login/loginUsers');
const { validUser, invalidUser, emptyCredentials } = loginUsers;

const { emailWhitespaceCases } = require('../../../test-data/common/emailWhitespaceCases');
const { emailFormatCases } = require('../../../test-data/common/emailFormatCases');
const { emailCaseValidation } = require('../../../test-data/common/emailCaseValidation');

const { VALIDATION_TYPES } = require('../../../constant/validationTypes');

const { getTestCaseId } = require('../../../utils/testCaseHelper');

test.describe('Login - Invalid Credentials', () => {
    test('TC-LOGIN-VAL-001 - Verify login fails with an invalid email and incorrect password', async ({ loginPage }) => {
        await loginPage.login(
            invalidUser.email,
            invalidUser.password
        );
        await loginPage.verifyInvalidLogin();
    });

    test('TC-LOGIN-VAL-002 - Verify login fails with an unregistered email address', async ({ loginPage }) => {
        await loginPage.login(
            invalidUser.email,
            validUser.password
        );
        await loginPage.verifyInvalidLogin();
    });

    test('TC-LOGIN-VAL-003 - Verify login fails with an incorrect password', async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            invalidUser.password
        );
        await loginPage.verifyInvalidLogin();
    });
});

test.describe('Login - Required Field Validation', () => {

    test('TC-LOGIN-VAL-004 - Verify login is blocked when both email and password are empty', async ({ loginPage }) => {
        await loginPage.login(
            emptyCredentials.email,
            emptyCredentials.password
        );
        await loginPage.verifyRequiredValidation(loginPage.emailTextbox);
    });

    test('TC-LOGIN-VAL-005 - Verify login is blocked when the email field is left empty', async ({ loginPage }) => {
        await loginPage.login(
            emptyCredentials.email,
            validUser.password
        );
        await loginPage.verifyRequiredValidation(loginPage.emailTextbox);
    });

    test('TC-LOGIN-VAL-006 - Verify login is blocked when the password field is left empty', async ({ loginPage }) => {
        await loginPage.login(
            validUser.email,
            emptyCredentials.password
        );
        await loginPage.verifyRequiredValidation(loginPage.passwordTextbox);
    });
});

test.describe('Login - Email Whitespace Handling', () => {
    for (const [index, { scenario, leadingSpaces, trailingSpaces }] of emailWhitespaceCases.entries()) {

        const testCaseId = getTestCaseId(7, index);

        test(`TC-LOGIN-VAL-${testCaseId} - Verify login succeeds with email ${scenario}`, async ({ loginPage }) => {

            const email = ' '.repeat(leadingSpaces) +
                validUser.email +
                ' '.repeat(trailingSpaces);

            await loginPage.login(
                email,
                validUser.password
            );
            await loginPage.verifyValidLogin();
        });
    }
});

test.describe('Login - Email Format Validation', () => {
    for (const [index, { scenario, email, validationType }] of emailFormatCases.entries()) {

        const testCaseId = getTestCaseId(10, index);

        test(`TC-LOGIN-VAL-${testCaseId} - Verify login is blocked with ${scenario}`, async ({ loginPage }) => {
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
    for (const [index, { scenario, email }] of emailCaseValidation.entries()) {

        const testCaseId = getTestCaseId(16, index);

        test(`TC-LOGIN-VAL-${testCaseId} - Verify login is blocked with email ${scenario}`, async ({ loginPage }) => {
            await loginPage.login(
                email,
                validUser.password
            );
            await loginPage.verifyInvalidLogin();
        });
    }
});

