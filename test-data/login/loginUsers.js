const loginUsers = {
    validUser: {
        email: process.env.LOGIN_EMAIL,
        password: process.env.LOGIN_PASSWORD,
    },

    invalidUser: {
        email: 'invalid_user@gmail.com',
        password: 'InvalidPassword123'
    },

    emptyCredentials: {
        email: '',
        password: ''
    }
};


module.exports = { loginUsers };