import { expect, Page, test } from '@playwright/test'
import { checkForConsoleErrors } from './lib/checkForConsoleErrors'
import { baseUrl } from './lib/testHost'
const it = test

test.afterEach(checkForConsoleErrors)

const base = baseUrl()
const routePageSections = [
  'DELIVERY',
  'RESERVE YOUR SPOT!',
  'FRONTLINE GROUPS',
  'UK STAGING HUBS',
  'STORAGE & SHIPPING (£)',
  'ALL ABOUT PALLETS',
]

async function getAllSectionHeaders(page: Page) {
  return Promise.all(
    (await page.$$('header >> h1')).map(async (item) => {
      return item.innerText()
    }),
  )
}

test.describe('Uk to Lebanon Route', () => {
  const lebanonRouteUrl = new URL('/routes/uk-to-lebanon', base).toString()

  it('Should have the correct title', async ({ page }) => {
    await page.goto(lebanonRouteUrl)
    await expect(page).toHaveTitle('Route: UK to Lebanon · Distribute Aid')
  })
  it('Should have the proper sections', async ({ page }) => {
    await page.goto(lebanonRouteUrl)
    const sectionsHeaders = await getAllSectionHeaders(page)
    await expect(sectionsHeaders).toEqual(routePageSections)
  })
})

test.describe('Uk to France Route', () => {
  const franceRouteUrl = new URL('/routes/uk-to-france', base).toString()

  it('Should have the correct title', async ({ page }) => {
    await page.goto(franceRouteUrl)
    await expect(page).toHaveTitle('Route: UK to France · Distribute Aid')
  })
  it('Should have the proper sections', async ({ page }) => {
    await page.goto(franceRouteUrl)
    const sectionsHeaders = await getAllSectionHeaders(page)
    await expect(sectionsHeaders).toEqual(routePageSections)
  })
})
