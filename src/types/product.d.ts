export type Product = {
  category: string
  item: string
  ageGender?: string
  sizeStyle?: string
  unit: string
}

export type ProductPartial = {
  category?: string
  item?: string
  ageGender?: string
  sizeStyle?: string
  unit?: string
}
