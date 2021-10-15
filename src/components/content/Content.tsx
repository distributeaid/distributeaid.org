import {
  ContentfulContentMarkdownContentfulContentPhotoContentfulContentPreziUnion,
  ContentfulSitePageSection,
} from '@types/gatsby-graphql-types.gen'
import { FunctionComponent } from 'react'
import ContentMarkdown from './ContentMarkdown'
import ContentPhoto from './ContentPhoto'
import ContentPrezi from './ContentPrezi'

interface Props {
  section: ContentfulSitePageSection
  content: ContentfulContentMarkdownContentfulContentPhotoContentfulContentPreziUnion
}

const Content: FunctionComponent<Props> = ({ section, content }) => {
  switch (content.__typename) {
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
