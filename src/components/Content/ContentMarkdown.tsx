import React from 'react'

const ContentMarkdown = ({ content }) => {
  const markdownHtml = content.entry.childMarkdownRemark.html

  return <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
}

export default ContentMarkdown
