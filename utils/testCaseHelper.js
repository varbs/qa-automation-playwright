const getTestCaseId = (start, index) =>
    String(start + index).padStart(3, '0');

// New addition — creates an independent counter each time it's called
function createTcCounter() {
    let tcCounter = 0;
    return () => String(++tcCounter).padStart(3, '0');
}

module.exports = {
    getTestCaseId, createTcCounter
};