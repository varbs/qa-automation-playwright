require('dotenv').config();
// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },
  // Retry failed tests automatically
  retries: process.env.CI ? 2 : 0, // only retry in CI, not locally

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: true, // Required for GitHub Actions
    baseURL: 'https://automationexercise.com',
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
});