import { getObjectProperty } from './getObjectProperty'

describe('getObjectProperty()', () => {
  it('should return a string property if present', () => {
    const foo = { bar: 'baz' }
    expect(getObjectProperty({ foo }, 'foo')).toEqual(foo)
  })

  it('should throw an error if the object is undefined', () =>
    expect(() => getObjectProperty(undefined, 'foo')).toThrow(
      `Received undefined when trying to access property 'foo'!`,
    ))

  it('should throw an error if the property is undefined', () =>
    expect(() => getObjectProperty({}, 'foo')).toThrow(
      `Object '{}' has no property 'foo'!`,
    ))

  it('should throw an error if the property is not a string', () =>
    expect(() => getObjectProperty({ foo: [] }, 'foo')).toThrow(
      `Property 'foo' on object '{\"foo\":[]}' does not match expected type!`,
    ))
})
