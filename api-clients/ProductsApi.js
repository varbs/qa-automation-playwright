async function readResponse(response) {
    return {
        status: response.status(),
        body: await response.json()
    };
}

class ProductsApi {
    constructor(request) {
        this.request = request;
        this.productsUrl = '/api/productsList';
        this.brandsUrl = '/api/brandsList';
        this.searchUrl = '/api/searchProduct';
    }

    async getAllProducts() {
        return readResponse(await this.request.get(this.productsUrl));
    }

    async postToProductsList() {
        return readResponse(await this.request.post(this.productsUrl));
    }

    async getAllBrands() {
        return readResponse(await this.request.get(this.brandsUrl));
    }

    async putToBrandsList() {
        return readResponse(await this.request.put(this.brandsUrl));
    }

    async searchProduct({ term } = {}) {
        const options = term === undefined
            ? {}
            : { form: { search_product: term } };
        return readResponse(
            await this.request.post(this.searchUrl, options));
    }
}

module.exports = { ProductsApi};

