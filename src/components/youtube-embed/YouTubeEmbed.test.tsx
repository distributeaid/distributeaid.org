import { render, screen } from '@testing-library/react'
import { YouTubeEmbed } from './YouTubeEmbed'

describe('<YouTubeEmbed/>', () => {
  it('renders the video and title', () => {
    render(
      <YouTubeEmbed
        title="the title of the video"
        url="https://example.com/video"
      />,
    )

    expect(screen.getByText('the title of the video')).toBeInTheDocument()
    expect(screen.getByTitle('the title of the video')).toBeInTheDocument()
  })

  it('does not render title when none is given', () => {
    render(<YouTubeEmbed url="https://example.com/video" />)

    expect(screen.getByTitle('Youtube Video')).toBeInTheDocument()
    expect(screen.queryByTestId('YouTubeEmbed-Title')).not.toBeInTheDocument()
  })
})
