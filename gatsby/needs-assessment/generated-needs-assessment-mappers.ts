import { parse } from 'csv-parse/sync'
import { readFileSync } from 'fs'
import { Product } from '../../src/types/product.d'

type ItemKeyMap = {
  Category: string
  Item: string
  'Age / Gender': string
  'Size / Style': string
  Unit: string
  'Category Id': string
  'Item Id': string
  'Unit Id': string
}

/*
Import Item to Key Map
------------------------------------------------------------
TODO: This should be encapsulated in the `needs-assessment-schemas` repo.
*/
// TODO: make this dynamic
const base = `./gatsby/needs-assessment/generated/2023-Q3`

const itemsMapCsv = readFileSync(
  `${base}/generated-item-to-key-map.csv`,
  'utf8',
)
const itemsMap: ItemKeyMap[] = parse(itemsMapCsv, {
  columns: true,
  skip_empty_lines: true,
  skip_records_with_empty_values: true,
  trim: true,
})
const productsByComboKey = itemsMap.reduce((byComboKey, item) => {
  const comboKey = `${item['Category Id']}Needs${item['Item Id']}${item['Unit Id']}`
  byComboKey[comboKey] = {
    category: item.Category.endsWith('Clothing') ? 'Clothing' : item.Category,
    item: item.Item,
    ageGender: item['Age / Gender'],
    sizeStyle: item['Size / Style'],
    unit: item.Unit === 'Individual Item' ? 'Item' : item.Unit,
  }
  return byComboKey
}, {} as Record<string, Product>)

export const isProductSurveyPage = (categoryKey: string): boolean => {
  return categoryKey.endsWith('Needs')
}

export const productMapper = (
  categoryKey: string,
  itemKey: string,
  unitKey: string,
): Product | undefined => {
  const comboKey = `${categoryKey}${itemKey}${unitKey}`
  return productsByComboKey[comboKey]
}
