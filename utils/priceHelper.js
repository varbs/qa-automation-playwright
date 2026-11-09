// The site shows prices as "Rs. 500".

// "Rs. 500" -> 500
// Matches the number only, so the dot in "Rs." is not read as a decimal point
function parsePrice(priceText) {
    const match = priceText.replace(/,/g, '').match(/\d+(\.\d+)?/);
    if (!match) {
        throw new Error(`Could not read a price from "${priceText}"`);
    }
    return Number(match[0]);
}

// 500 -> "Rs. 500"
function formatPrice(amount) {
    return `Rs. ${amount}`;
}

// Expected cart line total for a unit price text and a quantity: ("Rs. 500", 3) -> "Rs. 1500"
function lineTotal(priceText, quantity) {
    return formatPrice(parsePrice(priceText) * quantity);
}

module.exports = { parsePrice, formatPrice, lineTotal };
