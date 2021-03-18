import { FunctionComponent } from 'react'
import ContentMarkdown from './ContentMarkdown'
import ContentPhoto from './ContentPhoto'
import ContentPrezi from './ContentPrezi'

interface Props {
  section: any
  content: any
}

const Content: FunctionComponent<Props> = ({ section, content }) => {
  switch (content.internal.type) {
    case 'ContentfulContentMarkdown':
      return <ContentMarkdown content={content} />

    case 'ContentfulContentPhoto':
      return <ContentPhoto content={content} />

    case 'ContentfulContentPrezi':
      return <ContentPrezi content={content} />

    default:
      return null
  }
}

export default Content
