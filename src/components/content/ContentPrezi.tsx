import { FunctionComponent } from 'react'
import { ContentfulContentPrezi } from '../../types/gatsby-graphql-types.gen'

interface Props {
  content: ContentfulContentPrezi
}

const ContentPrezi: FunctionComponent<Props> = ({ content }) => {
  if (!content.embedUrl) {
    return null
  }

  const { width, height, embedUrl } = content

  return (
    <iframe
      width={width ? width : 550}
      height={height ? height : 400}
      src={embedUrl}
      allowFullScreen={true}
    ></iframe>
  )
}

export default ContentPrezi
