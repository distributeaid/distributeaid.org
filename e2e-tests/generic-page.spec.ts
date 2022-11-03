import { expect, test } from '@playwright/test'
import { checkForConsoleErrors } from './lib/checkForConsoleErrors'
import { baseUrl } from './lib/testHost'
const it = test

test.afterEach(checkForConsoleErrors)

const base = baseUrl()
const importantGenericPages = [
  {
    url: new URL('/contact-us/', base).toString(),
    title: 'Contact Us · Distribute Aid',
  },
  {
    url: new URL('/our-mission/', base).toString(),
    title: 'Our Mission and Values · Distribute Aid',
  },
  {
    url: new URL('/our-story/', base).toString(),
    title: 'Our Story · Distribute Aid',
  },
]

test.describe('Generic Pages', () => {
  it('should render important generic pages', async ({ page }) => {
    for (const { url, title } of importantGenericPages) {
      await page.goto(url)
      await expect(page).toHaveTitle(title)
    }
  })
})
