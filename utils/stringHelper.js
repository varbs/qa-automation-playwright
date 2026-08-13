function addWhitespace(value, leadingSpaces = 0, trailingSpaces = 0) {
    return (
        ' '.repeat(leadingSpaces) +
        value +
        ' '.repeat(trailingSpaces)
    );
}

module.exports = {
    addWhitespace
};