import { deriveGenericPageNode } from './pages'

import { CreateNodeArgs } from 'gatsby'

import { jest } from '@jest/globals'

// TODO
// ----
// Can't figure out a better way to mock CreateNodeArgs to make TypeScript happy,
// or a meaningful way to refactor them out of the data processing function.
//
// At the very least it'd be nice to have the reporter function mocks provide
// a counter so we can test that they are being called the appropriate # of
// times for various sample input data.
let argsMock = {
  createNodeId: jest.fn((x) => 'node id'),
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
    const sectionInput = getSectionGridInput({
      contentBlocks: [getBlockTitleInput(), getBlockTextInput()],
    })

    const pageInput = getPageInput({
      sections: [sectionInput, sectionInput],
    })

    // build our output
    const section = getSectionGrid({
      blocks: [getBlockTitle(), getBlockText()],
    })

    const page = getPage({
      sections: [section, section],
    })

    // compare
    const derivedData = deriveGenericPageNode(pageInput, 'parent id', args)
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(0)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(0)
  })

  it('panics on empty pages', () => {
    // build our input
    const pageInput = getPageInput()

    // build our output
    const page = getPage()

    // compare
    const derivedData = deriveGenericPageNode(pageInput, 'parent id', args)
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(0)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(1)
  })

  it('processes pages with empty sections gracefully by dropping them', () => {
    // build our input
    const pageInput = getPageInput({
      sections: [
        getSectionGridInput(),
        getSectionGridInput({
          contentBlocks: [getBlockTitleInput()],
        }),
        getSectionGridInput(),
      ],
    })

    // build our output
    const page = getPage({
      sections: [
        getSectionGrid({
          blocks: [getBlockTitle()],
        }),
      ],
    })

    // compare
    const derivedData = deriveGenericPageNode(pageInput, 'parent id', args)
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(2)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(0)
  })

  it('handles unknown sections & content gracefully by dropping them', () => {
    // build our input
    const pageInput = getPageInput({
      sections: [
        getSectionUnknownInput(),
        getSectionGridInput({
          contentBlocks: [
            getBlockUnknownInput(),
            getBlockTitleInput(),
            getBlockUnknownInput(),
          ],
        }),
        getSectionUnknownInput(),
      ],
    })

    // build our output
    const page = getPage({
      sections: [
        getSectionGrid({
          blocks: [getBlockTitle()],
        }),
      ],
    })

    // compare
    const derivedData = deriveGenericPageNode(pageInput, 'parent id', args)
    expect(derivedData).toStrictEqual(page)

    // check side-effects
    expect(argsMock.reporter.log.mock.calls.length).toBe(0)
    expect(argsMock.reporter.warn.mock.calls.length).toBe(4)
    expect(argsMock.reporter.error.mock.calls.length).toBe(0)
    expect(argsMock.reporter.panic.mock.calls.length).toBe(0)
  })
})

/*
Page
------------------------------------------------------------
*/
const getPageInput = (props?: Record<string, any>) => {
  return {
    title: 'My Page Title',
    slug: 'my-page',
    desc: 'A custom test page.',
    sections: [] as any[],
    ...props,

    template: 'DAPageGeneric',
  }
}

const getPage = (props?: Record<string, any>) => {
  return {
    title: 'My Page Title',
    description: 'A custom test page.',
    sections: [] as any[],
    slug: 'my-page',
    path: '/my-page/',
    id: 'node id',
    parent: 'parent id',
    children: [],
    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DAPageGeneric',
    },
  }
}

/*
Section: Grid
------------------------------------------------------------
*/
const getSectionGridInput = (props?: Record<string, any>) => {
  return {
    contentBlocks: [] as any[],
    ...props,

    metadata: {
      margins: 'Margined',
      numCols: 1,
      numRows: 1,
      colOrRowBound: 'Column-Bound',
      order: 'top-to-bottom',
      ...props?.metadata,
    },

    template: 'section-grid',
  }
}

const getSectionGrid = (props?: Record<string, any>) => {
  return {
    id: 'node id',
    parent: 'parent id',
    children: [],
    blocks: [] as any[],
    ...props,

    options: {
      rows: 1,
      cols: 1,
      margin: 'MARGIN',
      layout: 'COL',
      order: 'VERTICAL',
      ...props?.options,
    },

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DASectionGrid',
    },
  }
}

/*
Section: Unknown
------------------------------------------------------------
*/
const getSectionUnknownInput = (props?: Record<string, any>) => {
  return {
    metadata: {},
    contentBlocks: [] as any[],
    ...props,

    template: 'section-unknown',
  }
}

/*
Block: Title
------------------------------------------------------------
*/
const getBlockTitleInput = (props?: Record<string, any>) => {
  return {
    text: 'General Inquiries',
    ...props,

    template: 'block-title',
  }
}

const getBlockTitle = (props?: Record<string, any>) => {
  return {
    text: 'General Inquiries',
    id: 'node id',
    parent: 'parent id',
    children: [],
    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockTitle',
    },
  }
}

/*
Block: Text
------------------------------------------------------------
*/
const getBlockTextInput = (props?: Record<string, any>) => {
  return {
    text: 'The best way to get in touch with Distribute Aid is to email us at [me@example.org](mailto:me@example.org)!',
    ...props,

    template: 'block-text',
  }
}

const getBlockText = (props?: Record<string, any>) => {
  return {
    id: 'node id',
    parent: 'parent id',
    children: [],
    text: 'The best way to get in touch with Distribute Aid is to email us at [me@example.org](mailto:me@example.org)!',
    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockText',
    },
  }
}

/*
Block: Unknown
------------------------------------------------------------
*/
const getBlockUnknownInput = (props?: Record<string, any>) => {
  return {
    ...props,
    template: 'block-unknown',
  }
}
