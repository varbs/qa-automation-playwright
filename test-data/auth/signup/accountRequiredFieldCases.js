const accountRequiredFieldCases = [
    {
        field: 'Name',
        clear: async (accountInfoPage) => await accountInfoPage.editName(''),
        getLocator: (accountInfoPage) => accountInfoPage.name
    },
    {
        field: 'Password',
        clear: async (accountInfoPage) => await accountInfoPage.enterPassword(''),
        getLocator: (accountInfoPage) => accountInfoPage.password
    },
    {
        field: 'First Name',
        clear: async (accountInfoPage) => await accountInfoPage.enterFirstName(''),
        getLocator: (accountInfoPage) => accountInfoPage.firstName
    },
    {
        field: 'Last Name',
        clear: async (accountInfoPage) => await accountInfoPage.enterLastName(''),
        getLocator: (accountInfoPage) => accountInfoPage.lastName
    },
    {
        field: 'Address',
        clear: async (accountInfoPage) => await accountInfoPage.fillAddress('', ''),
        getLocator: (accountInfoPage) => accountInfoPage.address
    },
    {
        field: 'State',
        clear: async (accountInfoPage) => await accountInfoPage.enterState(''),
        getLocator: (accountInfoPage) => accountInfoPage.state
    },
    {
        field: 'City',
        clear: async (accountInfoPage) => await accountInfoPage.enterCity(''),
        getLocator: (accountInfoPage) => accountInfoPage.city
    },
    {
        field: 'Zipcode',
        clear: async (accountInfoPage) => await accountInfoPage.enterZipCode(''),
        getLocator: (accountInfoPage) => accountInfoPage.zipCode        
    },
    {
        field: 'Mobile Number',
        clear: async (accountInfoPage) => await accountInfoPage.enterMobile(''),
        getLocator: (accountInfoPage) => accountInfoPage.mobileNumber   
    }
];

module.exports = { accountRequiredFieldCases }