import { Need } from './need.d'
import { getPlace } from './place.test-helpers'
import { getProduct } from './product.test-helpers'

/*
Need
------------------------------------------------------------
*/
export const getNeed = (props?: Record<string, any>) => {
  const need = 10000
  const product = getProduct()
  const place = getPlace()

  return {
    id: 'node-id',
    need,
    product,
    place,
    ...props,

    survey: {
      id: 'big-long-survey-hash-from-needs-assessment-tool',
      year: '2023',
      quarter: 'Q3',
      ...props?.survey,
    },
  } as Need
}
