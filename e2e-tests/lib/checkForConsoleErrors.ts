import { Page } from '@playwright/test'

/**
 * There should be no errors in the console.
 */
export const checkForConsoleErrors = async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  page.on('pageerror', (error) => {
    process.emit('uncaughtException', error)
  })
}
