
const emailWhitespaceCases = [
    {
        scenario: 'containing leading spaces',
        leadingSpaces: 1,
        trailingSpaces: 0,
    },
    {
        scenario: 'containing trailing spaces',
        leadingSpaces: 0,
        trailingSpaces: 1,
    },
    {
        scenario: 'containing both leading and trailing spaces',
        leadingSpaces: 1,
        trailingSpaces: 1,
    },
];

module.exports = { emailWhitespaceCases };