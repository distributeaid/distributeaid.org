import {
  filterByCategory,
  filterByItem,
  filterByQuarter,
  filterByRegion,
  filterBySearch,
  filterBySubregion,
  getCategories,
  getItems,
  getQuarters,
  getRegions,
  getSubregions,
  indexByCategory,
  indexByItem,
  indexByQuarter,
  indexByRegion,
  indexBySubregion,
  selectCategory,
  selectItem,
  selectNeed,
  selectQuarter,
  selectRegion,
  selectSubregion,
} from './data-helpers'

import { getNeed } from '../../../types/need.test-helpers'
import {
  getPlace,
  getRegion,
  getSubregion,
} from '../../../types/place.test-helpers'
import { getProduct } from '../../../types/product.test-helpers'

/*
Selectors
================================================================================
*/

/*
Key Selectors
------------------------------------------------------------
*/
describe('selectQuarter', () => {
  it("provides a string representation of a need's survey's quarter", () => {
    const need = getNeed({
      survey: {
        year: '2023',
        quarter: 'Q1',
      },
    })
    const selected = selectQuarter(need)
    expect(selected).toBe('2023 Q1')
  })
})

describe('selectRegion', () => {
  it("provides a string representation of a need's region", () => {
    const need = getNeed({
      place: getPlace({
        region: getRegion({
          name: 'Some Region',
        }),
      }),
    })
    const selected = selectRegion(need)
    expect(selected).toBe('Some Region')
  })
})

describe('selectSubregion', () => {
  it("provides a string representation of a need's survey's subregion", () => {
    const need = getNeed({
      place: getPlace({
        subregion: getSubregion({
          name: 'Some Subregion',
        }),
      }),
    })
    const selected = selectSubregion(need)
    expect(selected).toBe('Some Subregion')
  })
})

describe('selectCategory', () => {
  it("provides a string representation of a need's survey's category", () => {
    const need = getNeed({
      product: getProduct({
        category: 'Some Category',
      }),
    })
    const selected = selectCategory(need)
    expect(selected).toBe('Some Category')
  })
})

describe('selectItem', () => {
  it("provides a string representation of a need's survey's item", () => {
    const need = getNeed({
      product: getProduct({
        item: 'Some Item',
      }),
    })
    const selected = selectItem(need)
    expect(selected).toBe('Some Item')
  })

  it("provides a string representation of a need's survey's item including modifiers", () => {
    const need = getNeed({
      product: getProduct({
        item: 'T-Shirt',
        ageGender: 'Mens',
        sizeStyle: 'Large',
      }),
    })
    const selected = selectItem(need)
    expect(selected).toBe('Mens Large T-Shirt')
  })
})

/*
Value Selectors
------------------------------------------------------------
*/
describe('selectNeed', () => {
  it('provides a string representation of the amount of need', () => {
    const need = getNeed({
      need: 1312,
    })
    const selected = selectNeed(need)
    expect(selected).toBe(1312)
  })
})

/*
Mappers
================================================================================
NOTE: The mapper function results are sorted.
*/
describe('getQuarters', () => {
  it('provides an empty array if there are no needs', () => {
    const uniqueLabels = getQuarters([])
    expect(uniqueLabels).toStrictEqual([])
  })

  it('maps needs into a list of unique quarters', () => {
    const needs = [
      getNeed({
        survey: {
          year: '2023',
          quarter: 'Q1',
        },
      }),
      getNeed({
        survey: {
          year: '2023',
          quarter: 'Q1',
        },
      }),
      getNeed({
        survey: {
          year: '2023',
          quarter: 'Q2',
        },
      }),
    ]

    // NOTE: getQuarters is sorted in descending order by default
    const uniqueLabels = getQuarters(needs)
    expect(uniqueLabels).toStrictEqual(['2023 Q2', '2023 Q1'])
  })
})

describe('getRegions', () => {
  it('provides an empty array if there are no needs', () => {
    const uniqueLabels = getRegions([])
    expect(uniqueLabels).toStrictEqual([])
  })

  it('maps needs into a list of unique regions', () => {
    const needs = [
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'Some Region',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'Some Region',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'Another Region',
          }),
        }),
      }),
    ]

    const uniqueLabels = getRegions(needs)
    expect(uniqueLabels).toStrictEqual(['Another Region', 'Some Region'])
  })
})

describe('getSubegions', () => {
  it('provides an empty array if there are no needs', () => {
    const uniqueLabels = getSubregions([])
    expect(uniqueLabels).toStrictEqual([])
  })

  it('maps needs into a list of unique subregions', () => {
    const needs = [
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'Some Subregion',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'Some Subregion',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'Another Subregion',
          }),
        }),
      }),
    ]

    const uniqueLabels = getSubregions(needs)
    expect(uniqueLabels).toStrictEqual(['Another Subregion', 'Some Subregion'])
  })
})

describe('getCategories', () => {
  it('provides an empty array if there are no needs', () => {
    const uniqueLabels = getCategories([])
    expect(uniqueLabels).toStrictEqual([])
  })

  it('maps needs into a list of unique categories', () => {
    const needs = [
      getNeed({
        product: getProduct({
          category: 'Some Category',
        }),
      }),
      getNeed({
        product: getProduct({
          category: 'Some Category',
        }),
      }),
      getNeed({
        product: getProduct({
          category: 'Another Category',
        }),
      }),
    ]

    const uniqueLabels = getCategories(needs)
    expect(uniqueLabels).toStrictEqual(['Another Category', 'Some Category'])
  })
})

describe('getItems', () => {
  it('provides an empty array if there are no needs', () => {
    const uniqueLabels = getItems([])
    expect(uniqueLabels).toStrictEqual([])
  })

  it('maps needs into a list of unique items', () => {
    const needs = [
      getNeed({
        product: getProduct({
          item: 'Some Item',
        }),
      }),
      getNeed({
        product: getProduct({
          item: 'Some Item',
        }),
      }),
      getNeed({
        product: getProduct({
          item: 'Another Item',
        }),
      }),
    ]

    const uniqueLabels = getItems(needs)
    expect(uniqueLabels).toStrictEqual(['Another Item', 'Some Item'])
  })
})

/*
Indexers
================================================================================
*/

describe('indexByQuarter', () => {
  it('provides an empty object if there are no needs', () => {
    const index = indexByQuarter([])
    expect(index).toStrictEqual({})
  })

  it('groups needs by quarter', () => {
    const needs = [
      getNeed({
        survey: {
          year: '2023',
          quarter: 'Q1',
        },
      }),
      getNeed({
        survey: {
          year: '2023',
          quarter: 'Q1',
        },
      }),
      getNeed({
        survey: {
          year: '2023',
          quarter: 'Q2',
        },
      }),
    ]

    const index = indexByQuarter(needs)
    expect(index).toStrictEqual({
      '2023 Q1': [needs[0], needs[1]],
      '2023 Q2': [needs[2]],
    })
  })
})

describe('indexByRegion', () => {
  it('provides an empty object if there are no needs', () => {
    const index = indexByRegion([])
    expect(index).toStrictEqual({})
  })

  it('groups needs by region', () => {
    const needs = [
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'Some Region',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'Some Region',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'Another Region',
          }),
        }),
      }),
    ]

    const index = indexByRegion(needs)
    expect(index).toStrictEqual({
      'Some Region': [needs[0], needs[1]],
      'Another Region': [needs[2]],
    })
  })
})

describe('indexBySubregion', () => {
  it('provides an empty object if there are no needs', () => {
    const index = indexBySubregion([])
    expect(index).toStrictEqual({})
  })

  it('groups needs by subregion', () => {
    const needs = [
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'Some Subregion',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'Some Subregion',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'Another Subregion',
          }),
        }),
      }),
    ]

    const index = indexBySubregion(needs)
    expect(index).toStrictEqual({
      'Some Subregion': [needs[0], needs[1]],
      'Another Subregion': [needs[2]],
    })
  })
})

describe('indexByCategory', () => {
  it('provides an empty object if there are no needs', () => {
    const index = indexByCategory([])
    expect(index).toStrictEqual({})
  })

  it('groups needs by category', () => {
    const needs = [
      getNeed({
        product: getProduct({
          category: 'Some Category',
        }),
      }),
      getNeed({
        product: getProduct({
          category: 'Some Category',
        }),
      }),
      getNeed({
        product: getProduct({
          category: 'Another Category',
        }),
      }),
    ]

    const index = indexByCategory(needs)
    expect(index).toStrictEqual({
      'Some Category': [needs[0], needs[1]],
      'Another Category': [needs[2]],
    })
  })
})

describe('indexByItem', () => {
  it('provides an empty object if there are no needs', () => {
    const index = indexByItem([])
    expect(index).toStrictEqual({})
  })

  it('groups needs by item', () => {
    const needs = [
      getNeed({
        product: getProduct({
          item: 'Some Item',
        }),
      }),
      getNeed({
        product: getProduct({
          item: 'Some Item',
        }),
      }),
      getNeed({
        product: getProduct({
          item: 'Another Item',
        }),
      }),
    ]

    const index = indexByItem(needs)
    expect(index).toStrictEqual({
      'Some Item': [needs[0], needs[1]],
      'Another Item': [needs[2]],
    })
  })
})

/*
Filter By
================================================================================
*/

describe('filterByQuarter', () => {
  it('provides an empty array if there are no needs', () => {
    const filtered = filterByQuarter([], '2023 Q1')
    expect(filtered).toStrictEqual([])
  })

  it('provides an empty array if there are no matching needs', () => {
    const needs = [getNeed(), getNeed()]
    const filtered = filterByQuarter(needs, 'NOT A REAL QUARTER')
    expect(filtered).toStrictEqual([])
  })

  it('filters needs by quarter', () => {
    const needs = [
      getNeed({
        survey: {
          year: '2023',
          quarter: 'Q1',
        },
      }),
      getNeed({
        survey: {
          year: '2023',
          quarter: 'Q1',
        },
      }),
      getNeed({
        survey: {
          year: '2023',
          quarter: 'Q2',
        },
      }),
    ]

    const filtered = filterByQuarter(needs, '2023 Q1')
    expect(filtered).toStrictEqual([needs[0], needs[1]])
  })
})

describe('filterByRegion', () => {
  it('provides an empty array if there are no needs', () => {
    const filtered = filterByRegion([], 'Some Region')
    expect(filtered).toStrictEqual([])
  })

  it('provides an empty array if there are no matching needs', () => {
    const needs = [getNeed(), getNeed()]
    const filtered = filterByRegion(needs, 'NOT A REAL REGION')
    expect(filtered).toStrictEqual([])
  })

  it('filters needs by region', () => {
    const needs = [
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'Some Region',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'Some Region',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'Another Region',
          }),
        }),
      }),
    ]

    const filtered = filterByRegion(needs, 'Some Region')
    expect(filtered).toStrictEqual([needs[0], needs[1]])
  })
})

describe('filterBySubregion', () => {
  it('provides an empty array if there are no needs', () => {
    const filtered = filterBySubregion([], 'Some Subregion')
    expect(filtered).toStrictEqual([])
  })

  it('provides an empty array if there are no matching needs', () => {
    const needs = [getNeed(), getNeed()]
    const filtered = filterBySubregion(needs, 'NOT A REAL SUBREGION')
    expect(filtered).toStrictEqual([])
  })

  it('filters needs by subregion', () => {
    const needs = [
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'Some Subregion',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'Some Subregion',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'Another Subregion',
          }),
        }),
      }),
    ]

    const filtered = filterBySubregion(needs, 'Some Subregion')
    expect(filtered).toStrictEqual([needs[0], needs[1]])
  })
})

describe('filterByCategory', () => {
  it('provides an empty array if there are no needs', () => {
    const filtered = filterByCategory([], 'Some Category')
    expect(filtered).toStrictEqual([])
  })

  it('provides an empty array if there are no matching needs', () => {
    const needs = [getNeed(), getNeed()]
    const filtered = filterByCategory(needs, 'NOT A REAL CATEGORY')
    expect(filtered).toStrictEqual([])
  })

  it('filters needs by category', () => {
    const needs = [
      getNeed({
        product: getProduct({
          category: 'Some Category',
        }),
      }),
      getNeed({
        product: getProduct({
          category: 'Some Category',
        }),
      }),
      getNeed({
        product: getProduct({
          category: 'Another Category',
        }),
      }),
    ]

    const filtered = filterByCategory(needs, 'Some Category')
    expect(filtered).toStrictEqual([needs[0], needs[1]])
  })
})

describe('filterByItem', () => {
  it('provides an empty array if there are no needs', () => {
    const filtered = filterByItem([], 'Some Item')
    expect(filtered).toStrictEqual([])
  })

  it('provides an empty array if there are no matching needs', () => {
    const needs = [getNeed(), getNeed()]
    const filtered = filterByItem(needs, 'NOT A REAL CATEGORY')
    expect(filtered).toStrictEqual([])
  })

  it('filters needs by item', () => {
    const needs = [
      getNeed({
        product: getProduct({
          item: 'Some Item',
        }),
      }),
      getNeed({
        product: getProduct({
          item: 'Some Item',
        }),
      }),
      getNeed({
        product: getProduct({
          item: 'Another Item',
        }),
      }),
    ]

    const filtered = filterByItem(needs, 'Some Item')
    expect(filtered).toStrictEqual([needs[0], needs[1]])
  })
})

describe('filterBySearch', () => {
  it('provides an empty array if there are no needs', () => {
    const filtered = filterBySearch([], 'My Search')
    expect(filtered).toStrictEqual([])
  })

  it('provides an empty array if there are no matching needs', () => {
    const needs = [getNeed(), getNeed()]
    const filtered = filterBySearch(needs, 'NOT A REAL SEARCH')
    expect(filtered).toStrictEqual([])
  })

  it("empty search terms don't filter out results", () => {
    const needs = [getNeed(), getNeed()]
    const filtered = filterBySearch(needs, '')
    expect(filtered).toStrictEqual(needs)
  })

  it('filters needs by search', () => {
    const needs = [
      getNeed({
        survey: {
          year: '2023',
          quarter: 'My Quarter',
        },
      }),
      getNeed({
        place: getPlace({
          region: getRegion({
            name: 'My Region',
          }),
        }),
      }),
      getNeed({
        place: getPlace({
          subregion: getSubregion({
            name: 'My Subregion',
          }),
        }),
      }),
      getNeed({
        product: getProduct({
          category: 'My Category',
        }),
      }),
      getNeed({
        product: getProduct({
          item: 'My Item',
        }),
      }),
      getNeed(),
    ]

    const filtered = filterBySearch(needs, 'My')
    expect(filtered).toStrictEqual([
      needs[0],
      needs[1],
      needs[2],
      needs[3],
      needs[4],
    ])
  })
})
