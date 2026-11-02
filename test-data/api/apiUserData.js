const DEFAULT_PASSWORD = "Test@12345";

function buildApiUser({ email, password, name, city } = {}) {
    return {
        name: name || 'Test User',
        email: email || `tester${Date.now()}${Math.floor(Math.random() * 1000)}@example.com`,
        password: password || DEFAULT_PASSWORD,
        title: 'Mr',
        birth_date: '15',
        birth_month: '6',
        birth_year: '1995',
        firstname: 'Test',
        lastname: 'User',
        company: 'Practice Co',
        address1: '123 Sample Street',
        address2: 'Unit 4',
        country: 'Philippines',
        zipcode: '1000',
        state: 'Metro Manila',
        city: city || 'Manila',
        mobile_number: '0000000000',
    };
}

module.exports = { buildApiUser };