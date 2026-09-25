require('dotenv').config();
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  globalSetup: './global-setup.js',

  projects: [
    {
      name: 'logged-out',
      testMatch: [
        '**/01_Login/**',
        '**/02_Signup/**',
        '**/03_AccountDeletion/**',
        '**/04_Logout/**',
      ],
      use: {
        browserName: 'chromium',
        headless: true,
        baseURL: 'https://automationexercise.com',
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'logged-in',
      testMatch: [
        '**/05_Products/**',
        '**/06_Cart/**',
        '**/07_ContactUs/**',
      ],
      use: {
        browserName: 'chromium',
        headless: true,
        baseURL: 'https://automationexercise.com',
        screenshot: 'on',
        trace: 'retain-on-failure',
        storageState: '.auth/session.json',
      },
    },
  ],
});