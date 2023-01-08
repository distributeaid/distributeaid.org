import { BarDatum } from '@nivo/bar'

import {
  NivoBarChartOptions,
  SortByOption,
  SortOptions,
  SortOrderOption,
} from '../../../types/vis/nivo-bar-chart-options.d'

import {
  getNivoBarChartOptions,
  getSortOptions,
} from '../../../types/vis/nivo-bar-chart-options.test-helpers'

import {
  getSortByOptions,
  getSortOrderOptions,
  sort,
  updateSortByOption,
  updateSortOrderOption,
} from './options-helpers'

/*
Nivo Bar Chart Options
================================================================================
*/

/*
Sort
------------------------------------------------------------
*/

describe('sort', () => {
  let data: BarDatum[]

  beforeEach(() => {
    data = [
      { index: 'index3', 'Key 4': 400 },
      { index: 'index2', 'Key 2': 200, 'Key 3': 300 },
      { index: 'index1', 'Key 1': 100 },
    ]
  })

  it('provides an empty array if there is nothing to sort', () => {
    data = []
    const options: SortOptions = getSortOptions()
    const sorted = sort(data, options)
    expect(sorted).toStrictEqual([])
  })

  it('defaults to sorting by label', () => {
    const sorted = sort(data)
    expect(sorted).toStrictEqual([
      { index: 'index1', 'Key 1': 100 },
      { index: 'index2', 'Key 2': 200, 'Key 3': 300 },
      { index: 'index3', 'Key 4': 400 },
    ])
  })

  it('sorts by label', () => {
    let options = getSortOptions({
      by: SortByOption.Label,
      order: SortOrderOption.Asc,
    })
    const sorted = sort(data, options)
    expect(sorted).toStrictEqual([
      { index: 'index1', 'Key 1': 100 },
      { index: 'index2', 'Key 2': 200, 'Key 3': 300 },
      { index: 'index3', 'Key 4': 400 },
    ])
  })

  it('sorts by value', () => {
    let options = getSortOptions({
      by: SortByOption.Value,
      order: SortOrderOption.Asc,
    })
    const sorted = sort(data, options)
    expect(sorted).toStrictEqual([
      { index: 'index1', 'Key 1': 100 },
      { index: 'index3', 'Key 4': 400 },
      { index: 'index2', 'Key 2': 200, 'Key 3': 300 },
    ])
  })

  // TODO: better way to test for this?
  //       maybe a util "random" function that we can override w/ a mock to
  //       guarantee a set return value?
  it('sorts by random', () => {
    let options = getSortOptions({
      by: SortByOption.Random,
      order: SortOrderOption.Asc,
    })
    const sorted = sort(data, options)
    expect(sorted.length).toBe(3)
  })

  it('sorts in ascending order', () => {
    const options = getSortOptions({
      by: SortByOption.Label,
      order: SortOrderOption.Asc,
    })
    const sorted = sort(data, options)
    expect(sorted).toStrictEqual([
      { index: 'index1', 'Key 1': 100 },
      { index: 'index2', 'Key 2': 200, 'Key 3': 300 },
      { index: 'index3', 'Key 4': 400 },
    ])
  })

  it('sorts in descending order', () => {
    const options = getSortOptions({
      by: SortByOption.Value,
      order: SortOrderOption.Desc,
    })
    const sorted = sort(data, options)
    expect(sorted).toStrictEqual([
      { index: 'index2', 'Key 2': 200, 'Key 3': 300 },
      { index: 'index3', 'Key 4': 400 },
      { index: 'index1', 'Key 1': 100 },
    ])
  })
})

describe('get sort options', () => {
  it('getSortByOptions provides the possible ways to sort', () => {
    const entries = [] as any[]
    const options = getNivoBarChartOptions()
    const optionChoices = getSortByOptions(entries, options)
    expect(optionChoices).toStrictEqual(['Label', 'Value', 'Random'])
  })

  it('getSortOrderOptions provides the possible ways to order', () => {
    const entries = [] as any[]
    const options = getNivoBarChartOptions()
    const optionChoices = getSortOrderOptions(entries, options)
    expect(optionChoices).toStrictEqual(['Ascending', 'Descending'])
  })
})

describe('update sort options', () => {
  let entries: any[]
  let options: NivoBarChartOptions

  beforeEach(() => {
    entries = []
    options = getNivoBarChartOptions({
      sort: getSortOptions({
        by: SortByOption.Label,
        order: SortOrderOption.Asc,
      }),
    })
  })

  it('updateSortByOption only updates the sort.by option', () => {
    const updatedOptions = updateSortByOption(
      entries,
      options,
      SortByOption.Random,
    )

    // should change
    expect(updatedOptions.sort?.by).toBe(SortByOption.Random)

    // should NOT change
    expect(updatedOptions.sort?.order).toBe(SortOrderOption.Asc)
  })

  it('updateSortOrderOption only updates the sort.order option', () => {
    const updatedOptions = updateSortOrderOption(
      entries,
      options,
      SortOrderOption.Desc,
    )

    // should change
    expect(updatedOptions.sort?.order).toBe(SortOrderOption.Desc)

    // should NOT change
    expect(updatedOptions.sort?.by).toBe(SortByOption.Label)
  })
})
