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

// NOTE: Use the `prose` classes from the Tailwind Typography Plugin to style
//       markdown content! https://tailwindcss.com/docs/typography-plugin

const MarkdownContent: FC<Props> = ({ content }) => (
  <div className="prose">
    <ReactMarkdown children={content} components={COMPONENTS} />
  </div>
)

export default MarkdownContent
