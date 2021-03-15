import React from 'react'
import ContentMarkdown from './ContentMarkdown'
import ContentPhoto from './ContentPhoto'
import ContentPrezi from './ContentPrezi'

const Content = ({ section, content }) => {
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
