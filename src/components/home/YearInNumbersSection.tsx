import { last } from 'lodash'
import { FC } from 'react'
import crateImage from '../../images/da-in-numbers/crate.svg'
import heartImage from '../../images/da-in-numbers/heart.svg'
import peopleImage from '../../images/da-in-numbers/people.svg'
import routeImage from '../../images/da-in-numbers/route.svg'

const numberFormatter = new Intl.NumberFormat()
const moneyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const content = [
  {
    figure: numberFormatter.format(2031432),
    description: 'aid items delivered',
    image: crateImage,
  },
  {
    figure: numberFormatter.format(962302),
    description: 'needs met',
    image: peopleImage,
  },
  {
    figure: moneyFormatter.format(2578255),
    description: 'value to end-beneficiary',
    image: heartImage,
  },
  {
    figure: `${numberFormatter.format(72463)} km`,
    description: 'transport arranged',
    image: routeImage,
  },
  {
    figure: `${numberFormatter.format(214284)} kg`,
    description: 'aid shipped',
    image: routeImage,
  },
]
const lastUpdate = 'May 2022'

type CardProps = {
  figure: string
  description: string
  image: string
}

const Card: FC<CardProps> = ({ figure, description, image }) => (
  <div
    className="flex justify-center items-center flex-col px-4 m-4"
    style={{ maxWidth: '150px' }}
  >
    <img
      src={image}
      width="100%"
      className="block mx-auto mb-2"
      alt={description}
    />
    <p className="text-2xl font-medium whitespace-nowrap">{figure}</p>
    <p className="text-gray-700 mb-2 whitespace-nowrap">{description}</p>
  </div>
)

const YearInNumbersSection: FC = () => (
  <section className="py-8 md:py-16 max-w-7xl mx-auto">
    <h2 className="text-4xl font-semibold mb-8 p-4 text-center">
      The last 12 months in numbers
    </h2>
    <div className="flex justify-center items-end flex-wrap">
      {content.map((section, i) => (
        <Card {...section} key={`section-${i}`} />
      ))}
    </div>

    <div className="text-center mt-8 text-gray-500 p-4 lg:px-8">
      Last update: {lastUpdate}
    </div>
  </section>
)

export default YearInNumbersSection
