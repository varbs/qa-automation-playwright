
const nameWhitespaceCases = [
    {
        scenario: 'leading spaces',
        leadingSpaces: 1,
        trailingSpaces: 0,
    },
    {
        scenario: 'trailing spaces',
        leadingSpaces: 0,
        trailingSpaces: 1,
    },
    {
        scenario: 'both leading and trailing spaces',
        leadingSpaces: 1,
        trailingSpaces: 1,
    },
];

module.exports = { nameWhitespaceCases };