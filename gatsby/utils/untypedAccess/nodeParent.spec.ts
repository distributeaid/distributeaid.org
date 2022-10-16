import { nodeParent } from './nodeParent'

describe('nodeParent()', () => {
  it('should return the node parent', () => {
    const parent = Symbol()
    expect(nodeParent({ parent })).toEqual(parent)
  })
  it('should return undefined, if the parent is not set', () =>
    expect(nodeParent({})).toBeUndefined())
})
