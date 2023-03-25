import { render } from '@testing-library/react'
import { BlockNode } from '../../types/generic-page.d'
import { factory } from '../../types/generic-page.test-helpers'
import { Block, Blocks } from './ContentBlock'

/*
Blocks
================================================================================
*/
describe('Blocks', () => {
  let blocks: BlockNode[]

  beforeEach(() => {
    blocks = [
      factory.getBlockTitleNode({ text: 'My Title' }),
      factory.getBlockTextNode({ text: 'My text.' }),
      factory.getBlockYoutubeNode({ title: 'My video.' }),
      factory.getBlockImageNode({ alt: 'My Alt' }),
    ]
  })

  it('can render multiple blocks', () => {
    const { getByText, getByAltText } = render(<Blocks blocks={blocks} />)

    const titleElem = getByText('My Title')
    expect(titleElem).toBeTruthy()

    const textElem = getByText('My text.')
    expect(textElem).toBeTruthy()

    const youTubeElem = getByText('My video.')
    expect(youTubeElem).toBeTruthy()

    const imageElem = getByAltText('My Alt')
    expect(imageElem).toBeTruthy()
  })

  it('gracefully drops unimplemented block types', () => {
    blocks = blocks.concat([
      factory.getBlockTimelineNode(),
      factory.getBlockCardNode(),
    ])

    const { getByText, queryByText } = render(<Blocks blocks={blocks} />)
    const titleElem = getByText('My Title')
    expect(titleElem).toBeTruthy()

    const textElem = getByText('My text.')
    expect(textElem).toBeTruthy()

    const timelineEntryElem = queryByText('2020')
    expect(timelineEntryElem).toBeFalsy()

    // TODO: add tests asserting card are dropped
  })

  it('throws an error when a block has an unknown type', () => {
    // NOTE: `render` gets noisy with the error logging
    const surpressErrorLogs = jest.spyOn(console, 'error')
    surpressErrorLogs.mockImplementation(() => {})

    blocks = [factory.getBlockUnknownNode()]
    expect(() => {
      render(<Blocks blocks={blocks} />)
    }).toThrow(/unknown/i)

    surpressErrorLogs.mockRestore()
  })
})

/*
Block
================================================================================
*/
describe('Block', () => {
  it('can render a title block', () => {
    const block = factory.getBlockTitleNode({ text: 'My Title' })
    const { getByText } = render(<Block block={block} />)
    const titleElem = getByText('My Title')
    expect(titleElem).toBeTruthy()
  })

  it('can render a text block', () => {
    const block = factory.getBlockTextNode({ text: 'My text.' })
    const { getByText } = render(<Block block={block} />)
    const textElem = getByText('My text.')
    expect(textElem).toBeTruthy()
  })

  it('can render a youtube block', () => {
    const block = factory.getBlockYoutubeNode({ title: 'My video.' })
    const { getByText } = render(<Block block={block} />)
    const youtubeElem = getByText('My video.')
    expect(youtubeElem).toBeTruthy()
  })

  it('can render an image block', () => {
    const block = factory.getBlockImageNode({ alt: 'My Alt' })
    const { getByAltText } = render(<Block block={block} />)
    const imageElem = getByAltText('My Alt')
    expect(imageElem).toBeTruthy()
  })

  test.todo('can render a timeline block')
  test.todo('can render a links list block')
  test.todo('can render an updates list block')
  test.todo('can render a card block')

  it('throws an error when a block has an unknown type', () => {
    // NOTE: `render` gets noisy with the error logging
    const surpressErrorLogs = jest.spyOn(console, 'error')
    surpressErrorLogs.mockImplementation(() => {})

    expect(() => {
      const block = factory.getBlockUnknownNode()
      render(<Block block={block} />)
    }).toThrow(/unknown/i)

    surpressErrorLogs.mockRestore()
  })
})
