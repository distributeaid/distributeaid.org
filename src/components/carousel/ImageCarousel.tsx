import { FunctionComponent } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CarouselImage from './CarouselImage'

interface Props {}

const placeholderCarouselObjects = {
  0: {
    alt: 'props.alt',
    className: 'block h-auto w-full',
    src: 'https://picsum.photos/400/400/?random',
  },
  1: {
    alt: 'props.alt',
    className: 'block h-auto w-full',
    src: 'https://i.picsum.photos/id/146/400/400.jpg?hmac=xfQnxSRKjuIlGMTO-7iBJoLIdE2poilSwEDrZ03Hovk',
  },
  2: {
    alt: 'props.alt',
    className: 'block h-auto w-full',
    src: 'https://i.picsum.photos/id/178/400/400.jpg?hmac=5CGtj32WCAo6Xc0wgIuoADrWJyjDyRs9YsToZoBNNVo',
  },
  3: {
    alt: 'props.alt',
    className: 'block h-auto w-full',
    src: 'https://i.picsum.photos/id/268/400/400.jpg?hmac=N91-wWLhn4DH-MeV-9-ITdWNPTH4g7cCwcoH_jR1NhY',
  },
}

const ImageCarousel: FunctionComponent<Props> = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  let carouselItems = Object.keys(placeholderCarouselObjects).map(function (
    key,
    index,
  ) {
    return (
      <CarouselImage
        key={key}
        alt={placeholderCarouselObjects[key].alt}
        src={placeholderCarouselObjects[key].src}
        className={placeholderCarouselObjects[key].className}
      ></CarouselImage>
    )
  })

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={false} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      //this.props.deviceType !== "mobile" ? true : false
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile']}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      centerMode={true}
    >
      {carouselItems}
    </Carousel>
  )
}

export default ImageCarousel
