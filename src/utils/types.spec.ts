import { getAttributeValue } from './types'

describe('Check functions of types utilities', () => {
  test('non attribut exist', () => {
    const object = {}

    // check string
    expect(getAttributeValue<string>(object, 'name')).toBeUndefined()
    // check number
    expect(getAttributeValue<number>(object, 'name')).toBeUndefined()
    // check array
    expect(getAttributeValue<[]>(object, 'name')).toBeUndefined()
    // check object
    expect(getAttributeValue<{}>(object, 'name')).toBeUndefined()
  })

  test('if attribut exist', () => {
    // check string
    const objectStr = { name: '7' }
    expect(getAttributeValue<string>(objectStr, 'name')).toBe('7')
    // check number
    const objectNum = { name: 7 }
    expect(getAttributeValue<number>(objectNum, 'name')).toBe(7)
    // check array
    const objectArr = { name: ['7'] }
    expect(getAttributeValue<[]>(objectArr, 'name')).toStrictEqual(['7'])
    // check object
    const objectObj = { name: { value: '7' } }
    expect(getAttributeValue<{}>(objectObj, 'name')).toStrictEqual({
      value: '7',
    })
  })
})
