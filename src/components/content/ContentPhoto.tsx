import { ContentfulContentPhoto } from '@types/gatsby-graphql-types.gen'
import { FunctionComponent } from 'react'

interface Props {
  content: ContentfulContentPhoto
}

const ContentPhoto: FunctionComponent<Props> = ({ content }) => {
  if (!content.entry) {
    return null
  }

  const { file, title, description } = content.entry

  if (!file || !file.url) {
    return null
  }

  return (
    <div>
      <img src={file.url} alt={`${description}`} />
      {title && <h3>{title}</h3>}
    </div>
  )
}

export default ContentPhoto
