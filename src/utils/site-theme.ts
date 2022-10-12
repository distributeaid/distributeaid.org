import resolveConfig from 'tailwindcss/resolveConfig'
import { KeyValuePair } from 'tailwindcss/types/config.js'
import tailwindConfig from '../../tailwind.config.js'

const siteTheme = resolveConfig(tailwindConfig).theme

export function getThemeLargeScreenWidth() {
  const screens = siteTheme?.screens as KeyValuePair<string, string> | undefined // {sm: '640px', md: '768px', lg: '1024px', xl: '1280px', 2xl: '1536px'}
  return parseInt(screens?.lg?.replace('px', '') ?? '1024px', 10)
}
