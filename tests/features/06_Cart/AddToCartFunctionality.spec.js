const { test } = require('../../../fixtures/fixture');

const { addToCartData, detailQuantityCases } = require('../../../test-data/cart/addToCartData');
const { lineTotal } = require('../../../utils/priceHelper');
const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

test.describe('Add to Cart Functionality', { tag: '@regression' }, () => {

    // Run as a guest instead of the shared logged-in account. The site keeps a guest
    // cart per browser session, so every test starts with its own empty cart. The
    // logged-in account's cart lives on the server and is shared by every browser
    // project, which is why the quantity checks in CartFunctionality.spec.js clash.
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ productsPage }) => {
        await productsPage.openProductsPage();
    });

    test(`TC-ADDCART-FUNC-${nextTcId()} - Verify a new guest session starts with an empty cart`, async ({ cartPage }) => {
        await cartPage.navigateToCart();
        await cartPage.verifyCartIsEmpty();
    });

    test.describe('From the Products list', () => {

        test(`TC-ADDCART-FUNC-${nextTcId()} - Verify the confirmation modal appears after clicking Add to cart`,
            { tag: '@smoke' },
            async ({ productsPage }) => {
                await productsPage.clickAddToCartByName(addToCartData.singleProduct);
                await productsPage.verifyAddToCartModalContent();
            });

        test(`TC-ADDCART-FUNC-${nextTcId()} - Verify Continue Shopping closes the modal and stays on the Products page`, async ({ productsPage }) => {
            await productsPage.clickAddToCartByName(addToCartData.singleProduct);
            await productsPage.continueShopping();

            await productsPage.verifyAddToCartModalClosed();
            await productsPage.verifyProductsPageLoaded();
        });

        test(`TC-ADDCART-FUNC-${nextTcId()} - Verify View Cart in the modal opens the cart with the added product`, async ({ productsPage, cartPage }) => {
            await productsPage.clickAddToCartByName(addToCartData.singleProduct);
            await productsPage.viewCartFromModal();

            await cartPage.verifyCartPageLoaded();
            await cartPage.verifyCartItemCount(1);
            await cartPage.verifyCartProduct(addToCartData.singleProduct);
        });

        test(`TC-ADDCART-FUNC-${nextTcId()} - Verify added product appears in cart with correct name, price, quantity and total`,
            { tag: '@smoke' },
            async ({ productsPage, cartPage }) => {
                // Arrange
                const product = addToCartData.singleProduct;
                const price = await productsPage.getProductPrice(product);

                // Act
                await productsPage.addProductToCartByName(product);
                await cartPage.navigateToCart();

                // Assert
                await cartPage.verifyCartItemCount(1);
                await cartPage.verifyCartProduct(product, { price, quantity: 1, total: price });
            });

        test(`TC-ADDCART-FUNC-${nextTcId()} - Verify multiple different products appear in cart as separate rows`, async ({ productsPage, cartPage }) => {
            // Arrange
            const products = addToCartData.multipleProducts;
            const prices = {};
            for (const name of products) {
                prices[name] = await productsPage.getProductPrice(name);
            }

            // Act
            for (const name of products) {
                await productsPage.addProductToCartByName(name);
            }
            await cartPage.navigateToCart();

            // Assert
            await cartPage.verifyCartItemCount(products.length);
            for (const name of products) {
                await cartPage.verifyCartProduct(name, { price: prices[name], quantity: 1, total: prices[name] });
            }
        });

        test(`TC-ADDCART-FUNC-${nextTcId()} - Verify adding the same product again increases its quantity in a single row`, async ({ productsPage, cartPage }) => {
            // Arrange
            const { name, timesAdded } = addToCartData.repeatedProduct;
            const price = await productsPage.getProductPrice(name);

            // Act
            for (let i = 0; i < timesAdded; i++) {
                await productsPage.addProductToCartByName(name);
            }
            await cartPage.navigateToCart();

            // Assert
            await cartPage.verifyCartItemCount(1);
            await cartPage.verifyCartProduct(name, {
                price,
                quantity: timesAdded,
                total: lineTotal(price, timesAdded),
            });
        });

        test(`TC-ADDCART-FUNC-${nextTcId()} - Verify cart contents persist after reloading the cart page`, async ({ page, productsPage, cartPage }) => {
            await productsPage.addProductToCartByName(addToCartData.singleProduct);
            await cartPage.navigateToCart();

            await page.reload();

            await cartPage.verifyCartPageLoaded();
            await cartPage.verifyCartItemCount(1);
            await cartPage.verifyCartProduct(addToCartData.singleProduct, { quantity: 1 });
        });
    });

    test.describe('From the Product Detail page', () => {

        for (const { scenario, product, quantity } of detailQuantityCases) {
            test(`TC-ADDCART-FUNC-${nextTcId()} - Verify product added from the detail page appears in cart with ${scenario}`, async ({ productsPage, productDetailPage, cartPage }) => {
                // Arrange
                await productsPage.viewProductByName(product);
                await productDetailPage.verifyProductDetailPageLoaded();
                const price = await productDetailPage.getProductPriceText();

                // Act
                await productDetailPage.setQuantity(quantity);
                await productDetailPage.addToCart();
                await productDetailPage.verifyAddToCartModal();
                await productDetailPage.viewCartFromModal();

                // Assert
                await cartPage.verifyCartPageLoaded();
                await cartPage.verifyCartItemCount(1);
                await cartPage.verifyCartProduct(product, {
                    price,
                    quantity,
                    total: lineTotal(price, quantity),
                });
            });
        }
    });
});
