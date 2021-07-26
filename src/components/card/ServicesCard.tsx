import { FunctionComponent } from 'react'

interface Props {
  hideIfEmpty?: boolean
  stacked?: boolean
}

const CardGrid: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {/* <!-- Column --> */}
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
          {/* <!-- Article --> */}
          <article className="overflow-hidden rounded-lg shadow-lg">
            <a href="#">
              <img
                alt="Placeholder"
                className="block h-auto w-full"
                src="https://picsum.photos/600/400/?random"
              ></img>
            </a>

            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                <a className="no-underline hover:underline text-black" href="#">
                  Article Title
                </a>
              </h1>
              <p className="text-grey-darker text-sm">11/1/19</p>
            </header>

            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
              <a
                className="flex items-center no-underline hover:underline text-black"
                href="#"
              >
                <img
                  alt="Placeholder"
                  className="block rounded-full"
                  src="https://picsum.photos/32/32/?random"
                ></img>
                <p className="ml-2 text-sm">Author Name</p>
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
        {/* <!-- END Column --> */}
      </div>
    </div>
  )
}

export default CardGrid
