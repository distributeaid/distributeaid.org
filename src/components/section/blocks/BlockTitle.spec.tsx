import { render } from '@testing-library/react'
import { BlockTitleNode } from '../../../types/generic-page.d'
import { BlockTitle } from './BlockTitle'

describe('BlockTitle', () => {
  it('renders the title', () => {
    const block = {
      text: 'General Inquiries',
    } as BlockTitleNode
    const { getByText } = render(<BlockTitle block={block} />)
    const title = getByText('General Inquiries')
    expect(title).toBeTruthy()
  })
})
