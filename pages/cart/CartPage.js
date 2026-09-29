const { expect } = require('@playwright/test');
const BasePage = require('../BasePage');

class CartPage extends BasePage {
    constructor(page) {
        super(page);

        this.cartButton = this.page.getByRole('link', { name: 'Cart' });

        this.cartItemsSection = this.page.locator('#cart_items');
        
        // represents the individual product rows
        this.cartRows = this.cartItemsSection.locator('#cart_info_table tbody tr');

        this.cartProductNames = this.cartItemsSection.locator('.cart_description a');
        this.cartProductPrice = this.cartItemsSection.locator('.cart_price p');
        this.cartProductQuantity = this.cartItemsSection.locator('.cart_quantity button');
        this.deleteButtons = this.cartItemsSection.locator('.cart_quantity_delete');
    }

    async navigateToCart() {
        await this.cartButton.click();
        await this.verifyCartPageLoaded();
    }

    async clearCart() {
        await this.navigateToCart();
        await this.page.waitForLoadState('networkidle');

        let count = await this.deleteButtons.count();

        while (count > 0) {
            const firstButton = this.deleteButtons.first();
            await firstButton.scrollIntoViewIfNeeded();
            await firstButton.click({ force: true }); // ← force bypasses overlay/ad blocks
            await expect(this.cartRows).toHaveCount(count - 1, { timeout: 10000 });
            count = await this.deleteButtons.count();
        }

        await expect(this.cartRows).toHaveCount(0, { timeout: 10000 });
    }

    async verifyCartPageLoaded() {
        await expect(this.page).toHaveURL(/\/view_cart\/?$/);
        await expect(this.cartItemsSection).toBeVisible();

    }

    // Verify that the cart contains the expected number of items
    async verifyCartItemCount(expectedCount) {
        await expect(this.cartRows).toHaveCount(expectedCount);
    }

    async verifyCartProductName(expectedName) {
        // Get the number of product names currently displayed in the cart
        const count = await this.cartProductNames.count();

        // Create an array to store the actual product names from the cart
        const productNames = [];

        // Loop through each product in the cart
        for (let i = 0; i < count; i++) {
            // Get the product name text and remove any extra whitespace
            const productName = await this.cartProductNames.nth(i).textContent();
            productNames.push(productName.trim());
        }

        // Verify that the expected product name exists in the cart
        expect(productNames).toContain(expectedName.trim());
    }

    async verifyCartProductPrice(expectedName, expectedPrice) {
        const count = await this.cartRows.count();

        for (let i = 0; i < count; i++) {
            const productName = await this.cartProductNames.nth(i).textContent();

            // Check if the current product matches the expected product name
            if (productName.trim() === expectedName.trim()) {
                // Get the price of the matching product
                const productPrice = await this.cartProductPrice.nth(i).textContent();

                // Verify that the product price matches the expected price
                expect(productPrice.trim()).toBe(expectedPrice.trim());

                // Stop the method after finding and verifying the product
                return;
            }
        }

        // Throw an error if the expected product was not found in the cart
        throw new Error(`Product "${expectedName}" not found in the cart`);
    }

    async verifyCartProductQuantity(expectedName, expectedQuantity) {
        const rows = await this.cartRows.count();

        for (let i = 0; i < rows; i++) {
            const name = await this.cartProductNames.nth(i).innerText();

            // Check if the current product matches the expected product name
            if (name.trim() === expectedName.trim()) {
                const quantity = await this.cartProductQuantity.nth(i).innerText();

                // Convert the quantity from text to a number and verify it matches the expected quantity
                expect(Number(quantity.trim())).toBe(expectedQuantity);
                return;
            }
        }

        // Throw an error if the expected product was not found in the cart
        throw new Error(`Product "${expectedName}" not found in cart`);
    }
}

module.exports = CartPage;