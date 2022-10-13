import { productMapper } from './needs-assessment-mappers'

describe('Product Mapper', () => {
    it('return undefined for unkown products', () => {
        const unknownProduct = productMapper("not_a_category", "not_an_item", "not_a_unit")
        expect(unknownProduct).toBeUndefined()

        const semiKnownProduct = productMapper("hygieneItems", "not_an_item", "not_a_unit")
        expect(semiKnownProduct).toBeUndefined()
    })
    it('return Product data structure for known products', () => {
        const knownProduct = productMapper("hygieneItems", "barSoap", "bars100g")
        expect(knownProduct).toStrictEqual({
            category: "Hygiene",
            item: "Soap",
            sizeStyle: "Bar",
            unit: "100g"
        })
    })
})

export {}