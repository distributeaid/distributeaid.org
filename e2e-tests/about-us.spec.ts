import { expect, test } from '@playwright/test'
import { checkForConsoleErrors } from './lib/checkForConsoleErrors'
import { baseUrl } from './lib/testHost'
const it = test

test.afterEach(checkForConsoleErrors)

const base = baseUrl()

test.describe('About us', () => {
  it('should navigate to the page from home', async ({ page }) => {
    await page.goto(base)
    await page.locator('header >> a:has-text("About us"):visible').click()
    await expect(page).toHaveURL(new URL('/about-us/', base).toString())
    await expect(page).toHaveTitle('About us · Distribute Aid')
  })

  it('should have the correct content', async ({ page }) => {
    await page.goto(new URL('/about-us/', base).toString())

    expect(await page.getByTitle('YouTube embed')).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/msizPweg3kE',
    )
    await expect(
      page.getByAltText(
        'Distribute Aid Logo: A flock of doves stylized by stacking wings behind the main outline of a dove.',
      ),
    ).toBeVisible()

    await expect(
      page.getByAltText(
        'Our board members from left to right: Rudayna Abdo, Sara Lönegård, and Stephanie Fairbank',
      ),
    ).toBeVisible()

    await expect(page.getByText('About our mission')).toBeVisible()
    await expect(page.getByText('Our history')).toBeVisible()
  })
})
