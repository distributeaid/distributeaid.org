import { Need } from '../../../types/need.d'

import {
  filter,
  getAxisGroupByOptions,
  getAxisIndexByOptions,
  getFilterCategoryOptions,
  getFilterItemOptions,
  getFilterQuarterOptions,
  getFilterRegionOptions,
  getFilterSubregionOptions,
  index,
  selectBy,
  updateAxisGroupByOption,
  updateAxisIndexByOption,
  updateFilterCategoryOption,
  updateFilterItemOption,
  updateFilterQuarterOption,
  updateFilterRegionOption,
  updateFilterSearchOption,
  updateFilterSubregionOption,
  valueBy,
} from './options-helpers'

import {
  selectCategory,
  selectItem,
  selectNeed,
  selectQuarter,
  selectRegion,
  selectSubregion,
} from './data-helpers'

import {
  AxisOption,
  NeedsBarChartOptions,
} from '../../../types/vis/needs-bar-chart-options.d'

import { getNeed } from '../../../types/need.test-helpers'
import { getSurvey } from '../../../types/needs-assessment-survey.test-helpers'
import {
  getPlace,
  getRegion,
  getSubregion,
} from '../../../types/place.test-helpers'
import { getProduct } from '../../../types/product.test-helpers'

import {
  getAxisOptions,
  getFilterOptions,
  getNeedsBarChartOptions,
} from '../../../types/vis/needs-bar-chart-options.test-helpers'

/*
Filter
================================================================================
*/

describe('filter', () => {
  it('should return all the needs if the filter is undefined', () => {
    const needs = [] as Need[]
    expect(filter(needs)).toBe(needs)

    needs.push(getNeed())
    expect(filter(needs)).toBe(needs)
  })

  it('should filter the needs', () => {
    const survey1 = getSurvey({
      year: '2023',
      quarter: 'Q1',
    })
    const survey2 = getSurvey({
      year: '2023',
      quarter: 'Q2',
    })

    const place1 = getPlace({
      region: getRegion({
        name: 'Greece',
      }),
      subregion: getSubregion({
        name: 'Northern Greece',
      }),
    })
    const place2 = getPlace({
      region: getRegion({
        name: 'France',
      }),
      subregion: getSubregion({
        name: 'Northern France',
      }),
    })

    const product1 = getProduct({
      category: 'Hygiene',
      item: 'Bar Soap',
      sizeStyle: '100g',
      unit: 'Item',
    })
    const product2 = getProduct({
      category: 'Clothing',
      item: 'T-Shirt',
      ageGender: 'Women',
      unit: 'Item',
    })

    const matchingNeed = getNeed({
      need: 100,
      survey: survey1,
      product: product1,
      place: place1,
    })

    const needs: Need[] = [
      matchingNeed,
      getNeed({
        need: 200,
        survey: survey1,
        product: product1,
        place: place2,
      }),
      getNeed({
        need: 300,
        survey: survey1,
        product: product2,
        place: place1,
      }),
      getNeed({
        need: 400,
        survey: survey2,
        product: product1,
        place: place1,
      }),
      getNeed({
        need: 500,
        survey: survey2,
        product: product1,
        place: place2,
      }),
      getNeed({
        need: 600,
        survey: survey2,
        product: product2,
        place: place1,
      }),
    ]

    const options: NeedsBarChartOptions = getNeedsBarChartOptions({
      filters: getFilterOptions({
        search: '',
        quarter: '2023 Q1',
        region: 'Greece',
        subregion: 'Northern Greece',
        category: 'Hygiene',
        item: '100g Bar Soap (Item)',
      }),
    })

    expect(filter(needs, options.filters)).toStrictEqual([matchingNeed])
  })
})

describe('get filter options', () => {
  let needs: Need[]
  let options: NeedsBarChartOptions

  beforeEach(() => {
    const survey1 = getSurvey({
      year: '2023',
      quarter: 'Q1',
    })
    const survey2 = getSurvey({
      year: '2023',
      quarter: 'Q2',
    })

    const place1 = getPlace({
      region: getRegion({
        name: 'Greece',
      }),
      subregion: getSubregion({
        name: 'Northern Greece',
      }),
    })
    const place2 = getPlace({
      region: getRegion({
        name: 'France',
      }),
      subregion: getSubregion({
        name: 'Northern France',
      }),
    })

    const product1 = getProduct({
      category: 'Hygiene',
      item: 'Bar Soap',
      sizeStyle: '100g',
      unit: 'Item',
    })
    const product2 = getProduct({
      category: 'Clothing',
      item: 'T-Shirt',
      ageGender: 'Women',
      unit: 'Item',
    })

    needs = [
      getNeed({
        need: 100,
        survey: survey1,
        product: product1,
        place: place1,
      }),
      getNeed({
        need: 200,
        survey: survey1,
        product: product1,
        place: place2,
      }),
      getNeed({
        need: 300,
        survey: survey1,
        product: product2,
        place: place1,
      }),
      getNeed({
        need: 400,
        survey: survey2,
        product: product1,
        place: place1,
      }),
      getNeed({
        need: 500,
        survey: survey2,
        product: product1,
        place: place2,
      }),
      getNeed({
        need: 600,
        survey: survey2,
        product: product2,
        place: place1,
      }),
    ]

    options = getNeedsBarChartOptions()
  })

  it('getFilterQuarterOptions should return quarters for the given needs, sorted desc', () => {
    const optionChoices = getFilterQuarterOptions(needs, options)
    expect(optionChoices).toStrictEqual(['2023 Q2', '2023 Q1'])
  })

  it('getFilterCategoryOptions should return categories for the given needs, sorted asc', () => {
    const optionChoices = getFilterCategoryOptions(needs, options)
    expect(optionChoices).toStrictEqual(['Clothing', 'Hygiene'])
  })

  it('getFilterItemOptions should return items for the given needs, sorted asc', () => {
    const optionChoices = getFilterItemOptions(needs, options)
    expect(optionChoices).toStrictEqual([
      '100g Bar Soap (Item)',
      'Women T-Shirt (Item)',
    ])
  })

  it('getFilterItemOptions limits options within a category if the category filter is set', () => {
    options = getNeedsBarChartOptions({
      filters: getFilterOptions({
        category: 'Clothing',
      }),
    })
    const optionChoices = getFilterItemOptions(needs, options)
    expect(optionChoices).toStrictEqual(['Women T-Shirt (Item)'])
  })

  it('getFilterRegionOptions should return regions for the given needs, sorted asc', () => {
    const optionChoices = getFilterRegionOptions(needs, options)
    expect(optionChoices).toStrictEqual(['France', 'Greece'])
  })

  it('getFilterSubregionOptions should return subregions for the given needs, sorted asc', () => {
    const optionChoices = getFilterSubregionOptions(needs, options)
    expect(optionChoices).toStrictEqual(['Northern France', 'Northern Greece'])
  })

  it('getFilterSubregionOptions limits options within a region if the region filter is set', () => {
    options = getNeedsBarChartOptions({
      filters: getFilterOptions({
        region: 'Greece',
      }),
    })
    const optionChoices = getFilterSubregionOptions(needs, options)
    expect(optionChoices).toStrictEqual(['Northern Greece'])
  })
})

describe('update filters', () => {
  let needs: Need[]
  let options: NeedsBarChartOptions

  beforeEach(() => {
    needs = []

    options = getNeedsBarChartOptions({
      filters: getFilterOptions({
        search: '',
        quarter: '2023 Q1',
        region: 'Greece',
        subregion: 'Northern Greece',
        category: 'Hygiene',
        item: '100g Bar Soap',
      }),
    })
  })

  it('updateFilterSearchOption should only update the search filter option', () => {
    const updatedFilter = 'Clothing'
    const updatedOptions = updateFilterSearchOption(
      needs,
      options,
      updatedFilter,
    )

    // should change
    expect(updatedOptions.filters?.search).toBe('Clothing')

    // should NOT change
    expect(updatedOptions.filters?.quarter).toBe('2023 Q1')
    expect(updatedOptions.filters?.region).toBe('Greece')
    expect(updatedOptions.filters?.subregion).toBe('Northern Greece')
    expect(updatedOptions.filters?.category).toBe('Hygiene')
    expect(updatedOptions.filters?.item).toBe('100g Bar Soap')
    expect(updatedOptions.axis).toBe(options.axis)
    expect(updatedOptions.sort).toBe(options.sort)
  })

  it('updateFilterQuarterOption should only update the quarter filter option', () => {
    const updatedFilter = '2023 Q2'
    const updatedOptions = updateFilterQuarterOption(
      needs,
      options,
      updatedFilter,
    )

    // should change
    expect(updatedOptions.filters?.quarter).toBe('2023 Q2')

    // should NOT change
    expect(updatedOptions.filters?.search).toBe('')
    expect(updatedOptions.filters?.region).toBe('Greece')
    expect(updatedOptions.filters?.subregion).toBe('Northern Greece')
    expect(updatedOptions.filters?.category).toBe('Hygiene')
    expect(updatedOptions.filters?.item).toBe('100g Bar Soap')
    expect(updatedOptions.axis).toBe(options.axis)
    expect(updatedOptions.sort).toBe(options.sort)
  })

  it('updateFilterCategoryOption should only update the category filter option and reset the item filter option', () => {
    const updatedFilter = 'Clothing'
    const updatedOptions = updateFilterCategoryOption(
      needs,
      options,
      updatedFilter,
    )

    // should change
    expect(updatedOptions.filters?.category).toBe('Clothing')
    expect(updatedOptions.filters?.item).toBe(undefined)

    // should NOT change
    expect(updatedOptions.filters?.search).toBe('')
    expect(updatedOptions.filters?.quarter).toBe('2023 Q1')
    expect(updatedOptions.filters?.region).toBe('Greece')
    expect(updatedOptions.filters?.subregion).toBe('Northern Greece')
    expect(updatedOptions.axis).toBe(options.axis)
    expect(updatedOptions.sort).toBe(options.sort)
  })

  it('updateFilterItemOption should only update the item filter option', () => {
    const updatedFilter = 'Toothbrush'
    const updatedOptions = updateFilterItemOption(needs, options, updatedFilter)

    // should change
    expect(updatedOptions.filters?.item).toBe('Toothbrush')

    // should NOT change
    expect(updatedOptions.filters?.search).toBe('')
    expect(updatedOptions.filters?.quarter).toBe('2023 Q1')
    expect(updatedOptions.filters?.region).toBe('Greece')
    expect(updatedOptions.filters?.subregion).toBe('Northern Greece')
    expect(updatedOptions.filters?.category).toBe('Hygiene')
    expect(updatedOptions.axis).toBe(options.axis)
    expect(updatedOptions.sort).toBe(options.sort)
  })

  it('updateFilterRegionOption should only update the region filter option', () => {
    const updatedFilter = 'France'
    const updatedOptions = updateFilterRegionOption(
      needs,
      options,
      updatedFilter,
    )

    // should change
    expect(updatedOptions.filters?.region).toBe('France')
    expect(updatedOptions.filters?.subregion).toBe(undefined)

    // should NOT change
    expect(updatedOptions.filters?.search).toBe('')
    expect(updatedOptions.filters?.quarter).toBe('2023 Q1')
    expect(updatedOptions.filters?.category).toBe('Hygiene')
    expect(updatedOptions.filters?.item).toBe('100g Bar Soap')
    expect(updatedOptions.axis).toBe(options.axis)
    expect(updatedOptions.sort).toBe(options.sort)
  })

  it('updateFilterSubregionOption should update the subregion filter option', () => {
    const updatedFilter = 'Southern Greece'
    const updatedOptions = updateFilterSubregionOption(
      needs,
      options,
      updatedFilter,
    )

    // should change
    expect(updatedOptions.filters?.subregion).toBe('Southern Greece')

    // should NOT change
    expect(updatedOptions.filters?.search).toBe('')
    expect(updatedOptions.filters?.quarter).toBe('2023 Q1')
    expect(updatedOptions.filters?.region).toBe('Greece')
    expect(updatedOptions.filters?.category).toBe('Hygiene')
    expect(updatedOptions.filters?.item).toBe('100g Bar Soap')
    expect(updatedOptions.axis).toBe(options.axis)
    expect(updatedOptions.sort).toBe(options.sort)
  })
})

/*
Axis
================================================================================
*/
describe('index', () => {
  it('should provide an empty index if there are no need', () => {
    const needs: Need[] = []
    const indexed = index(needs, AxisOption.Category)
    expect(indexed).toStrictEqual({})
  })

  it('should index by category if the Axis.indexBy option is undefined', () => {
    const need1 = getNeed({
      product: getProduct({
        category: 'Clothing',
      }),
    })
    const need2 = getNeed({
      product: getProduct({
        category: 'Hygiene',
      }),
    })
    const needs: Need[] = [need1, need2, need1, need2]

    const indexed = index(needs)
    expect(indexed).toStrictEqual({
      Clothing: [need1, need1],
      Hygiene: [need2, need2],
    })
  })

  it('should index by the specified Axis.indexBy option', () => {
    const need1: Need = getNeed({
      survey: getSurvey({
        year: '2023',
        quarter: 'Q1',
      }),
      product: getProduct({
        category: 'Hygiene',
        item: 'Bar Soap',
        sizeStyle: '100g',
        unit: 'Item',
      }),
      place: getPlace({
        region: getRegion({
          name: 'Greece',
        }),
        subregion: getSubregion({
          name: 'Northern Greece',
        }),
      }),
    })

    const need2: Need = getNeed({
      survey: getSurvey({
        year: '2023',
        quarter: 'Q2',
      }),
      product: getProduct({
        category: 'Clothing',
        item: 'T-Shirt',
        ageGender: 'Women',
        unit: 'Item',
      }),
      place: getPlace({
        region: getRegion({
          name: 'France',
        }),
        subregion: getSubregion({
          name: 'Northern France',
        }),
      }),
    })

    const needs: Need[] = [need1, need2, need1, need2]

    expect(index(needs, AxisOption.Survey)).toStrictEqual({
      '2023 Q1': [need1, need1],
      '2023 Q2': [need2, need2],
    })
    expect(index(needs, AxisOption.Category)).toStrictEqual({
      Hygiene: [need1, need1],
      Clothing: [need2, need2],
    })
    expect(index(needs, AxisOption.Item)).toStrictEqual({
      '100g Bar Soap (Item)': [need1, need1],
      'Women T-Shirt (Item)': [need2, need2],
    })
    expect(index(needs, AxisOption.Region)).toStrictEqual({
      Greece: [need1, need1],
      France: [need2, need2],
    })
    expect(index(needs, AxisOption.Subregion)).toStrictEqual({
      'Northern Greece': [need1, need1],
      'Northern France': [need2, need2],
    })
  })
})

describe('selectBy', () => {
  it('defaults to selecting by category', () => {
    expect(selectBy()).toBe(selectCategory)
  })

  it('should provide a function that selects a relevant label for the need', () => {
    expect(selectBy(AxisOption.Survey)).toBe(selectQuarter)
    expect(selectBy(AxisOption.Category)).toBe(selectCategory)
    expect(selectBy(AxisOption.Item)).toBe(selectItem)
    expect(selectBy(AxisOption.Region)).toBe(selectRegion)
    expect(selectBy(AxisOption.Subregion)).toBe(selectSubregion)
  })
})

describe('valueBy', () => {
  it("should provide a function that selects the need's magnitude", () => {
    expect(valueBy()).toBe(selectNeed)
  })
})

describe('get axis options', () => {
  it('getAxisIndexByOptions should return the possible axis indexBy options', () => {
    const needs: Need[] = []
    const options: NeedsBarChartOptions = getNeedsBarChartOptions()
    const optionChoices = getAxisIndexByOptions(needs, options)
    expect(optionChoices).toStrictEqual([
      'Survey',
      'Region',
      'Subregion',
      'Category',
      'Item',
    ])
  })
  it('getAxisGroupByOptions should return the possible axis groupBy options', () => {
    const needs: Need[] = []
    const options: NeedsBarChartOptions = getNeedsBarChartOptions()
    const optionChoices = getAxisGroupByOptions(needs, options)
    expect(optionChoices).toStrictEqual([
      'Survey',
      'Region',
      'Subregion',
      'Category',
      'Item',
    ])
  })
})

describe('update axis', () => {
  let needs: Need[]
  let options: NeedsBarChartOptions

  beforeEach(() => {
    needs = []
    options = getNeedsBarChartOptions({
      axis: getAxisOptions({
        indexBy: AxisOption.Survey,
        groupBy: AxisOption.Region,
      }),
    })
  })

  it('updateAxisIndexByOption should only update the indexBy axis option', () => {
    const updatedOptions = updateAxisIndexByOption(
      needs,
      options,
      AxisOption.Category,
    )

    // should change
    expect(updatedOptions.axis?.indexBy).toBe(AxisOption.Category)

    // should NOT change
    expect(updatedOptions.filters).toBe(updatedOptions.filters)
    expect(updatedOptions.axis?.groupBy).toBe(AxisOption.Region)
    expect(updatedOptions.sort).toBe(options.sort)
  })

  it('updateAxisGroupByOption should only update the groupBy axis option', () => {
    const updatedOptions = updateAxisGroupByOption(
      needs,
      options,
      AxisOption.Category,
    )

    // should change
    expect(updatedOptions.axis?.groupBy).toBe(AxisOption.Category)

    // should NOT change
    expect(updatedOptions.filters).toBe(updatedOptions.filters)
    expect(updatedOptions.axis?.indexBy).toBe(AxisOption.Survey)
    expect(updatedOptions.sort).toBe(options.sort)
  })
})
