const signupUser = {
    validUser: {
        email: process.env.LOGIN_EMAIL
    },
    emptyCredentials: {
        name: '',
        email: '',
    }
};


module.exports = { signupUser };