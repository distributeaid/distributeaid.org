import { Survey } from './needs-assessment-survey.d'
import { Place } from './place.d'
import { Product } from './product.d'

export type Need = {
  id: string
  need: number
  survey: Survey
  product: Product
  place: Place
}
