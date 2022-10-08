import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'
import { getAttributeValue } from './types'

const siteTheme = resolveConfig(tailwindConfig).theme

interface ISiteColorsList {
  [key: string]: string[]
}
interface ISiteColorsMap {
  [key: string]: string
}
interface ISiteColors {
  byName: ISiteColorsList
  byShade: ISiteColorsList
  byNameAndShade: {
    [key: string]: ISiteColorsMap
  }
  byShadeAndName: {
    [key: string]: ISiteColorsMap
  }
}

const siteColors: ISiteColors = {
  byName: {},
  byShade: {},
  byNameAndShade: {},
  byShadeAndName: {},
}
Object.entries(siteTheme.colors).forEach(
  (entry: [string, string | ISiteColorsMap]) => {
    const [name, shades] = entry
    if (typeof shades !== 'string') {
      siteColors.byName[name] = Object.values(shades)
      siteColors.byNameAndShade[name] = shades

      Object.entries(shades).forEach((entry: [string, string]) => {
        const [shade, hex] = entry
        if (!siteColors.byShade[shade]) {
          siteColors.byShade[shade] = []
        }
        siteColors.byShade[shade].push(hex)

        if (!siteColors.byShadeAndName[shade]) {
          siteColors.byShadeAndName[shade] = {}
        }
        siteColors.byShadeAndName[shade][name] = hex
      })
    }
  },
)
export { siteTheme, siteColors }

export function getCategoricalColorList(shade = '700') {
  return siteColors.byShade[shade]
}

export function getSequentialColorList(name = 'navy') {
  return siteColors.byName[name]
}

export function getColor(name = 'navy', shade = '700') {
  return siteColors.byNameAndShade[name][shade]
}

export function getDivergingColorList(nameA = 'rosemary', nameB = 'purple') {
  const colorsA = siteColors.byName[nameA].reverse()
  const colorsB = siteColors.byName[nameB]
  return colorsA.concat(colorsB)
}

export function getThemeLargeScreenWidth() {
  return parseInt(
    getAttributeValue<string>(siteTheme?.screens, 'lg').replace('px', ''),
    10,
  )
}
