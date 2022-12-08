import { render } from '@testing-library/react'
import { BlockYoutubeNode } from '../../../types/generic-page.d'
import { BlockYouTube } from './BlockYouTube'

describe('BlockYouTube', () => {
  it('renders the title', () => {
    const block = {
      embedUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'My video',
    } as BlockYoutubeNode
    const { getByText } = render(<BlockYouTube block={block} />)
    const title = getByText('My video')
    expect(title).toBeTruthy()
  })
})
