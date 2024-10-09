import { jest } from '@jest/globals'
import { CreateNodeArgs } from 'gatsby'
import { factory } from '../../src/types/generic-page.test-helpers'
import { deriveGenericPageNode } from './pages'

const newArgsMock = () => ({
  createNodeId: jest.fn(() => 'node-id'),
  createContentDigest: jest.fn(() => 'content digest'),
  reporter: {
    log: jest.fn(() => undefined),
    warn: jest.fn(() => undefined),
    error: jest.fn(() => undefined),
    panic: jest.fn(() => undefined),
  },
})

describe('Processes Page Data', () => {
  it('processes each type of page, section, and content block correctly', () => {
    // build our input
    const sectionData = factory.getSectionGridData({
      contentBlocks: [
        factory.getBlockTitleData(),
        factory.getBlockTextData(),
        factory.getBlockImageData(),
        factory.getBlockYoutubeData(),
      ],
    })

    const pageData = factory.getPageData({
      sections: [sectionData, sectionData],
    })

    // build our output
    const section = factory.getSectionGridNodeInput({
      blocks: [
        factory.getBlockTitleNodeInput(),
        factory.getBlockTextNodeInput(),
        factory.getBlockImageNodeInput(),
        factory.getBlockYoutubeNodeInput(),
      ],
    })

    const page = factory.getPageNodeInput({
      sections: [section, section],
    })

    const argsMock = newArgsMock()

    // compare
    const derivedData = deriveGenericPageNode(
      pageData,
      'parent-id',
      argsMock as unknown as CreateNodeArgs,
    )
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(0)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(0)
  })

  it('logs a warning on empty pages', () => {
    // build our input
    const pageData = factory.getPageData()

    // build our output
    const page = factory.getPageNodeInput()

    const argsMock = newArgsMock()

    // compare
    const derivedData = deriveGenericPageNode(
      pageData,
      'parent-id',
      argsMock as unknown as CreateNodeArgs,
    )
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(1)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(0)
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

    const argsMock = newArgsMock()

    // compare
    const derivedData = deriveGenericPageNode(
      pageData,
      'parent-id',
      argsMock as unknown as CreateNodeArgs,
    )
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

    const argsMock = newArgsMock()

    // compare
    const derivedData = deriveGenericPageNode(
      pageData,
      'parent-id',
      argsMock as unknown as CreateNodeArgs,
    )
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(4)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(0)
  })
})
