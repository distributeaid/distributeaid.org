import { ContentfulContentMarkdown } from '@types/gatsby-graphql-types.gen'
import { FunctionComponent } from 'react'

interface Props {
  content: ContentfulContentMarkdown
}

const ContentMarkdown: FunctionComponent<Props> = ({ content }) => {
  if (
    !content.entry ||
    !content.entry.childMarkdownRemark ||
    !content.entry.childMarkdownRemark.html
  ) {
    return null
  }

  const markdownHtml = content.entry.childMarkdownRemark.html

  return <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
}

export default ContentMarkdown
