import { devices, PlaywrightTestConfig } from '@playwright/test'
import * as path from 'path'

const isCI = process.env.CI !== undefined

const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, 'e2e-tests'),
  forbidOnly: isCI,
  timeout: 60000, // milliseconds
  retries: isCI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}

export default config
