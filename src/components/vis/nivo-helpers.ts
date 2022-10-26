import { BarDatum } from '@nivo/bar'

/*
Build BarDatum[]
================================================================================
*/
export type KeySelector<T> = (entry: T) => string
export type ValueSelector<T> = (entry: T) => number
export type Index<T> = Record<string, T[]>

export function buildNivoData<T>(
  indexedEntries: Index<T>,
  getKey: KeySelector<T>,
  getValue: ValueSelector<T>,
): {
  data: BarDatum[]
  keys: string[]
} {
  const data: BarDatum[] = []
  const keys: Set<string> = new Set()

  for (const [index, entries] of Object.entries(indexedEntries)) {
    const datum: BarDatum = { index }

    for (const entry of entries) {
      const key = getKey(entry)
      const currentCount = (datum[key] as number) || 0
      datum[key] = currentCount + getValue(entry)
      keys.add(key)
    }

    data.push(datum)
  }

  return {
    data,
    keys: Array.from(keys).sort(),
  }
}

/*
Manipulate BarDatum[]
================================================================================
*/
export const indexCounter = (data: BarDatum[]): number => {
  const bars: Set<string> = new Set()

  for (const datum of data) {
    bars.add(datum.index as string)
  }

  return bars.size
}

/*
Sort BarDatum[]
================================================================================
*/
type Sorter = (data: BarDatum[]) => BarDatum[]

export const sortByLabel: Sorter = (data) => {
  return data.sort((a, b) => {
    const aLabel = a.index as string
    const bLabel = b.index as string

    if (aLabel < bLabel) {
      return 1
    }
    if (aLabel > bLabel) {
      return -1
    }
    return 0
  })
}

export const sortByValue: Sorter = (data) => {
  return data.sort((a, b) => {
    const aValue = getTotalValue(a)
    const bValue = getTotalValue(b)

    if (aValue < bValue) {
      return 1
    }
    if (aValue > bValue) {
      return -1
    }
    return 0
  })
}

export const sortByRandom: Sorter = (data) => {
  return data.sort(() => {
    return Math.random() - 0.5
  })
}

/*
Manipliate BarDatum
================================================================================
*/
const getTotalValue = (datum: BarDatum): number => {
  return Object.entries(datum).reduce((totalValue, [key, value]) => {
    if (key !== 'index' && typeof value === 'number') {
      return totalValue + value
    } else {
      return totalValue
    }
  }, 0)
}
