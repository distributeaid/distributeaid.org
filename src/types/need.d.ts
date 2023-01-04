import { Place } from './place.d'
import { Product } from './product.d'

export type Need = {
  id: string
  need: number
  survey: {
    id: string
    year: string
    quarter: string
  }
  product: Product
  place: Place
}
