require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

const BROWSERS = [
  { name: 'chromium', device: 'Desktop Chrome' },
  { name: 'firefox', device: 'Desktop Firefox' },
  { name: 'webkit', device: 'Desktop Safari' },
  { name: 'edge', device: 'Desktop Edge', channel: 'msedge' },
  { name: 'chrome', device: 'Desktop Chrome', channel: 'chrome' },
];

const sharedUse = {
  headless: true,
  baseURL: 'https://automationexercise.com',
  screenshot: 'on',
  trace: 'retain-on-failure',
};

const LOGGED_OUT_SUITES = [
  '**/01_Login/**',
  '**/02_Signup/**',
  '**/03_AccountDeletion/**',
  '**/04_Logout/**',
];

const LOGGED_IN_SUITES = [
  '**/05_Products/**',
  '**/06_Cart/**',
  '**/07_ContactUs/**',
];

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  retries: process.env.CI ? 2 : 1,
  reporter: 'html',
  globalSetup: './global-setup.js',

  // e.g. "logged-out-chromium", "logged-in-edge"
  projects: BROWSERS.flatMap(({ name, device, channel }) => {
    const base = { ...devices[device], ...(channel && { channel }), ...sharedUse };
    return [
      { name: `logged-out-${name}`, testMatch: LOGGED_OUT_SUITES, use: base },
      {
        name: `logged-in-${name}`,
        testMatch: LOGGED_IN_SUITES,
        use: { ...base, storageState: '.auth/session.json' },
      },
    ];
  }),
});