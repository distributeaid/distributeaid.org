import { YouTubeEmbed } from './YouTubeEmbed'
import { render, screen } from '@testing-library/react'

describe('<YouTubeEmbed/>', () => {
  it('renders the video and title', () => {
    render(
      <YouTubeEmbed
        videoTitle="the title of the video"
        videoUrl="https://example.com/video"
      />,
    )

    expect(screen.getByText('the title of the video'))
    expect(screen.getByTitle('YouTube embed')).toBeInTheDocument()
  })
})
