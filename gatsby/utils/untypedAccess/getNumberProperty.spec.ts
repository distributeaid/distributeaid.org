import { getNumberProperty } from './getNumberProperty'

describe('getNumberProperty()', () => {
  it('should return a number property if present', () =>
    expect(getNumberProperty({ foo: 161 }, 'foo')).toEqual(161))

  it('should throw an error if the object is undefined', () =>
    expect(() => getNumberProperty(undefined, '161')).toThrow(
      `Received undefined when trying to access property '161'!`,
    ))

  it('should throw an error if the property is undefined', () =>
    expect(() => getNumberProperty({}, 'foo')).toThrow(
      `Object '{}' has no property 'foo'!`,
    ))

  it('should throw an error if the property is not a number', () =>
    expect(() => getNumberProperty({ foo: 'not a number' }, 'foo')).toThrow(
      `Property 'foo' on object '{\"foo\":\"not a number\"}' does not match expected type!`,
    ))
})
