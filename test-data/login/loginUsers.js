const loginUsers = {
    validUser: {
        email: process.env.LOGIN_EMAIL,
        password: process.env.LOGIN_PASSWORD,
    },

    incorrectPassword: {
        password: 'IncorrectPassword123',

    },

    emptyCredentials: {
        email: '',
        password: ''
    }
};


module.exports = { loginUsers };