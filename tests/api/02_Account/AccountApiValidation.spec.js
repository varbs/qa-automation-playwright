const { test, expect } = require('../../../fixtures/apiFixtures');
const { buildApiUser } = require('../../../test-data/api/apiUserData');

const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Account API - Validation', () => {
    test(`TC-API-ACC-VAL-${nextTcId()} - Verify login without an email is refused`, async ({ accountApi }) => {
        const { body } = await accountApi.verifyLogin({ password: 'Test@12345' });

        expect(body.responseCode).toBe(400);
        expect(body.message).toContain('missing');
    });

    test(`TC-API-ACC-VAL-${nextTcId()} - Verify DELETE on verify login is not supported`, async ({ accountApi }) => {
        const { body } = await accountApi.deleteVerifyLogin();

        expect(body.responseCode).toBe(405);
        expect(body.message).toContain('not supported');
    });

    test(`TC-API-ACC-VAL-${nextTcId()} - Verify login with invalid details is refused`, async ({ accountApi }) => {
        const { body } = await accountApi.verifyLogin({
            email: 'non-existing@example.com',
            password: 'wrong-password'
        });

        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('User not found!');
    });

    test(`TC-API-ACC-VAL-${nextTcId()} - Verify update of an account that does not exist is refused`, async ({ accountApi }) => {
        const { body } = await accountApi.updateAccount(buildApiUser());

        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('Account not found!');
    });


    test(`TC-API-ACC-VAL-${nextTcId()} - Verify a duplicate email is not accepted`, async ({ accountApi, existingAccount }) => {
        const { body } = await accountApi.createAccount(existingAccount);

        expect(body.responseCode).not.toBe(201);
    });

    const missingFieldCases = [
        { field: 'name' },
        { field: 'email' },
        { field: 'password' },
    ];

    for (const { field } of missingFieldCases) {
        test(`TC-API-ACC-VAL-${nextTcId()} - Verify create account without ${field} is refused`, async ({ accountApi }) => {
            const user = buildApiUser();
            delete user[field];

            const { body } = await accountApi.createAccount(user);

            expect(body.responseCode).toBe(400);
            expect(body.message).toContain('missing');
        });
    }
})
