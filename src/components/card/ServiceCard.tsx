import { FunctionComponent } from 'react'

interface Props {
  alt: string
  src: string
  header: string
  subheader: string
}

const ServiceCard: FunctionComponent<Props> = (props) => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      {/* <!-- Article --> */}
      <article className="overflow-hidden rounded-lg shadow-lg">
        <a href="#">
          <img
            alt={props.alt}
            className="block h-auto w-full"
            src={props.src}
          ></img>
        </a>

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href="#">
              {props.header}
            </a>
          </h1>
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <a
            className="flex items-center no-underline hover:underline text-black"
            href="#"
          >
            <p className="ml-2 text-sm">{props.subheader}</p>
          </a>
          <a
            className="no-underline text-grey-darker hover:text-red-dark"
            href="#"
          >
            <span className="hidden">Like</span>
            <i className="fa fa-heart"></i>
          </a>
        </footer>
      </article>
      {/* <!-- END Article --> */}
    </div>
  )
}

export default ServiceCard
