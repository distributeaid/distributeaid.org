import { render } from '@testing-library/react'
import { factory } from '../../../types/generic-page.test-helpers'
import { BlockImage } from './BlockImage'

describe('BlockImage', () => {
  it('renders the image and related content', () => {
    const block = factory.getBlockImageNode({ alt: 'My Alt' })
    const { getByTestId } = render(<BlockImage block={block} />)
    const title = getByTestId('BlockImage')
    expect(title).toBeTruthy()
  })
})
