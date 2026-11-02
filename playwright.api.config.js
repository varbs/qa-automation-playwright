const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/api',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report-api', open: 'never' }]],

  use: {
    baseURL: 'https://automationexercise.com',
  },
});