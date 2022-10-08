import { expect, test } from '@playwright/test'
import { checkForConsoleErrors } from './lib/checkForConsoleErrors'
import { baseUrl } from './lib/testHost'
const it = test

test.afterEach(checkForConsoleErrors)

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

  it('should have a link to the France route', async ({ page }) => {
    await page.goto(base)

    const franceRouteButton = page.locator('text=Ship aid to France!')

    await franceRouteButton.click()

    await expect(page).toHaveURL(
      new URL('/routes/uk-to-france/', base).toString(),
    )

    await expect(page).toHaveTitle('Route: UK to France · Distribute Aid')
  })

  it('should have a link to the Lebanon route', async ({ page }) => {
    await page.goto(base)

    const lebanonRouteButton = page.locator('text=Ship aid to Lebanon!')

    await lebanonRouteButton.click()

    await expect(page).toHaveURL(
      new URL('/routes/uk-to-lebanon/', base).toString(),
    )

    await expect(page).toHaveTitle('Route: UK to Lebanon · Distribute Aid')
  })
})
