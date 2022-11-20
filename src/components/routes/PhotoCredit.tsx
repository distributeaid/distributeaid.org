import { FC } from 'react'

type PhotoCreditProps = {
  url: string
  description: string
}

const PhotoCredit: FC<PhotoCreditProps> = ({ url, description }) => {
  return (
    <footer>
      <p className="text-sm italic text-center">
        <span>Background photo credit:</span>{' '}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {description}
        </a>
      </p>
    </footer>
  )
}

export default PhotoCredit
