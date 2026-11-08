const addToCartData = {
    singleProduct: 'Blue Top',

    multipleProducts: [
        'Blue Top',
        'Men Tshirt',
        'Sleeveless Dress',
    ],

    // Adding the same product again should raise its quantity, not add a second row
    repeatedProduct: { name: 'Men Tshirt', timesAdded: 3 },
};

// Quantity typed on the Product Detail page before clicking Add to cart
const detailQuantityCases = [
    { scenario: 'the default quantity of 1', product: 'Blue Top', quantity: 1 },
    { scenario: 'a quantity of 3', product: 'Sleeveless Dress', quantity: 3 },
];

module.exports = { addToCartData, detailQuantityCases };
