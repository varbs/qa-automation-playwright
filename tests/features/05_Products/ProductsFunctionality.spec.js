const { test, expect } = require('../../../fixtures/fixture');

const { productSearchData } = require('../../../test-data/products/productSearchData');

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
            // Arrange
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
        });

        test.describe('Product Quantity Functionality', () => {
            test.describe('Input field', () => {
                test(`TC-PROD-FUNC-${nextTcId()} - Verify user can input quantity manually before adding to cart`, async ({ productsDetailPage }) => {
                    await productsDetailPage.setQuantity(3);
                    await productsDetailPage.addToCart();

                    await productsDetailPage.verifyQuantity(3);
                });
            });

            test.describe('Keyboard Interaction', () => {
                test(`TC-PROD-FUNC-${nextTcId()} - Verify user can increase quantity using ArrowUp key`, async ({ productsDetailPage }) => {
                    // Arrange — set the starting quantity to 1
                    await productsDetailPage.setQuantity(1);

                    // Act — increment quantity from 1 to 3 using the ArrowUp key
                    // Press ArrowUp twice: 1 → 2 → 3
                    await productsDetailPage.incrementQuantity(2);
                    await productsDetailPage.addToCart();

                    // Assert - verify the quantity is 3
                    await productsDetailPage.verifyQuantity(3);
                });

                test(`TC-PROD-FUNC-${nextTcId()} - Verify user can decrease quantity using ArrowDown key`, async ({ productsDetailPage }) => {
                    await productsDetailPage.setQuantity(3);

                    await productsDetailPage.decrementQuantity(1);
                    await productsDetailPage.addToCart();

                    await productsDetailPage.verifyQuantity(2);
                })
            });
        })
    });

    test(`TC-PROD-FUNC-${nextTcId()} - Verify user can add a product to cart from the Products page`, async ({ productsPage }) => {
        await productsPage.addToCartFromList();
        await productsPage.verifyAddToCartModalVisible();
    });

    test.describe('Product Search Functionality', () => {
        test(`TC-PROD-FUNC-${nextTcId()} - Verify user can search an existing product by name`, async ({ productsPage }) => {
            await productsPage.searchProduct(productSearchData.validKeyword);
            await productsPage.verifySearchResultsVisible();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify user receives no results when searching for a non-existent product by name`, async ({ productsPage }) => {
            await productsPage.searchProduct(productSearchData.noResultsKeyword);
            await productsPage.verifyNoSearchResultFound();
        });

        test(`TC-PROD-FUNC-${nextTcId()} - Verify search is case-insensitive`, async({ productsPage }) => {
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

        test(`TC-PROD-FUNC-${nextTcId()} - Verify user can view a product from search results`, async ({ productsPage, productsDetailPage }) => {
            await productsPage.searchProduct(productSearchData.validKeyword);
            await productsPage.verifySearchResultsVisible();

            await productsPage.clickProduct();
            await productsDetailPage.verifyProductDetailPageLoaded();
        });
    });
});