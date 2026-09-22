const {test} = require('../../../../../fixtures/fixture');

const { generateSignupUser } = require('../../../../../utils/generateUser');
const { createTcCounter } = require('../../../../../utils/testCaseHelper');
const nextTcId = createTcCounter();

// test.describe('Account Information Required Validation', () => {

//     let user;
//     test.beforeEach(async ({ signupPage, accountInfoPage }) => {
//         user = generateSignupUser();
//         await signupPage.signup(user.email, user.name);
//         await accountInfoPage.verifyAccountInfoPageLoaded();
//     })
//});