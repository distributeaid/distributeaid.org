import React from 'react'

const ContentPrezi = ({ content }) => {
  const { width, height, embedUrl } = content

  return (
    <iframe
      width={width}
      height={height}
      src={embedUrl}
      webkitAllowFullscreen="1"
      mozAllowFullscreen="1"
      allowFullScreen="1"
    ></iframe>
  )
}

export default ContentPrezi
