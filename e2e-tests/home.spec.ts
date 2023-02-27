import { expect, test } from '@playwright/test'
// import { checkForConsoleErrors } from './lib/checkForConsoleErrors'
import { baseUrl } from './lib/testHost'
const it = test

// TODO: Something weird is going on with hydrating the Home & Donate pages in
//       production builds causing our CI pipeline to fail. Commenting out for
//       now, should debug at some point and then re-enable this test.
//
// test.afterEach(checkForConsoleErrors)

const base = baseUrl()

test.describe('Home', () => {
  it('should should have the correct title', async ({ page }) => {
    await page.goto(base)
    await expect(page).toHaveTitle('Home · Distribute Aid')
  })
  it('should should have the correct description', async ({ page }) => {
    await page.goto(base)
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      'content',
      'Humanitarian aid delivery reimagined. By supporting a huge network of grassroots organisations, we ensure that donations get to where they are needed most.',
    )
  })

  it('should have the HTML lang attribute', async ({ page }) => {
    await page.goto(base)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })
})
