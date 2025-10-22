import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where your test files live
  testDir: './vivast-tests',

  // Max test duration (200s to handle slower CI)
  timeout: 200 * 1000,

  // Run in parallel locally, sequentially in CI
  fullyParallel: !process.env.CI,

  // Prevent accidental "test.only" commits
  forbidOnly: !!process.env.CI,

  // Retry failed tests twice on CI for flakiness
  retries: process.env.CI ? 2 : 0,

  // Use 1 worker on CI to avoid race/network issues
  workers: process.env.CI ? 1 : undefined,

  // Reporters for local + CI (HTML + console)
  reporter: process.env.CI
    ? [['line'], ['html', { outputFolder: 'playwright-report' }]]
    : 'html',

  use: {
    baseURL: process.env.BASE_URL || 'http://191.101.81.124:4000',

    // Timeouts for actions/navigation
    actionTimeout: 90 * 1000,
    navigationTimeout: 60 * 1000,

    // Run headless only on CI
    headless: !!process.env.CI,

    // Standard viewport
    viewport: { width: 1280, height: 720 },

    // Screenshots & videos only on failure (useful in CI)
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Capture trace on first retry
    trace: 'on-first-retry',

    // Ignore HTTPS errors for non-prod environments
    ignoreHTTPSErrors: true,
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Optional: Run local dev server before tests (if needed)
  // webServer: {
  //   command: 'npm run start',
  //   url: process.env.BASE_URL || 'http://localhost:4000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
