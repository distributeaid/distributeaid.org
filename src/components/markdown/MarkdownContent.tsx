import ReactMarkdown, { Components } from 'react-markdown'

import { FC } from 'react'
import ExternalLink from '@components/link/ExternalLink'

type Props = {
  /**
   * The markdown you want to render as HTML
   */
  content: string
}

// Customize the components we render in markdown
// https://github.com/remarkjs/react-markdown#appendix-b-components
const COMPONENTS: Components = {
  a: ({ node, ...props }) => <ExternalLink className="link" {...props} />,
}

const MarkdownContent: FC<Props> = ({ content }) => (
  <ReactMarkdown children={content} components={COMPONENTS} />
)

export default MarkdownContent
