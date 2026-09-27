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

        this.searchInput = this.page.getByRole('textbox', { name: 'Search Product' });
        this.searchButton = this.page.locator('#submit_search');
        this.searchResultsTitle = this.page.getByRole('heading', { name: 'Searched Products' });
    }

    // Returns the product card at the specified position; defaults to the first product
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

    async searchProduct(keyword) {
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
    }

    async verifySearchResultsVisible() {
        await expect(this.searchResultsTitle).toBeVisible();
        await expect(this.productsCard.nth(0)).toBeVisible();
    }

    async verifyNoSearchResultFound() {
        await expect(this.searchResultsTitle).toBeVisible();
        await expect(this.productsCard).toHaveCount(0);
    }

    async verifySearchResultsMatchKeyword(keyword) {
        // Verify at least one product card is displayed
        const count = await this.productsCard.count();
        expect(count).toBeGreaterThan(0);

        // Collect all product names from the search results
        const names = [];
        for (let i = 0; i < count; i++) {
            const productName = await this.productsCard
                .nth(i)
                .locator('.productinfo p')
                .first()
                .textContent();
            names.push(productName.toLowerCase());
        }

        // Verify at least one result contains the search keyword
        // The site may return related products alongside exact matches
        const hasMatch = names.some(name => name.includes(keyword.toLowerCase()));
        expect(hasMatch).toBe(true);
    }
}

module.exports = ProductsPage;


