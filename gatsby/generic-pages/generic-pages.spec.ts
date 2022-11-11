import { jest } from '@jest/globals'

import { CreateNodeArgs } from 'gatsby'

import { factory } from '../../src/types/generic-page.test-helpers'
import { deriveGenericPageNode } from './pages'

// TODO
// ----
// Can't figure out a better way to mock CreateNodeArgs to make TypeScript happy,
// or a meaningful way to refactor them out of the data processing function.
//
// At the very least it'd be nice to have the reporter function mocks provide
// a counter so we can test that they are being called the appropriate # of
// times for various sample input data.
let argsMock = {
  createNodeId: jest.fn((x) => 'node-id'),
  createContentDigest: jest.fn((x) => 'content digest'),
  reporter: {
    log: jest.fn((x) => undefined),
    warn: jest.fn((x) => undefined),
    error: jest.fn((x) => undefined),
    panic: jest.fn((x) => undefined),
  },
}
// @ts-ignore
let args = argsMock as CreateNodeArgs

describe('Processes Page Data', () => {
  beforeEach(() => {
    argsMock.createNodeId.mockClear()
    argsMock.createContentDigest.mockClear()
    argsMock.reporter.log.mockClear()
    argsMock.reporter.warn.mockClear()
    argsMock.reporter.error.mockClear()
    argsMock.reporter.panic.mockClear()
  })

  it('processes each type of page, section, and content block correctly', () => {
    // build our input
    const sectionData = factory.getSectionGridData({
      contentBlocks: [factory.getBlockTitleData(), factory.getBlockTextData()],
    })

    const pageData = factory.getPageData({
      sections: [sectionData, sectionData],
    })

    // build our output
    const section = factory.getSectionGridNodeInput({
      blocks: [
        factory.getBlockTitleNodeInput(),
        factory.getBlockTextNodeInput(),
      ],
    })

    const page = factory.getPageNodeInput({
      sections: [section, section],
    })

    // compare
    const derivedData = deriveGenericPageNode(pageData, 'parent-id', args)
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(0)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(0)
  })

  it('panics on empty pages', () => {
    // build our input
    const pageData = factory.getPageData()

    // build our output
    const page = factory.getPageNodeInput()

    // compare
    const derivedData = deriveGenericPageNode(pageData, 'parent-id', args)
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(0)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(1)
  })

  it('processes pages with empty sections gracefully by dropping them', () => {
    // build our input
    const pageData = factory.getPageData({
      sections: [
        factory.getSectionGridData(),
        factory.getSectionGridData({
          contentBlocks: [factory.getBlockTitleData()],
        }),
        factory.getSectionGridData(),
      ],
    })

    // build our output
    const page = factory.getPageNodeInput({
      sections: [
        factory.getSectionGridNodeInput({
          blocks: [factory.getBlockTitleNodeInput()],
        }),
      ],
    })

    // compare
    const derivedData = deriveGenericPageNode(pageData, 'parent-id', args)
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(2)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(0)
  })

  it('handles unknown sections & content gracefully by dropping them', () => {
    // build our input
    const pageData = factory.getPageData({
      sections: [
        factory.getSectionUnknownData(),
        factory.getSectionGridData({
          contentBlocks: [
            factory.getBlockUnknownData(),
            factory.getBlockTitleData(),
            factory.getBlockUnknownData(),
          ],
        }),
        factory.getSectionUnknownData(),
      ],
    })

    // build our output
    const page = factory.getPageNodeInput({
      sections: [
        factory.getSectionGridNodeInput({
          blocks: [factory.getBlockTitleNodeInput()],
        }),
      ],
    })

    // compare
    const derivedData = deriveGenericPageNode(pageData, 'parent-id', args)
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(4)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(0)
  })
})
