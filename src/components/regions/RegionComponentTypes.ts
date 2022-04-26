export type Region = {
  name: string
  map: string
  overview: string
  subregions: [string]
}

export type Regions = Record<string, Region>

export type Subregion = {
  name: string
  population: {
    count: number
  }
}

export type Subregions = Record<string, Subregion>
