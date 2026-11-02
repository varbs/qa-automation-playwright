const { test, expect } = require('../../../fixtures/apiFixtures');

const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Products API Validation', () => {
    test(`TC-API-PROD-VAL-${nextTcId()} - Verify POST to products list is not supported`, async ({ productsApi }) => {
        const { status, body } = await productsApi.postToProductsList();

        expect(status).toBe(200);
        expect(body.responseCode).toBe(405);
        expect(body.message).toContain('not supported');
    });

    test(`TC-API-PROD-VAL-${nextTcId()} - Verify PUT to brands list is not supported`, async ({ productsApi }) => {
        const { status, body } = await productsApi.putToBrandsList();

        expect(status).toBe(200);
        expect(body.responseCode).toBe(405);
        expect(body.message).toContain('not supported');
    });

    test(`TC-API-PROD-VAL-${nextTcId()} - Verify search without a term is refused`, async ({ productsApi }) => {
        const { status, body } = await productsApi.searchProduct();

        expect(status).toBe(200);
        expect(body.responseCode).toBe(400);
        expect(body.message).toContain('search_product');
    });
});
