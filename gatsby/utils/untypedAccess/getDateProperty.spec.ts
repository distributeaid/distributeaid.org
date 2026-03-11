import { getDateProperty } from './getDateProperty'

describe('getDateProperty()', () => {
  it('should return a Date property if present', () => {
    expect(getDateProperty({ foo: new Date('2019-01-17') }, 'foo')).toEqual(
      new Date('2019-01-17'),
    )
    expect(getDateProperty({ foo: '2019-01-17' }, 'foo')).toEqual(
      new Date('2019-01-17'),
    )
  })

  it('should throw an error if the object is undefined', () =>
    expect(() => getDateProperty(undefined, 'foo')).toThrow(
      `Received undefined when trying to access property 'foo'!`,
    ))

  it('should throw an error if the property is undefined', () =>
    expect(() => getDateProperty({}, 'foo')).toThrow(
      `Object '{}' has no property 'foo'!`,
    ))

  it('should throw an error if the property is not a Date or a datestring', () =>
    expect(() => getDateProperty({ foo: [] }, 'foo')).toThrow(
      `Property 'foo' on object '{\"foo\":[]}' does not match expected type!`,
    ))

  it('should throw an error if the property is not a valid Date or datestring', () => {
    expect(() => getDateProperty({ foo: new Date('invalid') }, 'foo')).toThrow(
      `Property 'foo' on object '{\"foo\":null}' is an invalid Date!`,
    )
    expect(() => getDateProperty({ foo: 'invalid' }, 'foo')).toThrow(
      `Property 'foo' on object '{\"foo\":\"invalid\"}' is an invalid Date!`,
    )
  })
})
