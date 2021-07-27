import { FunctionComponent } from 'react'
import ServiceCard from './ServiceCard'

interface Props {
  hideIfEmpty?: boolean
  stacked?: boolean
}

const placeholderCardObject = {
  0: {
    alt: 'Placeholder',
    src: 'https://picsum.photos/600/400/?random',
    header: 'Title',
    subheader: 'Location',
  },
  1: {
    alt: 'Placeholder2',
    src: 'https://picsum.photos/600/400/?random',
    header: 'Title2',
    subheader: 'Location2',
  },
}

const CardGrid: FunctionComponent<Props> = ({ children }) => {
  let cards = Object.keys(placeholderCardObject).map(function (key, index) {
    return (
      <ServiceCard
        key={key}
        alt={placeholderCardObject[key].alt}
        src={placeholderCardObject[key].src}
        header={placeholderCardObject[key].header}
        subheader={placeholderCardObject[key].subheader}
      ></ServiceCard>
    )
  })

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">{cards}</div>
    </div>
  )
}

export default CardGrid
