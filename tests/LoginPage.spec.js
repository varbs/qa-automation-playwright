const { users, generateEmail } = require('../test-data/users');
const { test, expect } = require('../fixtures/fixture');


test('TC001 - Invalid login', async ({ loginPageFixture }) => {
    await loginPageFixture.login(
        users.login.invalidEmail.email,
        users.login.invalidEmail.password
    );

    await loginPageFixture.verifyInvalidLogin();
});

test('TC002 - Valid login', async ({loginPageFixture}) => {
    await loginPageFixture.login(
        users.login.validUser.email,
        users.login.validUser.password
    );
    
    await loginPageFixture.verifyValidLogin();
});



// test('TC002 - Signup with valid credentials', async({ page }) => {
//     const signupForm = page.locator('.signup-form');
//     const accountInfo = page.locator('#form');
//     const user = {
//         firstName: 'James',
//         lastName: 'Bond',
//         email: `test${Date.now()}@gmail.com`,
//         password: 'admin123',

//         address: {
//             company: 'abcd',
//             address1: 'abcd street',
//             country: 'Canada',
//             state: 'abcd state',
//             city: 'abcd city',
//             zipcode: '12345',
//             mobile: '123456789'
//         },

//         birthDate: {
//             day: '1',
//             month: 'January',
//             year: '1999',
//     },
// };
//     const fullName = `${user.firstName} ${user.lastName}`;


//     await signupForm
//         .getByPlaceholder('Name')
//         .fill(fullName);

//     await signupForm
//         .getByPlaceholder('Email Address')
//         .fill(user.email);

//     await signupForm
//         .getByRole('button', { name: 'Signup' })
//         .click();

//     await expect(page).toHaveURL(/signup/);
//     await expect(
//         page.getByRole('heading', { name: 'Enter Account Information' })
//     ).toBeVisible();

//     //Enter Account information
//     await accountInfo.getByRole('radio', { name: 'Mr.' }).check();
//     await expect(accountInfo.locator('#name')).toHaveValue(fullName);
//     await expect(accountInfo.locator('#email')).toHaveValue(user.email);
//     await accountInfo.getByLabel('Password').fill(user.password);

//     await accountInfo.locator('#days').selectOption(user.birthDate.day);
//     await accountInfo.locator('#months').selectOption(user.birthDate.month);
//     await accountInfo.locator('#years').selectOption(user.birthDate.year);

//     await accountInfo.getByRole('checkbox', { name: 'Sign up for our newsletter!'}).check();
//     await accountInfo.getByRole('checkbox', { name: 'Receive special offers from our partners!'}).check();

//     //Enter Address Information
//     await accountInfo.getByLabel('First name').fill(user.firstName);
//     await accountInfo.getByLabel('Last name').fill(user.lastName);
//     await accountInfo.locator('#company').fill(user.address.company);
//     await accountInfo.locator('#address1').fill(user.address.address1);
//     await accountInfo.locator('#country').selectOption(user.address.country);

//     const state = accountInfo.getByLabel('state');
//     await expect(state).toBeVisible();
//     await state.fill(user.address.state);

//     await accountInfo.locator('#city').fill(user.address.city);
//     await accountInfo.locator('#zipcode').fill(user.address.zipcode);

//     //locator() multiple times in the same expression.
//     //--await page.locator('#form').locator('#zipcode').fill(user.zipcode);

//     await accountInfo.getByLabel('Mobile Number').fill(user.address.mobile);
    
//     await page.pause();

//     await accountInfo.getByRole('button', { name: 'Create Account'}).click();



//});
    
    
