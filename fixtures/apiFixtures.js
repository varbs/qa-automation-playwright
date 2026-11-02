const base = require('@playwright/test');

const { AccountApi } = require('../api-clients/AccountApi');
const { ProductsApi } = require('../api-clients/ProductsApi');
const { buildApiUser } = require('../test-data/api/apiUserData');

const test = base.test.extend({
    accountApi: async ({ request }, use) => {
        await use(new AccountApi(request));
    },

    productsApi: async ({ request }, use) => {
        await use(new ProductsApi(request));
    },

    existingAccount: async ({ accountApi }, use) => {
        const user = buildApiUser();
        await accountApi.createAccount(user);

        await use(user);

        await accountApi.deleteAccount({ email: user.email, password: user.password });
    },
});

module.exports = { test, expect: base.expect };
