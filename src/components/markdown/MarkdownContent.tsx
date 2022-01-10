import ReactMarkdown from 'react-markdown'

import React, { FC } from 'react'

type Props = {
  /**
   * The markdown you want to render as HTML
   */
  content: string
}

const MarkdownContent: FC<Props> = ({ content }) => {
  return <ReactMarkdown children={content} />
}

export default MarkdownContent
