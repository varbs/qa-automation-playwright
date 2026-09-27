const { expect } = require('@playwright/test');
const BasePage = require('../BasePage');

class ProductsDetailPage extends BasePage {
    constructor(page) {
        super(page);

        this.productInformation = this.page.locator('.product-information');
        this.productName = this.productInformation.locator('h2');
        this.productCategory = this.productInformation.getByText('Category');
        this.productPrice = this.productInformation.locator('span span');
        this.productAvailability = this.productInformation.getByText('Availability:');
        this.productCondition = this.productInformation.getByText('Condition:');
        this.productBrand = this.productInformation.getByText('Brand:');

        this.addToCartButton = this.productInformation.getByRole('button', { name: 'Add to cart' });
        this.addToCartModal = this.page.locator('.modal-content');
        this.addToCardModalTitle = this.addToCartModal.getByText('Added!');

        this.quantityInput = this.productInformation.getByRole('spinbutton');
    }


    async verifyProductDetailPageLoaded() {
        await this.page.waitForURL(/\/product_details\/\d+/);
        await expect(this.productInformation).toBeVisible();
    }

    async verifyProductName() {
        await expect(this.productName).toBeVisible();
        await expect(this.productName).not.toHaveText('');
    }

    async verifyProductCategory() {
        await expect(this.productCategory).toBeVisible();
        await expect(this.productCategory).not.toHaveText('');
    }

    async verifyProductPrice() {
        await expect(this.productPrice).toBeVisible();
        await expect(this.productPrice).not.toHaveText('');
    }

    async verifyProductAvailability() {
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productAvailability).not.toHaveText('');
    }

    async verifyProductCondition() {
        await expect(this.productCondition).toBeVisible();
        await expect(this.productCondition).not.toHaveText('');
    }

    async verifyProductBrand() {
        await expect(this.productBrand).toBeVisible();
        await expect(this.productBrand).not.toHaveText('');
    }

    // Fill the quantity input with the specified quantity as a string
    async setQuantity(quantity) {
        await this.quantityInput.clear();
        await this.quantityInput.fill(String(quantity));
    }

    // Press the ArrowUp key the specified number of times to increase the quantity
    async incrementQuantity(times = 1) {
        for (let i = 0; i < times; i++) {
            await this.quantityInput.press('ArrowUp');
        }
    }

    // Press the ArrowDown key the specified number of times to decrease the quantity
    async decrementQuantity(times = 1) {
        for (let i = 0; i < times; i++) {
            await this.quantityInput.press('ArrowDown');
        }
    }

    async verifyQuantity(expected) {
        const quantity = await this.quantityInput.inputValue();

        // Verify the quantity is set to 3
        expect(Number(quantity)).toBe(expected);
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async verifyAddToCartModal() {
        await expect(this.addToCartModal).toBeVisible();
        await expect(this.addToCardModalTitle).toBeVisible();
    }

}

module.exports = ProductsDetailPage;


