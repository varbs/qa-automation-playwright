const { test } = require('../../../fixtures/fixture')

const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Product Functionality', () => {
    test.beforeEach(async ({ homePage, productsPage }) => {
        await homePage.navigateToHomePage();

        await productsPage.navigateToProducts();
    });

    test(`TC-PROD-FUNC-${nextTcId()} - Verify user can navigate to the Products page`, async () => {
        // covered by beforeEach
    });

    test(`TC-PROD-FUNC-${nextTcId()} - Verify all products are listed on the Products Page`, async ({ productsPage }) => {
        await productsPage.verifyProductsAreVisible();
    });

    test.describe('Product Detailed Page', () => {
        test.beforeEach(async ({ productsPage, productsDetailPage }) => {
            await productsPage.clickProduct();
            await productsDetailPage.verifyProductDetailPageLoaded();
        })

        test(`TC-PROD-FUNC-${nextTcId()} - Verify user can view a product's detailed page`, async ({ productsDetailPage }) => {
            // covered by beforeEach
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays product name`, async ({ productsDetailPage }) => {
            await productsDetailPage.verifyProductName();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays product category`, async ({ productsDetailPage }) => {
            await productsDetailPage.verifyProductCategory();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays product price`, async ({ productsDetailPage }) => {
            await productsDetailPage.verifyProductPrice();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays availability status`, async ({ productsDetailPage }) => {
            await productsDetailPage.verifyProductAvailability();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays condition`, async ({ productsDetailPage }) => {
            await productsDetailPage.verifyProductCondition();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays brand`, async ({ productsDetailPage }) => {
            await productsDetailPage.verifyProductBrand();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify user can add a product to cart from the product detail page`, async ({ productsDetailPage }) => {
            await productsDetailPage.addToCart();
            await productsDetailPage.verifyAddToCartModal();
        })
    });

    test(`TC-PROD-FUNC-${nextTcId()} - Verify user can add a product to cart from the Products page`, async ({ productsPage }) => {
        await productsPage.addToCartFromList();
        await productsPage.verifyAddToCartModalVisible();
    })


});