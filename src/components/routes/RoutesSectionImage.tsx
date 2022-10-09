import { FunctionComponent } from 'react'

interface Props {
  image: string
  ariaLabel: string
}

const RoutesSectionImage: FunctionComponent<Props> = ({ image, ariaLabel }) => (
  <div
    role="img"
    aria-label={ariaLabel}
    className="bg-center bg-no-repeat bg-cover bg-slate-200 w-full md:w-2/4 h-96 md:h-auto"
    style={{ backgroundImage: `url(${image})` }}
  ></div>
)

export default RoutesSectionImage
