
// Variables used to generate unique email addresses for test users.
const timestamp = Date.now();
let counter = 1;

// Uses the current test run's timestamp and an incrementing counter
// to generate a unique email address each time the function is called.
function generateEmail() {
    return `test${timestamp}_${counter++}@gmail.com`;
}

const users = {

    login: {
        validUser: {
            email: 'valid_testuser@gmail.com',
            password: 'Password123'
        },

        invalidEmail: {
            email: 'invalid_user@gmail.com',
            password: 'Password123'
        },

        invalidPassword: {
            email: 'valid_user@gmail.com',
            password: 'Invalidpassword123'
        },

        emptyCredentials: {
            email: '',
            password: ''
        }
    },

    signUp: {
        validUser: {
            name: 'James Bond',

            userInfo: {
                title: 'Mrs.',
                password: 'Password123',

                dateOfBirth: {
                    day: '1',
                    month: 'January',
                    year: '1999'
                },

                firstName: 'James',
                lastName: 'Bond',

                newsletter: false,
                specialoffers: true

            },

            addressInfo: {
                company: 'abc company',
                address: 'abc street',
                address2: 'abc street second',
                country: 'Canada',
                state: 'abc state',
                city: 'abc city',
                zipCode: '123',
                mobileNum: '12345678',
            }
        },

        existingUser: {
            existingEmail: 'test_user@gmail.com'
        }



    }
}
//Export multiple things as properties of an object.
module.exports = {
    users,
    generateEmail
};