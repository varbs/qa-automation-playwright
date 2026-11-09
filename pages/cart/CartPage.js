const { expect } = require('@playwright/test');
const BasePage = require('../BasePage');

class CartPage extends BasePage {
    constructor(page) {
        super(page);

        this.cartButton = this.page.getByRole('link', { name: 'Cart' });

        this.cartItemsSection = this.page.locator('#cart_items');
        
        // represents the individual product rows
        this.cartRows = this.cartItemsSection.locator('#cart_info_table tbody tr');

        // Shown only when the cart has no products
        this.emptyCartMessage = this.cartItemsSection.locator('#empty_cart');
    }

    // Cart row whose product name link matches exactly (the image link in the row has no name)
    getCartRowByName(productName) {
        return this.cartRows.filter({
            has: this.page.getByRole('link', { name: productName, exact: true })
        });
    }

    // Checks the cart row for a product; pass only the fields you want to check.
    // toHaveText retries, so this also waits for the row to render.
    async verifyCartProduct(productName, { price, quantity, total } = {}) {
        const row = this.getCartRowByName(productName);
        await expect(row).toHaveCount(1);

        if (price !== undefined) {
            await expect(row.locator('.cart_price')).toHaveText(price);
        }
        if (quantity !== undefined) {
            await expect(row.locator('.cart_quantity')).toHaveText(String(quantity));
        }
        if (total !== undefined) {
            await expect(row.locator('.cart_total')).toHaveText(total);
        }
    }

    async verifyCartIsEmpty() {
        await expect(this.cartRows).toHaveCount(0);
        await expect(this.emptyCartMessage).toBeVisible();
        await expect(this.emptyCartMessage).toContainText('Cart is empty!');
    }

    async navigateToCart() {
        await this.cartButton.click();
        await this.verifyCartPageLoaded();
    }

    async verifyCartPageLoaded() {
        await expect(this.page).toHaveURL(/\/view_cart\/?$/);
        await expect(this.cartItemsSection).toBeVisible();

    }

    // Verify that the cart contains the expected number of items
    async verifyCartItemCount(expectedCount) {
        await expect(this.cartRows).toHaveCount(expectedCount);
    }
}

module.exports = CartPage;