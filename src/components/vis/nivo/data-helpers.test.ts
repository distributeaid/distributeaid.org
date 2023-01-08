import { BarDatum } from '@nivo/bar'

import {
  buildNivoData,
  getIndexValue,
  getTotalValue,
  indexCounter,
  sortByLabel,
  sortByRandom,
  sortByValue,
} from './data-helpers'

/*
Build BarDatum[]
================================================================================
*/
describe('buildNivoData<T>', () => {
  type Entry = {
    key: string
    value: number
  }

  let indexedEntries: Record<string, Entry[]>

  const getKey = (entry: Entry) => {
    return entry.key
  }

  const getValue = (entry: Entry) => {
    return entry.value
  }

  beforeEach(() => {
    indexedEntries = {
      index1: [
        { key: 'Key 1', value: 100 } as Entry,
        { key: 'Key 2', value: 200 } as Entry,
      ],
      index2: [
        { key: 'Key 3', value: 300 } as Entry,
        { key: 'Key 4', value: 400 } as Entry,
      ],
    }
  })

  it('returns empty key & data arrays if there are no indexes', () => {
    indexedEntries = {}
    const { keys, data } = buildNivoData(indexedEntries, getKey, getValue)
    expect(keys).toStrictEqual([])
    expect(data).toStrictEqual([])
  })

  it('returns empty key array if there are no entries', () => {
    indexedEntries = { index1: [] }
    const { keys, data } = buildNivoData(indexedEntries, getKey, getValue)
    expect(keys).toStrictEqual([])
    expect(data).toStrictEqual([{ index: 'index1' }])
  })

  it('creates Nivo datum from indexed entries', () => {
    const { keys, data } = buildNivoData(indexedEntries, getKey, getValue)
    expect(keys).toStrictEqual(['Key 1', 'Key 2', 'Key 3', 'Key 4'])
    expect(data).toStrictEqual([
      {
        index: 'index1',
        'Key 1': 100,
        'Key 2': 200,
      },
      {
        index: 'index2',
        'Key 3': 300,
        'Key 4': 400,
      },
    ])
  })

  it('sums values for the same key within the same index', () => {
    indexedEntries.index1?.push({ key: 'Key 1', value: 10 })
    indexedEntries.index2?.push({ key: 'Key 1', value: 1 })

    const { keys, data } = buildNivoData(indexedEntries, getKey, getValue)
    expect(keys).toStrictEqual(['Key 1', 'Key 2', 'Key 3', 'Key 4'])
    expect(data).toStrictEqual([
      {
        index: 'index1',
        'Key 1': 110,
        'Key 2': 200,
      },
      {
        index: 'index2',
        'Key 1': 1,
        'Key 3': 300,
        'Key 4': 400,
      },
    ])
  })
})

/*
Manipulate BarDatum[]
================================================================================
*/
describe('indexCounter', () => {
  it('returns 0 if there is no data', () => {
    const data = [] as BarDatum[]
    const count = indexCounter(data)
    expect(count).toBe(0)
  })

  it('counts the # of unique indexes in the data', () => {
    const data = [
      {
        index: 'index1',
        'Key 1': 100,
        'Key 2': 200,
      },
      {
        index: 'index2',
        'Key 3': 300,
        'Key 4': 400,
      },
    ]
    const count = indexCounter(data)
    expect(count).toBe(2)
  })
})

describe('getTotalValue', () => {
  it('returns 0 if there is no data', () => {
    const data = [] as BarDatum[]
    const total = getTotalValue(data)
    expect(total).toBe(0)
  })

  it('sums all of the values', () => {
    const data = [
      {
        index: 'index1',
        'Key 1': 1,
        'Key 2': 10,
        'Key 5': -1000,
      },
      {
        index: 'index2',
        'Key 3': 100,
        'Key 4': 1000,
      },
    ]
    const total = getTotalValue(data)
    expect(total).toBe(111)
  })
})

/*
Sort BarDatum[]
================================================================================
*/

describe('sorting BarDatum[]', () => {
  let data: BarDatum[]

  beforeEach(() => {
    data = [
      { index: 'index3', 'Key 4': 400 },
      { index: 'index2', 'Key 2': 200, 'Key 3': 300 },
      { index: 'index1', 'Key 1': 100 },
    ]
  })

  it('sortByLabel sorts the data by index label', () => {
    const sorted = sortByLabel(data)
    expect(sorted).toStrictEqual([
      { index: 'index1', 'Key 1': 100 },
      { index: 'index2', 'Key 2': 200, 'Key 3': 300 },
      { index: 'index3', 'Key 4': 400 },
    ])
  })

  it('sortByValue sorts the data by summing the values in each index', () => {
    const sorted = sortByValue(data)
    expect(sorted).toStrictEqual([
      { index: 'index1', 'Key 1': 100 },
      { index: 'index3', 'Key 4': 400 },
      { index: 'index2', 'Key 2': 200, 'Key 3': 300 },
    ])
  })

  // TODO: better way to test for this?
  //       maybe a util "random" function that we can override w/ a mock to
  //       guarantee a set return value?
  it('sortByRandom jumbles the data order', () => {
    const unsorted = sortByRandom(data)
    expect(unsorted.length).toBe(3)
  })
})

/*
Manipliate BarDatum
================================================================================
*/

describe('getIndexValue', () => {
  it('sums the values across a BarDatum index', () => {
    const datum = { index: 'index2', 'Key 2': 200, 'Key 3': 300 }
    const total = getIndexValue(datum)
    expect(total).toBe(500)
  })
})
