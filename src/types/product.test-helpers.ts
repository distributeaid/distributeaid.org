import { Product, ProductPartial } from './product.d'

/*
Product
------------------------------------------------------------
*/
export const getProduct = (props?: Record<string, any>) => {
  return {
    category: 'Hygiene',
    item: 'Bar Soap',
    unit: '100g',
    ...props,
  } as Product
}

/*
Product Partial
------------------------------------------------------------
*/
export const getProductPartial = (props?: Record<string, any>) => {
  return {
    category: 'Hygiene',
    ...props,
  } as ProductPartial
}
