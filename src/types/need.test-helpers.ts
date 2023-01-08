import { Need } from './need.d'
import { getSurvey } from './needs-assessment-survey.test-helpers'
import { getPlace } from './place.test-helpers'
import { getProduct } from './product.test-helpers'

/*
Need
------------------------------------------------------------
*/
export const getNeed = (props?: Record<string, any>) => {
  const need = 10000
  const survey = getSurvey()
  const product = getProduct()
  const place = getPlace()

  return {
    id: 'node-id',
    need,
    survey,
    product,
    place,
    ...props,
  } as Need
}
