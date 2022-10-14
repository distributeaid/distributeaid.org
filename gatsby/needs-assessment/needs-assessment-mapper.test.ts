import {
  isProductSurveyPage,
  placeMapper,
  productMapper,
} from './needs-assessment-mappers'

describe('Is Product Survey Page', () => {
  it('returns true for known product category keys', () => {
    const productSurveyPage = isProductSurveyPage('shelter')
    expect(productSurveyPage).toBe(true)
  })
  it('returns false for unknown product category keys', () => {
    const notProductSurveyPage = isProductSurveyPage('not_a_category')
    expect(notProductSurveyPage).toBe(false)
  })
})

describe('Product Mapper', () => {
  it('returns Product data structure for known products', () => {
    const knownProduct = productMapper('hygieneItems', 'barSoap', 'bars100g')
    expect(knownProduct).toStrictEqual({
      category: 'Hygiene',
      item: 'Soap',
      sizeStyle: 'Bar',
      unit: '100g',
    })
  })
  it('returns undefined for unknown products', () => {
    const unknownProduct = productMapper(
      'not_a_category',
      'not_an_item',
      'not_a_unit',
    )
    expect(unknownProduct).toBeUndefined()

    const semiKnownProduct = productMapper(
      'hygieneItems',
      'not_an_item',
      'not_a_unit',
    )
    expect(semiKnownProduct).toBeUndefined()
  })
})

describe('Place Mapper', () => {
  it('returns a Place data structure for known places', () => {
    const knownPlace = placeMapper('calais')
    expect(knownPlace).toStrictEqual({
      region: 'France',
      subregion: 'Northern France',
    })

    const knownRegionOnly = placeMapper('lebanon')
    expect(knownRegionOnly).toStrictEqual({
      region: 'Lebanon',
    })

    const otherPlace = placeMapper('other')
    expect(otherPlace).toStrictEqual({})
  })
  it('returns undefined for unknown places', () => {
    const unkownPlace = placeMapper('not_a_place')
    expect(unkownPlace).toBeUndefined()
  })
})
