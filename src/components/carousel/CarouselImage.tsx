import { FunctionComponent } from 'react'

interface Props {
  alt: string
  className: string
  src: string
}

const CarouselImage: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <img alt={props.alt} className={props.className} src={props.src}></img>
    </div>
  )
}

export default CarouselImage
