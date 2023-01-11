import { render } from '@testing-library/react'
import { BlockLinksList as BlockLinksListType } from '../../../types/generic-page.d'
import { BlockLinksList } from './BlockLinksList'

describe('BlockLinksList', () => {
  it('renders the title and links', () => {
    const block = {
      title: 'Links List',
      links: [
        { label: 'Distribute Aid', url: 'https://distributeaid.org' },
        {
          label: 'Donate',
          url: 'https://distributeaid.org/donate',
          description: 'Fund the aid movement!',
        },
      ],
    } as BlockLinksListType
    const { container, getByText } = render(<BlockLinksList block={block} />)

    const title = getByText('Links List')
    expect(title).toBeTruthy()

    const label1 = getByText('Distribute Aid')
    expect(label1).toBeTruthy()
    const label2 = getByText('Distribute Aid')
    expect(label2).toBeTruthy()

    const link1 = container.querySelector('a[href="https://distributeaid.org"]')
    expect(link1).toBeTruthy()
    const link2 = container.querySelector(
      'a[href="https://distributeaid.org/donate"]',
    )
    expect(link2).toBeTruthy()

    const description2 = getByText('Fund the aid movement!')
    expect(description2).toBeTruthy()
  })
})
