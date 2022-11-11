import { render } from '@testing-library/react'

import { SectionNode } from '../../types/generic-page.d'
import { factory } from '../../types/generic-page.test-helpers'

import { Section, Sections } from './Section'

/*
Sections
================================================================================
*/
describe('Sections', () => {
  let sections: SectionNode[]

  beforeEach(() => {
    sections = [
      factory.getSectionGridNode({
        blocks: [
          factory.getBlockTitleNode({ text: 'My Title' }),
          factory.getBlockTextNode({ text: 'My text.' }),
        ],
      }),
      factory.getSectionGridNode({
        blocks: [
          factory.getBlockTitleNode({ text: 'My Other Title' }),
          factory.getBlockTextNode({ text: 'My Other Text' }),
        ],
      }),
    ]
  })

  it('can render sections with multiple blocks', () => {
    const { getByText } = render(<Sections sections={sections} />)

    const title = getByText('My Title')
    expect(title).toBeTruthy()

    const text = getByText('My text.')
    expect(text).toBeTruthy()
  })

  it('gracefully drops unimplemented section and block types', () => {
    // NOTE: there are currently no unimplemented section types - 2022-11-11

    sections[1] = factory.getSectionGridNode({
      blocks: [
        factory.getBlockYoutubeNode(),
        factory.getBlockTimelineNode(),
        factory.getBlockImageNode(),
        factory.getBlockCardNode(),
      ],
    })

    const { getByText, queryByText } = render(<Sections sections={sections} />)
    const title = getByText('My Title')
    expect(title).toBeTruthy()

    const text = getByText('My text.')
    expect(text).toBeTruthy()

    const youtube = queryByText('youtube')
    expect(youtube).toBeFalsy()

    const timelineEntry = queryByText('2020')
    expect(timelineEntry).toBeFalsy()

    // TODO: add tests asserting image & card are dropped
  })

  it('throws an error when a section or block has an unknown type', () => {
    // NOTE: `render` gets noisy with the error logging
    const surpressErrorLogs = jest.spyOn(console, 'error')
    surpressErrorLogs.mockImplementation(() => {})

    sections[0] = factory.getSectionUnknownNode()
    expect(() => {
      render(<Sections sections={sections} />)
    }).toThrow(/unknown/i)

    sections[0] = factory.getSectionGridNode({
      blocks: [factory.getBlockUnknownNode()],
    })
    expect(() => {
      render(<Sections sections={sections} />)
    }).toThrow(/unknown/i)

    surpressErrorLogs.mockRestore()
  })
})

/*
Section
================================================================================
*/
describe('Section', () => {
  it('can render a grid section with content blocks', () => {
    const section = factory.getSectionGridNode({
      blocks: [
        factory.getBlockTitleNode({ text: 'My Title' }),
        factory.getBlockTextNode({ text: 'My text.' }),
      ],
    })
    const { getByText } = render(<Section section={section} />)

    const title = getByText('My Title')
    expect(title).toBeTruthy()

    const text = getByText('My text.')
    expect(text).toBeTruthy()
  })

  it('throws an error when the section or a block has an unknown type', () => {
    // NOTE: `render` gets noisy with the error logging
    const surpressErrorLogs = jest.spyOn(console, 'error')
    surpressErrorLogs.mockImplementation(() => {})

    let section = factory.getSectionUnknownNode({
      blocks: [
        factory.getBlockTitleNode({ text: 'My Title' }),
        factory.getBlockTextNode({ text: 'My text.' }),
      ],
    })
    expect(() => {
      render(<Section section={section} />)
    }).toThrow(/unknown/i)

    section = factory.getSectionGridNode({
      blocks: [factory.getBlockUnknownNode()],
    })
    expect(() => {
      render(<Section section={section} />)
    }).toThrow(/unknown/i)

    surpressErrorLogs.mockRestore()
  })
})
