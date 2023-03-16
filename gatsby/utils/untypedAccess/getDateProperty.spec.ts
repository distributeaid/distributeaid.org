import { getDateProperty } from './getDateProperty'

describe('getNumberProperty()', () => {
  it('should return a Date property if present', () =>
    expect(getDateProperty({ foo: new Date('2019-01-17') }, 'foo')).toEqual(
      new Date('2019-01-17'),
    ))

  it('should throw an error if the object is undefined', () =>
    expect(() => getDateProperty(undefined, 'foo')).toThrow(
      `Received undefined when trying to access property 'foo'!`,
    ))

  it('should throw an error if the property is undefined', () =>
    expect(() => getDateProperty({}, 'foo')).toThrow(
      `Object '{}' has no property 'foo'!`,
    ))

  it('should throw an error if the property is not a Date', () =>
    expect(() => getDateProperty({ foo: 'not a Date' }, 'foo')).toThrow(
      `Property 'foo' on object '{\"foo\":\"not a Date\"}' does not match expected type!`,
    ))
})
