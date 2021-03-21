import { FunctionComponent } from 'react'

interface Props {
  content: {
    entry: {
      title: string
      description: string
      file: {
        url: string
      }
    }
  }
}

const ContentPhoto: FunctionComponent<Props> = ({ content }) => {
  const { file, title, description } = content.entry

  return (
    <div>
      <img src={file.url} alt={description} />
      <h3>{title}</h3>
    </div>
  )
}

export default ContentPhoto
