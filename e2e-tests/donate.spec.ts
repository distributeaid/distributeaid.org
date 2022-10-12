import { expect, test } from '@playwright/test'
import { checkForConsoleErrors } from './lib/checkForConsoleErrors'
import { baseUrl } from './lib/testHost'
const it = test

test.afterEach(checkForConsoleErrors)

const base = baseUrl()

test.describe('Donate action', () => {
  test.describe('Donate button on navigation', () => {
    it('the donate buttons should take me to the donation page', async ({
      page,
    }) => {
      await page.goto(base)
      await page.locator('header >> a:has-text("Donate"):visible').click()
      await expect(page).toHaveURL(new URL('/donate', base).toString())

      expect(await page.locator('data-test=patreon').textContent()).toContain(
        'Patreon',
      )
      expect(
        await page.locator('data-test=opencollective').textContent(),
      ).toContain('Open Collective')
      expect(await page.locator('data-test=bank').textContent()).toContain(
        'View bank info',
      )
    })
  })

  test.describe('Donate page', () => {
    it('should show Patreon info', async ({ page }) => {
      await page.goto(new URL('/donate', base).toString())
      expect(await page.locator('data-test=patreon').textContent()).toContain(
        'Patreon',
      )
      const link = page.locator('data-test=patreon >> a.link').first()
      expect(await link.getAttribute('href')).toEqual(
        'https://www.patreon.com/distributeaid',
      )
    })

    it('should show Open Collective info', async ({ page }) => {
      await page.goto(new URL('/donate', base).toString())
      expect(
        await page.locator('data-test=opencollective').textContent(),
      ).toContain('Open Collective')
      const link = page.locator('data-test=opencollective >> a.link').first()
      expect(await link.getAttribute('href')).toContain(
        'https://opencollective.com/distribute-aid-usa',
      )
    })

    it('should show Bank info', async ({ page }) => {
      await page.goto(new URL('/donate', base).toString())
      expect(await page.locator('data-test=bank').textContent()).toContain(
        'View bank info',
      )
      await page
        .locator('data-test=bank >> button:has-text("View bank info")')
        .click()
      const modalContent = await page
        .locator('.ReactModal__Content')
        .textContent()
      expect(modalContent).toContain('Distribute Aid')
      expect(modalContent).toContain('BE72 9672 1338 5616')
      expect(modalContent).toContain('TRWIBEB1XXX')
    })
  })
})
