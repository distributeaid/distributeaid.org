import { getArrayProperty } from './getArrayProperty'

describe('getObjectProperty()', () => {
  it('should return a string property if present', () => {
    expect(getArrayProperty({ foo: ['bar'] }, 'foo')).toEqual(['bar'])
  })

  it('should throw an error if the object is undefined', () =>
    expect(() => getArrayProperty(undefined, 'foo')).toThrow(
      `Received undefined when trying to access property 'foo'!`,
    ))

  it('should throw an error if the property is undefined', () =>
    expect(() => getArrayProperty({}, 'foo')).toThrow(
      `Object '{}' has no property 'foo'!`,
    ))

  it('should throw an error if the property is not a string', () =>
    expect(() => getArrayProperty({ foo: {} }, 'foo')).toThrow(
      `Property 'foo' on object '{\"foo\":{}}' does not match expected type!`,
    ))
})
