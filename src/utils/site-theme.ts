import { shuffle } from 'lodash'
import resolveConfig from 'tailwindcss/resolveConfig'
import { KeyValuePair } from 'tailwindcss/types/config.js'
import tailwindConfig from '../../tailwind.config.js'

const theme = resolveConfig(tailwindConfig).theme

export function getThemeLargeScreenWidth() {
  const screens = theme?.screens as KeyValuePair<string, string> | undefined // {sm: '640px', md: '768px', lg: '1024px', xl: '1280px', 2xl: '1536px'}
  return parseInt(screens?.['lg']?.replace('px', '') ?? '1024', 10)
}

let backgroundColorIndex = 0
const colors = shuffle(
  getColors({
    swatches: ['navy', 'purple', 'rosemary', 'turquoise', 'beige'],
    weights: [50, 100],
  }),
)

export function getBackgroundColor() {
  const color = colors[backgroundColorIndex]
  backgroundColorIndex = (backgroundColorIndex + 1) % colors.length

  return color
}

export function getColors({
  swatches,
  weights,
}: {
  swatches: string[]
  weights: number[]
}): string[] {
  const themeColors = theme?.colors as Record<
    string,
    KeyValuePair<number, string>
  > // {rosemary: {200: '#F2ECF5', 300: '#E9DFEE', etc}, etc}

  const colors: string[] = []

  for (const swatch of swatches) {
    for (const weight of weights) {
      const swatchColors = themeColors[swatch] ?? {}
      const color = swatchColors[weight]
      if (color) {
        colors.push(color)
      }
    }
  }

  // ['#F2ECF5', '#E9DFEE', '#D7C6E0', '#C6ACD2', '#B493C4', '#A284B0']
  return colors
}

export function getVisualizationColors({
  swatches,
  weights,
  randomize,
}: {
  swatches: string[]
  weights: number[]
  randomize: boolean
}): string[] {
  const themeColors = theme?.colors as Record<
    string,
    KeyValuePair<number, string>
  > // {rosemary: {200: '#F2ECF5', 300: '#E9DFEE', etc}, etc}

  const colors: string[] = []

  for (const [swatch, colorsByWeight] of Object.entries(themeColors)) {
    if (swatches.includes(swatch)) {
      for (const [weight, color] of Object.entries(colorsByWeight)) {
        if (weights.includes(parseInt(weight))) {
          colors.push(color)
        }
      }
    }
  }

  if (randomize) {
    colors.sort(() => Math.random() - 0.5)
  }

  // ['#F2ECF5', '#E9DFEE', '#D7C6E0', '#C6ACD2', '#B493C4', '#A284B0']
  return colors
}
