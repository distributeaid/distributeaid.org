import { expect, test } from '@playwright/test'
import { checkForConsoleErrors } from './lib/checkForConsoleErrors.js'
import { baseUrl } from './lib/testHost'
const it = test

test.afterEach(checkForConsoleErrors)

const base = baseUrl()
const regionsUrl = new URL('/regions', base).toString()

test.describe('Regions', () => {
  it('should should have the correct title', async ({ page }) => {
    await page.goto(regionsUrl)
    await expect(page).toHaveTitle('Regions · Distribute Aid')
  })

  it('should have a link to a region', async ({ page }) => {
    await page.goto(regionsUrl)

    const regionButton = page.locator(
      'data-testid=card >> :scope:has-text("Balkans") >> a:has-text("View Region")',
    )

    await regionButton.click()

    await expect(page).toHaveURL(
      new URL('/regions/the-balkans', base).toString(),
    )

    await expect(page).toHaveTitle('Region: The Balkans · Distribute Aid')
  })

  it('should have a link to subregions', async ({ page }) => {
    await page.goto(regionsUrl)

    const subregionLink = page.locator(
      'data-testid=card >> :scope:has-text("Balkans") >> a:has-text("Serbia")',
    )

    await subregionLink.click()

    await expect(page).toHaveURL(
      new URL('/regions/the-balkans/serbia', base).toString(),
    )

    await expect(page).toHaveTitle(
      'Subregion: Serbia (The Balkans) · Distribute Aid',
    )
  })
})

test.describe('Region', () => {
  const greekRegion = new URL('/regions/greece', base).toString()

  it('should should have the correct title', async ({ page }) => {
    await page.goto(greekRegion)
    await expect(page).toHaveTitle('Region: Greece · Distribute Aid')
  })

  it('should have a link to a subregion', async ({ page }) => {
    await page.goto(greekRegion)

    const subregionLink = page.locator('a:has-text("Aegean Islands")')

    await subregionLink.click()

    await expect(page).toHaveURL(
      new URL('/regions/greece/aegean-islands', base).toString(),
    )

    await expect(page).toHaveTitle(
      'Subregion: Aegean Islands (Greece) · Distribute Aid',
    )
  })
})

test.describe('Subregion', () => {
  const beirutSubregion = new URL('/regions/lebanon/beirut', base).toString()

  it('should should have the correct title', async ({ page }) => {
    await page.goto(beirutSubregion)
    await expect(page).toHaveTitle(
      'Subregion: Beirut (Lebanon) · Distribute Aid',
    )
  })

  it('should have a link to the region', async ({ page }) => {
    await page.goto(beirutSubregion)

    const regionLink = page.locator('main >> a:has-text("Lebanon")')

    await regionLink.click()

    await expect(page).toHaveURL(new URL('/regions/lebanon', base).toString())

    await expect(page).toHaveTitle('Region: Lebanon · Distribute Aid')
  })
})
