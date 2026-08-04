const loginUsers = {
    validUser: {
        email: 'valid_testuser@gmail.com',
        password: 'Password123'
    },

    invalidEmail: 'invalid_user@gmail.com',
    invalidPassword: 'InvalidPassword123',

    emptyCredentials: {
        email: '',
        password: ''
    }
};


module.exports = { loginUsers };