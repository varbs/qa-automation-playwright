const { signupCountries } = require('./signupCountries');

const signupUser = {
    validUser: {
        email: process.env.LOGIN_EMAIL
    },
    emptyCredentials: {
        name: '',
        email: '',
    },

    updatedUser: {
        firstName: 'James',
        lastName: 'Bond'
    }
};

const getRequiredFields = (user) => ({
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    address1: user.address1,
    country: signupCountries.australia,
    state: user.state,
    city: user.city,
    zipCode: user.zipCode,
    mobile: user.mobile,
});


module.exports = { signupUser, getRequiredFields };