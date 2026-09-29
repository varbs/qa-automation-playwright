const productTestData = {
    singleProduct: 'Blue Top',

    multipleProducts: [
        'Blue Top',
        'Pure Cotton V-Neck T-Shirt',
        'Soft Stretch Jeans',
    ],
};

const productScenarios = [
    {
        description: 'single product',
        products: [productTestData.singleProduct]
    },
    {
        description: 'multiple products',
        products: productTestData.multipleProducts
    }
];

const cartVerificationScenarios = [
    {
        description: 'correct name',
        product: productTestData.singleProduct,
        expectedQuantity: 1,
        verifyPrice: false
    },
    {
        description: 'correct price',
        product: productTestData.singleProduct,
        expectedQuantity: 1,
        verifyPrice: true
    },
    {
        description: 'correct quantity',
        product: productTestData.singleProduct,
        expectedQuantity: 1,
        verifyPrice: false
    }
]



module.exports = { productTestData, productScenarios, cartVerificationScenarios };