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
    ]
  })

  it('can render multiple blocks', () => {
    const { getByText } = render(<Blocks blocks={blocks} />)

    const title = getByText('My Title')
    expect(title).toBeTruthy()

    const text = getByText('My text.')
    expect(text).toBeTruthy()
  })

  it('gracefully drops unimplemented block types', () => {
    blocks = blocks.concat([
      factory.getBlockYoutubeNode(),
      factory.getBlockTimelineNode(),
      factory.getBlockImageNode(),
      factory.getBlockCardNode(),
    ])

    const { getByText, queryByText } = render(<Blocks blocks={blocks} />)
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
    const title = getByText('My Title')
    expect(title).toBeTruthy()
  })

  it('can render a text block', () => {
    const block = factory.getBlockTextNode({ text: 'My text.' })
    const { getByText } = render(<Block block={block} />)
    const text = getByText('My text.')
    expect(text).toBeTruthy()
  })

  test.todo('can render a youtube block')
  test.todo('can render a timeline block')
  test.todo('can render a links list block')
  test.todo('can render an updates list block')
  test.todo('can render an image block')
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
