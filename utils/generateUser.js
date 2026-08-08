const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

const DEFAULT_PASSWORD = 'TestPassword123';

const generateRandomName = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        firstName, 
        lastName,
        name: `${firstName} ${lastName}`
    };
};

// Generates a unique email address for test users.
// The optional prefix allows different email types.
const generateSignupUser = (prefix = 'test_user') => {
    const { firstName, lastName, name } = generateRandomName();

    return{ 
        firstName,
        lastName,
        name,
        email: `${prefix}_${uuidv4().slice(0, 8)}@automation-exercise.com`,
        password: DEFAULT_PASSWORD,
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        mobile: faker.phone.number()
    };
};

// Generates a unique user that is not registered.
const generateNonExistingUser = () => {
    const { email } = generateSignupUser('nonexisting');
    return {
        // Example: nonexisting_a1b2c3d4@automation-exercise.com
        email,
        password: DEFAULT_PASSWORD
    };
};


module.exports = { generateNonExistingUser, generateSignupUser, generateRandomName };