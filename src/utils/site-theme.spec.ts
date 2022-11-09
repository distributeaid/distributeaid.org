import { getBackgroundColor, getColors } from './site-theme'

describe('getBackgroundColor()', () => {
  it('returns a hex code', () => {
    const color = getBackgroundColor()
    expect(color).toMatch(/^\#[A-Fa-f0-9]{6}$/)
  })
})

describe('getBackgroundColors(swatches, weights, randomize?)', () => {
  it('returns an array of hex codes containing colors of the given swatches and weights', () => {
    const color = getColors({
      swatches: ['navy', 'purple'],
      weights: [50, 100],
    })
    expect(color).toStrictEqual(['#F8FAFE', '#EEF4FD', '#EEF0FF', '#E3E5FF'])
  })
  it('returns an empty array given no swatches / weights', () => {
    const color = getColors({
      swatches: [],
      weights: [],
    })
    expect(color).toStrictEqual([])
  })
  it('returns an empty array given unknown swatches / weights', () => {
    const color = getColors({
      swatches: ['navy', 'not-a-color'],
      weights: [161],
    })
    expect(color).toStrictEqual([])
  })
})
