const { expect } = require('@playwright/test');
const BasePage = require('../BasePage');

class ProductsPage extends BasePage {
    constructor(page) {
        super(page);

        this.productButton = this.page.getByRole('link', { name: ' Products' });
        this.productsTitle = this.page.getByRole('heading', { name: 'All Products' });

        this.productCards = this.page.locator('.features_items .col-sm-4');
        this.addToCartModal = this.page.locator('.modal-content');
        this.addToCartModalTitle = this.addToCartModal.getByText('Added!');

        this.searchInput = this.page.getByRole('textbox', { name: 'Search Product' });
        this.searchButton = this.page.locator('#submit_search');
        this.searchResultsTitle = this.page.getByRole('heading', { name: 'Searched Products' });
    }

    // Returns the product card at the specified position; defaults to the first product
    getProductCard(index = 0) {
        return this.productCards.nth(index);
    }

    async navigateToProducts() {
        await this.productButton.click();
        await this.verifyProductsPageLoaded();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyProductsPageLoaded() {
        await expect(this.page).toHaveURL(/\/products\/?$/);
        await expect(this.productsTitle).toBeVisible();
    }

    async verifyProductsAreVisible(index = 0) {
        await expect(this.getProductCard(index)).toBeVisible();
        const count = await this.productCards.count();
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
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
    }

    async verifySearchResultsVisible() {
        await expect(this.searchResultsTitle).toBeVisible();
        await expect(this.productCards.nth(0)).toBeVisible();
    }

    async verifyNoSearchResultFound() {
        await expect(this.searchResultsTitle).toBeVisible();
        await expect(this.productCards).toHaveCount(0);
    }

    async verifySearchResultsMatchKeyword(keyword) {
        // Verify at least one product card is displayed
        const count = await this.productCards.count();
        expect(count).toBeGreaterThan(0);

        // Collect all product names from the search results
        const names = [];
        for (let i = 0; i < count; i++) {
            const productName = await this.productCards
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

    async verifyProductCardImagesVisible() {
        const count = await this.productCards.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const productImage = await this.productCards
                .nth(i)
                .locator('.productinfo img');

            await expect(productImage).toBeVisible();
        }
    }

    async verifyProductNamesIsVisible() {
        const count = await this.productCards.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const productName = await this.productCards
                .nth(i)
                .locator('.productinfo p');

            await expect(productName).toBeVisible();
        }
    }

    async verifyProductPricesIsVisible() {
        const count = await this.productCards.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const productPrice = await this.productCards
                .nth(i)
                .locator('.productinfo h2');

            await expect(productPrice).toBeVisible();
        }
    }

    async verifyAddToCartButtonsIsVisible() {
        const count = await this.productCards.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const addToCartButton = await this.productCards
                .nth(i)
                .locator('.productinfo a');

            await expect(addToCartButton).toBeVisible();
        }
    }

    async verifyViewProductButtonsIsVisible() {
        const count = await this.productCards.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const viewProductButton = await this.productCards
                .nth(i)
                .locator('.choose a');

            await expect(viewProductButton).toBeVisible();
        }
    }
}

module.exports = ProductsPage;


