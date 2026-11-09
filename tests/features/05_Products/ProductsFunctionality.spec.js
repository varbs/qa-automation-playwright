const { test, expect } = require('../../../fixtures/fixture');

const { productSearchData } = require('../../../test-data/products/productSearchData');

const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Product Functionality', { tag: '@regression' }, () => {
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
        test.beforeEach(async ({ productsPage, productDetailPage }) => {
            // Arrange
            await productsPage.clickProduct();
            await productDetailPage.verifyProductDetailPageLoaded();
        })

        test(`TC-PROD-FUNC-${nextTcId()} - Verify user can view a product's detailed page`, async ({ productDetailPage }) => {
            // covered by beforeEach
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays product name`, async ({ productDetailPage }) => {
            await productDetailPage.verifyProductName();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays product category`, async ({ productDetailPage }) => {
            await productDetailPage.verifyProductCategory();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays product price`, async ({ productDetailPage }) => {
            await productDetailPage.verifyProductPrice();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays availability status`, async ({ productDetailPage }) => {
            await productDetailPage.verifyProductAvailability();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays condition`, async ({ productDetailPage }) => {
            await productDetailPage.verifyProductCondition();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify product detail page displays brand`, async ({ productDetailPage }) => {
            await productDetailPage.verifyProductBrand();
        });

        // Adding to cart is covered in 06_Cart/AddToCartFunctionality.spec.js (guest sessions).
        // The quantity tests below only check the input, so they don't click Add to cart:
        // that would add items to the shared logged-in account's cart.
        test.describe('Product Quantity Functionality', () => {
            test.describe('Input field', () => {
                test(`TC-PROD-FUNC-${nextTcId()} - Verify user can input quantity manually`, async ({ productDetailPage }) => {
                    await productDetailPage.setQuantity(3);

                    await productDetailPage.verifyQuantity(3);
                });
            });

            test.describe('Keyboard Interaction', () => {
                test(`TC-PROD-FUNC-${nextTcId()} - Verify user can increase quantity using ArrowUp key`, async ({ productDetailPage }) => {
                    // Arrange — set the starting quantity to 1
                    await productDetailPage.setQuantity(1);

                    // Act — increment quantity from 1 to 3 using the ArrowUp key
                    // Press ArrowUp twice: 1 → 2 → 3
                    await productDetailPage.incrementQuantity(2);

                    // Assert - verify the quantity is 3
                    await productDetailPage.verifyQuantity(3);
                });

                test(`TC-PROD-FUNC-${nextTcId()} - Verify user can decrease quantity using ArrowDown key`, async ({ productDetailPage }) => {
                    await productDetailPage.setQuantity(3);

                    await productDetailPage.decrementQuantity(1);

                    await productDetailPage.verifyQuantity(2);
                })
            });
        })
    });

    test.describe('Product Search Functionality', () => {
        test(`TC-PROD-FUNC-${nextTcId()} - Verify user can search an existing product by name`,
            { tag: '@smoke' },
            async ({ productsPage }) => {
                await productsPage.searchProduct(productSearchData.validKeyword);
                await productsPage.verifySearchResultsVisible();
            });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify user receives no results when searching for a non-existent product by name`, async ({ productsPage }) => {
            await productsPage.searchProduct(productSearchData.noResultsKeyword);
            await productsPage.verifyNoSearchResultFound();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify search is case-insensitive`, async ({ productsPage }) => {
            await productsPage.searchProduct(productSearchData.caseInsensitiveKeyword);
            await productsPage.verifySearchResultsVisible();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify user receives all search results when searching an empty keyword`, async ({ productsPage }) => {
            await productsPage.searchProduct(productSearchData.emptyKeyword);
            await expect(productsPage.productsTitle).toBeVisible();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify search results display products matching the keyword`, async ({ productsPage }) => {
            await productsPage.searchProduct(productSearchData.validKeyword);
            await productsPage.verifySearchResultsMatchKeyword(productSearchData.validKeyword);
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify user can view a product from search results`, async ({ productsPage, productDetailPage }) => {
            await productsPage.searchProduct(productSearchData.validKeyword);
            await productsPage.verifySearchResultsVisible();

            await productsPage.clickProduct();
            await productDetailPage.verifyProductDetailPageLoaded();
        });
    });
});