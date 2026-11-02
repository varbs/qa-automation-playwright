const { test, expect } = require('../../../fixtures/apiFixtures');
const { buildApiUser } = require('../../../test-data/api/apiUserData');

const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Account API Functionality', () => {
    test(`TC-API-ACC-${nextTcId()} - Verify account lifecycle from create to delete`, async ({ accountApi }) => {
        const user = buildApiUser();
        let deleted = false;

        try {
            await test.step('Create a new account', async () => {
                const { body } = await accountApi.createAccount(user);
                expect(body.responseCode).toBe(201);
                expect(body.message).toBe('User created!');
            });

            await test.step('Read the account back', async () => {
                const { body } = await accountApi.getAccountByEmail({ email: user.email });
                expect(body.responseCode).toBe(200);
                expect(body.user.email).toBe(user.email);
                expect(body.user.name).toBe(user.name);
            });

            await test.step('Log in with the new account', async () => {
                const { body } = await accountApi.verifyLogin({ email: user.email, password: user.password });
                expect(body.responseCode).toBe(200);
                expect(body.message).toBe('User exists!');
            });

            await test.step('Update the city', async () => {
                const changed = buildApiUser({ email: user.email, password: user.password, city: 'Cebu City' });
                const { body } = await accountApi.updateAccount(changed);
                expect(body.responseCode).toBe(200);
                expect(body.message).toBe('User updated!');
            });

            await test.step('Confirm the city changed', async () => {
                const { body } = await accountApi.getAccountByEmail({ email: user.email });
                expect(body.user.city).toBe('Cebu City');
            });

            await test.step('Delete the account', async () => {
                const { body } = await accountApi.deleteAccount({ email: user.email, password: user.password });
                expect(body.responseCode).toBe(200);
                expect(body.message).toBe('Account deleted!');
                deleted = true;
            });

            await test.step('Confirm login now fails', async () => {
                const { body } = await accountApi.verifyLogin({ email: user.email, password: user.password });
                expect(body.responseCode).toBe(404);
                expect(body.message).toBe('User not found!');
            });

        } finally {
            if(!deleted) {
                await accountApi.deleteAccount({ email: user.email, password: user.password });
            }
        }
    })
});

test(`TC-API-ACC-${nextTcId()} - Verify a created account can log in`, async ({ accountApi, existingAccount }) => {
    const { body } = await accountApi.verifyLogin({
        email: existingAccount.email,
        password: existingAccount.password,
    });

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
});