const { test } = require("../../../fixtures/fixture");

const { emailWhitespaceCases } = require("../../../test-data/common/emailWhitespaceCases");
const { nameWhitespaceCases } = require('../../../test-data/common/nameWhitespaceCases');

const { generateSignupUser } = require('../../../utils/generateUser');
const { getTestCaseId } = require('../../../utils/testCaseHelper');



test.describe('Signup - Whitespaces Handling', () => {
    test.describe('Name', () => {
        for (const [index, { scenario, leadingSpaces, trailingSpaces }] of nameWhitespaceCases.entries()) {

            const testCaseId = getTestCaseId(1, index);

            test(`TC-SIGNUP-VAL-${testCaseId} - Verify user can proceed to account information with name containing ${scenario}`, async ({ signupPage, accountInfoPage }) => {
                
                const user = generateSignupUser();
                const name = ' '.repeat(leadingSpaces) +
                    user.name +
                    ' '.repeat(trailingSpaces);

                await signupPage.signup(
                    name,
                    user.email
                );
                await accountInfoPage.verifyAccountInfoPageLoaded();
            })
        }
    });

    test.describe('Email', () => {
        for (const [index, { scenario, leadingSpaces, trailingSpaces }] of emailWhitespaceCases.entries()) {

            const testCaseId = getTestCaseId(4, index);

            test(`TC-SIGNUP-VAL-${testCaseId} - Verify user can proceed to account information with email ${scenario}`, async ({ signupPage, accountInfoPage }) => {

                const user = generateSignupUser();
                const email = ' '.repeat(leadingSpaces) +
                    user.email +
                    ' '.repeat(trailingSpaces);


                await signupPage.signup(
                    user.name,
                    email
                );
                await accountInfoPage.verifyAccountInfoPageLoaded();
            })
        }
    });
});
