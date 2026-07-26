const { test, chromium } = require('@playwright/test');

test('Live Automation', async () => {
    // Connect to an existing Chrome instance
    const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');

    const context = browser.contexts()[0];

    let page = context.pages()[0];

    // Create a new tab if none exists or the first one is closed
    if (!page || page.isClosed()) {
        page = await context.newPage();
    }

    await page.goto('https://automationexercise.com/');
   
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    
    //Login with invalid credentials
    const loginForm = page.locator('form').filter({ hasText: 'Login' });
    await loginForm
        .getByPlaceholder('Email Address')
        .fill('test@gmail.com');

    await loginForm
        .getByPlaceholder('Password')
        .fill('admin123');

    await loginForm
        .getByRole('button', { name: 'Login' })
        .click();

    await page.getByText('Your email or password is incorrect').toBeVisible();


    //Sign up with valid credentials
    const signupForm = page.locator('form').filter({ hasText: 'New User Signup!'});

    await signupForm
        .getByPlaceholder('Name')
        .fill('James Bond');

    await signupForm
        .getByPlaceholder('Email Address')
        .fill('test_admin@gmail.com');

    await signupForm
        .getByRole('button', {name: 'Signup'})
        .click();
    
    
        
    
    


    //await page.pause();
});