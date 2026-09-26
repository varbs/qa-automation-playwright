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
        



    }


   async verifyProductDetailPageLoaded(){
        await this.page.waitForURL(/\/product_details\/\d+/);
        await expect(this.productInformation).toBeVisible();
   }

   async verifyProductName(){
        await expect(this.productName).toBeVisible();
        await expect(this.productName).not.toHaveText('');
   }

   async verifyProductCategory(){
        await expect(this.productCategory).toBeVisible();
        await expect(this.productCategory).not.toHaveText('');
   }

   async verifyProductPrice(){
        await expect(this.productPrice).toBeVisible();
        await expect(this.productPrice).not.toHaveText('');
   }

   async verifyProductAvailability(){
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productAvailability).not.toHaveText('');
   }

   async verifyProductCondition(){
        await expect(this.productCondition).toBeVisible();
        await expect(this.productCondition).not.toHaveText('');
   }

   async verifyProductBrand(){
        await expect(this.productBrand).toBeVisible();
        await expect(this.productBrand).not.toHaveText('');
   }

   async addToCart(){
        await this.addToCartButton.click();
   }

   async verifyAddToCartModal(){
        await expect(this.addToCartModal).toBeVisible();
        await expect(this.addToCardModalTitle).toBeVisible();
   }
   
}

module.exports = ProductsDetailPage;


