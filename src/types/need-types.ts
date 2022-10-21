import { Region, Subregion } from './place-types'
import { Product } from './product-types'

export type Need = {
  id: string
  need: number
  survey: {
    id: string
    year: string
    quarter: string
  }
  product: Product
  place: {
    region?: Region
    subregion?: Subregion
  }
}
