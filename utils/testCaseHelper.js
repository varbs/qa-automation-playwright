const getTestCaseId = (start, index) =>
    String(start + index).padStart(3, '0');

module.exports = {
    getTestCaseId,
};