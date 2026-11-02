const { test, expect } = require('../../../fixtures/apiFixtures');

const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Products API Functionality', () => {
    test(`TC-API-PROD-${nextTcId()} - Verify that the products API returns a list of products`, async ({ productsApi }) => {
        const { body } = await productsApi.getAllProducts();

        expect(body.responseCode).toBe(200);
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);
    });

    test(`TC-API-PROD-${nextTcId()} - Verify every product has an id, name and price`, async ({ productsApi }) => {
        const { body } = await productsApi.getAllProducts();

        for (const product of body.products) {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
        }
    });

    test(`TC-API-PROD-${nextTcId()} - Verify that the brands API returns a list of brands`, async ({ productsApi }) => {
        const { body } = await productsApi.getAllBrands();

        expect(body.responseCode).toBe(200);
        expect(body.brands.length).toBeGreaterThan(0);

        for (const brand of body.brands) {
            expect(brand).toHaveProperty('id');
            expect(brand).toHaveProperty('brand');
        }
    });

    test(`TC-API-PROD-${nextTcId()} - Verify search returns products matching the term`, async ({ productsApi }) => {
        const { body } = await productsApi.searchProduct({ term: 'top' });

        expect(body.responseCode).toBe(200);
        expect(body.products.length).toBeGreaterThan(0);
        expect(JSON.stringify(body.products).toLowerCase()).toContain('top');
    });
});