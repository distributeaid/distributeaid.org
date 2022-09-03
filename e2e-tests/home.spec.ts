import { expect, test } from '@playwright/test'
import { checkForConsoleErrors } from './lib/checkForConsoleErrors.js'
import { assertUrlCanBeNavigated } from './lib/assertUrlCanBeNavigated'
import { baseUrl } from './lib/testHost'
const it = test

test.afterEach(checkForConsoleErrors)

const base = baseUrl()

test.describe('Home', () => {
  it('should should have the correct title', async ({ page }) => {
    await page.goto(base)
    await expect(page).toHaveTitle('Home - Distribute Aid')
  })

  it('should have a link to the France route', async ({ page }) => {
    await page.goto(base)
    const franceRouteButton = page.locator('text=Ship aid to France!')
    const path = await franceRouteButton.getAttribute('href')
    expect(path).toEqual('/routes/uk-to-france/')
    await assertUrlCanBeNavigated(
      page,
      new URL(path as string, base).toString(),
    )
  })

  it('should have a link to the Lebanon route', async ({ page }) => {
    await page.goto(base)
    const lebanonRouteButton = page.locator('text=Ship aid to Lebanon!')
    const path = await lebanonRouteButton.getAttribute('href')
    expect(path).toEqual('/routes/uk-to-lebanon/')
    await assertUrlCanBeNavigated(
      page,
      new URL(path as string, base).toString(),
    )
  })
})
