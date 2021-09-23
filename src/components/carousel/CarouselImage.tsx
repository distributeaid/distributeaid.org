import { FunctionComponent } from 'react'

interface Props {
  alt: string
  className: string
  src: string
}

const CarouselImage: FunctionComponent<Props> = (props) => {
  return (
    //TODO: Replace with Gatsby image
    <img alt={props.alt} className={props.className} src={props.src}></img>
  )
}

export default CarouselImage
