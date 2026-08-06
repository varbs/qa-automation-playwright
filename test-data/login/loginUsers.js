const loginUsers = {
    validUser: {
        email: 'valid_testuser@gmail.com',
        password: 'Password123'
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