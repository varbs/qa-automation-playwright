// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  //global timeout for all tests
  timeout: 30 *1000,
  //expect block timeout
  expect:
  {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    //headless: true,
  },

});

module.exports = config

