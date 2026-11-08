const { test } = require('../../../fixtures/fixture');

const { createTcCounter } = require('../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

// Add-to-cart scenarios live in AddToCartFunctionality.spec.js, which runs in guest
// sessions so each test has its own cart. Tests here use the shared logged-in account,
// whose cart is stored on the server, so keep them read-only.
test.describe('Cart Functionality', { tag: '@regression' }, () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePage();
    });

    test(`TC-CART-FUNC-${nextTcId()} - Verify user can navigate to the Cart page`, async ({ cartPage }) => {
        await cartPage.navigateToCart();
    });
});
