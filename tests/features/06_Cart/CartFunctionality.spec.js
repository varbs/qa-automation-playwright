const { test } = require('../../../fixtures/fixture');

const { productTestData, cartVerificationScenarios } = require('../../../test-data/products/productTestData');
const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Cart Functionality', () => {

    test.beforeEach(async ({ homePage, productsPage, cartPage }) => {
        await homePage.navigateToHomePage();
        await cartPage.clearCart();
        await productsPage.navigateToProducts();
    });

    test(`TC-CART-FUNC-${nextTcId()} - Verify user can navigate to the Cart page`, async ({ cartPage }) => {
        await cartPage.navigateToCart();
    });

    test.describe('Add to Cart - Single Product', () => {
        test(`TC-CART-FUNC-${nextTcId()} - Verify user can add a single product to cart`, async ({ productsPage, cartPage }) => {
            await productsPage.addProductToCartByName(productTestData.singleProduct);
            await cartPage.navigateToCart();

            await cartPage.verifyCartItemCount(1);
        });

        test(`TC-CART-FUNC-${nextTcId()} - Verify user can add multiple products to cart`, async ({ productsPage, cartPage }) => {
            for (const name of productTestData.multipleProducts) {
                await productsPage.addProductToCartByName(name);
            }

            await cartPage.navigateToCart();
            await cartPage.verifyCartItemCount(productTestData.multipleProducts.length);
        });

        for (const scenario of cartVerificationScenarios) {
            test(`TC-CART-FUNC-${nextTcId()} - Verify added product appears in cart with ${scenario.description}`, async ({ productsPage, cartPage }) => {
                const { product, expectedQuantity, verifyPrice } = scenario;

                // Arrange
                const expectedPrice = verifyPrice
                    ? await productsPage.getProductPrice(product)
                    : null;

                // Act
                await productsPage.addProductToCartByName(product);
                await cartPage.navigateToCart();

                // Assert
                await cartPage.verifyCartProductName(product);

                if (verifyPrice) {
                    await cartPage.verifyCartProductPrice(product, expectedPrice);
                }

                await cartPage.verifyCartProductQuantity(product, expectedQuantity);
            });
        }
    });
})