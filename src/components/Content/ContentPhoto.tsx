import React from 'react'

const ContentPhoto = ({ content }) => {
  const { file, title, description } = content.entry

  return (
    <div>
      <img src={file.url} alt={description} />
      <h3>{title}</h3>
    </div>
  )
}

export default ContentPhoto
