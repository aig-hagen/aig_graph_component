import { fileURLToPath, URL } from 'node:url'
import { defineConfig, devices } from '@playwright/experimental-ct-vue';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__snapshots__',
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Record trace for each test. When test run passes, remove the recorded trace
    // See https://playwright.dev/docs/api/class-testoptions#test-options-trace
    // See https://playwright.dev/docs/trace-viewer for how to view traces
    trace: 'retain-on-failure',

    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,

    // At this point, Playwright is bundler-agnostic, so it is not reusing your existing Vite config.
    // Your config might have a lot of things we won't be able to reuse.
    // So for now, you would copy your path mappings and other high level settings into the `ctViteConfig` property of Playwright config.
    // See https://playwright.dev/docs/test-components#how-do-i-access-the-components-methods-or-its-instance
    ctViteConfig: {
      resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ],
});
