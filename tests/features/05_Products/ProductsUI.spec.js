const { test, expect } = require('../../../fixtures/fixture');

const { productSearchData } = require('../../../test-data/products/productSearchData');

const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Product UI', () => {
    test.beforeEach(async ({ homePage, productsPage }) => {
        await homePage.navigateToHomePage();

        await productsPage.navigateToProducts();
    });

    test(`TC-PROD-UI-${nextTcId()} - Verify Products page title is displayed`, async ({ productsPage }) => {
        await expect(productsPage.productsTitle).toBeVisible();
    });

    test.describe('Product Cards', () => {
        test(`TC-PROD-UI-${nextTcId()} - Verify each product card displays an image`, async ({ productsPage }) => {
            await productsPage.verifyProductCardImagesVisible();
        });

        test(`TC-PROD-UI-${nextTcId()} - Verify each product card displays the product name`, async ({ productsPage }) => {
            await productsPage.verifyProductNamesAreVisible();
        });

        test(`TC-PROD-UI-${nextTcId()} - Verify each product card displays the product price`, async ({ productsPage }) => {
            await productsPage.verifyProductPricesAreVisible();
        });

        test(`TC-PROD-UI-${nextTcId()} - Verify "Add to Cart" button is visible on each card`, async ({ productsPage }) => {
            await productsPage.verifyAddToCartButtonsAreVisible();
        });

        test(`TC-PROD-UI-${nextTcId()} - Verify "View Product" button is visible on each card`, async ({ productsPage }) => {
            await productsPage.verifyViewProductButtonsAreVisible();
        });
    });

    test(`TC-PROD-UI-${nextTcId()} - Verify search bar is visible on the Product Page`, async ({ productsPage }) => {
        await expect(productsPage.searchInput).toBeVisible();
    });

    test(`TC-PROD-UI-${nextTcId()} - Verify search results action heading is displayed after search`, async ({ productsPage }) => {
        await productsPage.searchProduct(productSearchData.validKeyword);
        await expect(productsPage.searchResultsTitle).toBeVisible();
    });
})