const emailFormatCases = [
    {
        scenario: 'Email missing @ symbol',
        email: 'usertest.com',
        validationType: 'browser',
    },
    {
        scenario: 'Email missing domain name',
        email: 'usertest@',
        validationType: 'browser',
    },
    {
        scenario: 'Email missing local part',
        email: '@test.com',
        validationType: 'browser',
    },
    {
        scenario: 'Email contains whitespace',
        email: 'users @test.com',
        validationType: 'browser',
    },
    {
        scenario: 'Email contains multiple @ symbols',
        email: 'users@@test',
        validationType: 'browser',
    },
        {
        scenario: 'Email missing top-level domain',
        email: 'users@test',
        validationType: 'application',
    },
]

module.exports = { emailFormatCases };