//"Import the test function from the Playwright package so I can use it."
const {test, expect} = require('@playwright/test');



test('Browser Context Playwright test', async({browser}) =>
{
    //Create a new, clean browser session.
    const context = await browser.newContext();
    //Open a new tab in that browser session.
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //variables to store the locators for the username, password, sign-in button, and card titles.
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a")

    //Enter the username and password, click the sign-in button, and check for an error message.
    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signInButton.click();
    console.log(await page.locator("[style*='display: block']").textContent());
    await expect(page.locator("[style*='display: block']")).toContainText('Incorrect');

    //clear the username field and enter the correct username.
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInButton.click();

    //get the first card title and print it to the console.
    //console.log(await cardTitles.first().textContent());
    //get the second card title and print it to the console.
    //console.log(await cardTitles.nth(1).textContent());
    //get all the card titles and print them to the console.
    //await expect(cardTitles.first()).toBeVisible();
    await page.waitForLoadState('networkidle'); //not working, returning empty array
    await cardTitles.first().waitFor(); //working, returning the first card title
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


    //This is an alternative way to fill in the username and password fields and click the sign-in button using the getByLabel and getByRole methods.
    /** 
    await page.getByLabel("Username").fill("rahulshetty");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Sign In" }).click();
    **/


});

test.only('UI controls', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const dropdown = page.locator("select.form-control");
    const signInButton = page.locator("#signInBtn");

    await page.getByLabel("Username").fill("rahulshettyacademy"); 
    await page.getByLabel("Password").fill("Learning@830$3mK2");
    await dropdown.selectOption("teach");
    //await page.locator(".radiotextsty").last().click();
    await page.locator("[value='use']").click();
    await page.getByRole("button", { name: "Okay" }).click();
    //console.log(await expect(page.locator(".radiotextty").last().isChecked()));

    //pause the test execution to inspect the page and its elements. Will open playwright inpector in the browser and allow you to interact with the page and see the state of the elements.
    //await page.pause();



});
