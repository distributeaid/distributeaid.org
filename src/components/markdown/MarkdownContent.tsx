import ReactMarkdown, { Components } from 'react-markdown'

import ExternalLink from '@components/link/ExternalLink'
import { FC, ReactElement, ReactNode } from 'react'

// Customize the components we render in markdown
// https://github.com/remarkjs/react-markdown#appendix-b-components
const COMPONENTS: Components = {
  a: ({ node, ...props }) => <ExternalLink className="link" {...props} />,
}

/**
 * The function accepted by the component that wraps the rendered content.
 */
type WrapperFN = (children: ReactNode) => ReactElement<any, any> | null

/**
 * Default wrapper, if non provided by the calling code.
 * Wraps the markdown content in `<div class="prose"><div>` where `prose` is provided by the @tailwindcss/typography plugin.
 * @see https://tailwindcss.com/docs/typography-plugin
 */
const defaultWrapper: WrapperFN = (children) => (
  <div className="prose">{children}</div>
)

export const MarkdownContent: FC<{
  /**
   * The markdown you want to render as HTML
   */
  content: string
  /**
   * The wrapper element for the markdown content, defaults to `<div class="prose"><div>` where `prose` is provided by the @tailwindcss/typography plugin.
   * @see https://tailwindcss.com/docs/typography-plugin
   */
  wrapper?: WrapperFN
}> = ({ content, wrapper }) =>
  (wrapper ?? defaultWrapper)(
    <ReactMarkdown children={content} components={COMPONENTS} />,
  )
