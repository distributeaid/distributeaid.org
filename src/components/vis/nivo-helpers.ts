import { BarDatum } from '@nivo/bar'

export const indexCounter = (data: BarDatum[]): number => {
  const bars: Set<string> = new Set()

  for (const datum of data) {
    bars.add(datum.index as string)
  }

  return bars.size
}

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

const getTotalValue = (datum: BarDatum): number => {
  return Object.entries(datum).reduce((totalValue, [key, value]) => {
    if (key !== 'index' && typeof value === 'number') {
      return totalValue + value
    } else {
      return totalValue
    }
  }, 0)
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
