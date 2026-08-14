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


module.exports = { signupUser };