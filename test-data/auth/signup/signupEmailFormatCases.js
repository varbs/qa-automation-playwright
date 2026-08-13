const { VALIDATION_TYPES } = require('../../../constant/validationTypes');

const signupEmailFormatCases = [
    {
        scenario: 'Email missing @ symbol',
        email: 'usertest.com',
        validationType: VALIDATION_TYPES.BROWSER,
    },
    {
        scenario: 'Email missing domain name',
        email: 'usertest@',
        validationType: VALIDATION_TYPES.BROWSER,
    },
    {
        scenario: 'Email missing local part',
        email: '@test.com',
        validationType: VALIDATION_TYPES.BROWSER,
    },
    {
        scenario: 'Email contains whitespace',
        email: 'users @test.com',
        validationType: VALIDATION_TYPES.BROWSER,
    },
    {
        scenario: 'Email contains multiple @ symbols',
        email: 'users@@test',
        validationType: VALIDATION_TYPES.BROWSER,
    },
    {
        scenario: 'Email missing top-level domain',
        email: 'test_users@test',
        validationType: VALIDATION_TYPES.PROCEED,
    },
]

module.exports = { signupEmailFormatCases };