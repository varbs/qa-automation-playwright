require('dotenv').config();
const { chromium } = require('@playwright/test');
const fs = require('fs');

module.exports = async () => {
  if (!fs.existsSync('.auth')) {
    fs.mkdirSync('.auth');
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://automationexercise.com/login');
  await page.locator('[data-qa="login-email"]').fill(process.env.LOGIN_EMAIL);
  await page.locator('[data-qa="login-password"]').fill(process.env.LOGIN_PASSWORD);
  await page.locator('[data-qa="login-button"]').click();
  await page.waitForURL('https://automationexercise.com/');

  await page.context().storageState({ path: '.auth/session.json' });
  await browser.close();

  console.log('✅ Global setup complete — session saved to .auth/session.json');
};