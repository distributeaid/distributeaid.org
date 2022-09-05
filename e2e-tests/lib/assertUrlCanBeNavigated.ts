import { expect, Page } from '@playwright/test'

export const assertUrlCanBeNavigated = async (
  page: Page,
  url: string,
  status = 200,
) => {
  const response = await page.goto(url)
  expect(response?.status()).toEqual(status)
}
