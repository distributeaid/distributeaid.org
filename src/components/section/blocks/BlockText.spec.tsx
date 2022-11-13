import { render } from '@testing-library/react'
import { BlockTextNode } from '../../../types/generic-page.d'
import { BlockText } from './BlockText'

describe('BlockText', () => {
  it('renders the markdown text', () => {
    const block = {
      text: 'The best way to get in touch with Distribute Aid is to email us at [me@example.org](mailto:me@example.org)!',
    } as BlockTextNode
    const { container } = render(<BlockText block={block} />)
    const link = container.querySelector('a[href="mailto:me@example.org"]')
    expect(link).toBeTruthy()
  })
})
