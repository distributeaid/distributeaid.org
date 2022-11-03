import { deriveGenericPageNode } from './pages'
import {
  pageFrontmatter as validPageFm,
  derivedData as validDerivedData,
} from './valid-page.test-data.json'
import {
  pageFrontmatter as pageWithUnknownsFm,
  derivedData as derviedDataWithoutUnknowns,
} from './valid-page-with-unknown-sections-and-blocks.test-data.json'

import { CreateNodeArgs } from 'gatsby'

// TODO
// ----
// Can't figure out a better way to mock CreateNodeArgs to make TypeScript happy,
// or a meaningful way to refactor them out of the data processing function.
//
// At the very least it'd be nice to have the reporter function mocks provide
// a counter so we can test that they are being called the appropriate # of
// times for various sample input data.
//
// @ts-ignore
const args = {
  createNodeId: jest.fn((x) => 'node id'),
  createContentDigest: jest.fn((x) => 'content digest'),
  reporter: {
    log: jest.fn((x) => undefined),
    warn: jest.fn((x) => undefined),
    error: jest.fn((x) => undefined),
  },
} as CreateNodeArgs

describe('Processes Page Data', () => {
  it('processes the page data correctly', () => {
    const derivedData = deriveGenericPageNode(validPageFm, 'parent id', args)
    expect(derivedData).toStrictEqual(validDerivedData)
  })

  it('handles unknown sections & content gracefully by dropping them', () => {
    const derivedData = deriveGenericPageNode(
      pageWithUnknownsFm,
      'parent id',
      args,
    )
    expect(derivedData).toStrictEqual(derviedDataWithoutUnknowns)

    // TODO: ensure log.warn was called appropriate # of times for dropped sections / blocks
  })
})
