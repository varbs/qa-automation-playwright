const { expect } = require('@playwright/test');
const BasePage = require('../BasePage');

class ProductsPage extends BasePage {
    constructor(page) {
        super(page);

        this.productButton = this.page.getByRole('link', { name: ' Products' });
        this.productsTitle = this.page.getByRole('heading', { name: 'All Products' });

        this.productsCard = this.page.locator('.features_items .col-sm-4');
        this.addToCartModal = this.page.locator('.modal-content');
        this.addToCartModalTitle = this.addToCartModal.getByText('Added!');
    }

    getProductCard(index = 0) {
        return this.productsCard.nth(index);
    }


    async verifyProductsPageLoaded() {
        await expect(this.page).toHaveURL(/\/products\/?$/);
        await expect(this.productsTitle).toBeVisible();
    }

    async navigateToProducts() {
        await this.productButton.click();
        await this.verifyProductsPageLoaded();
    }

    async verifyProductsAreVisible(index = 0) {
        await expect(this.getProductCard(index)).toBeVisible();
        const count = await this.productsCard.count();
        expect(count).toBeGreaterThan(0);
    }

    async clickProduct(index = 0) {
        const product = this.getProductCard(index);

        await product.hover();
        await product.getByText('View Product').click();
    }

    async addToCartFromList(index = 0) {
        const product = this.getProductCard(index);

        await product.hover();
        await product.locator('.add-to-cart').first().click();
    }

    async verifyAddToCartModalVisible() {
        await expect(this.addToCartModal).toBeVisible();
        await expect(this.addToCartModalTitle).toBeVisible();
    }
}

module.exports = ProductsPage;


