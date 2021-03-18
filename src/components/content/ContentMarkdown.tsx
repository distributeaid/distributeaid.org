import { FunctionComponent } from 'react'

interface Props {
  content: { entry: { childMarkdownRemark: { html: string } } }
}

const ContentMarkdown: FunctionComponent<Props> = ({ content }) => {
  const markdownHtml = content.entry.childMarkdownRemark.html

  return <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
}

export default ContentMarkdown
