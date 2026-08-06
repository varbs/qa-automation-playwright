const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');


function generateSignupUser() {
    return {
        name: faker.person.fullName(),
        email: `user_${uuidv4().slice(0, 8)}@example.com`
    };
}

module.exports = { generateSignupUser };