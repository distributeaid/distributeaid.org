import { getStringProperty } from './getStringProperty'

describe('getStringProperty()', () => {
  it('should return a string property if present', () =>
    expect(getStringProperty({ foo: 'bar' }, 'foo')).toEqual('bar'))

  it('should throw an error if the object is undefined', () =>
    expect(() => getStringProperty(undefined, 'foo')).toThrow(
      `Received undefined when trying to access property 'foo'!`,
    ))

  it('should throw an error if the property is undefined', () =>
    expect(() => getStringProperty({}, 'foo')).toThrow(
      `Object '{}' has no property 'foo'!`,
    ))

  it('should throw an error if the property is not a string', () =>
    expect(() => getStringProperty({ foo: [] }, 'foo')).toThrow(
      `Property 'foo' on object '{\"foo\":[]}' does not match expected type!`,
    ))
})
