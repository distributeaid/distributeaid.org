import { FC } from 'react'

const crateImage = require('../../images/da-in-numbers/crate.svg')
const routeImage = require('../../images/da-in-numbers/route.svg')
const handsParcel = require('../../images/da-in-numbers/hands-parcel.svg')
const handsPluses = require('../../images/da-in-numbers/hands-pluses.svg')
const pallet = require('../../images/da-in-numbers/pallet.svg')
const shakingHands = require('../../images/da-in-numbers/hands-shaking.svg')

const numberFormatter = new Intl.NumberFormat()
const usdFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})
const eurFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const content: CardProps[] = [
  {
    figure: numberFormatter.format(32),
    description: 'shipments',
    image: crateImage,
  },
  {
    figure: numberFormatter.format(1117000),
    description: 'needs met',
    image: handsParcel,
  },
  {
    figure: eurFormatter.format(6124150),
    description: 'value to end-beneficiary',
    image: handsPluses,
    addon: {
      figure: usdFormatter.format(14730500),
      description: 'retail value (based on USA GDP)',
    },
  },
  {
    figure: `${numberFormatter.format(96500)} km`,
    description: 'traveled',
    image: routeImage,
    addon: {
      figure: `${numberFormatter.format(202000)} kg`,
      description: 'shipped',
    },
  },
  {
    figure: numberFormatter.format(4400000),
    description: 'items shipped',
    image: pallet,
  },
  {
    figure: numberFormatter.format(142),
    description: 'organizations worked with',
    image: shakingHands,
    addon: {
      figure: numberFormatter.format(40),
      description: 'active team members',
    },
  },
]

type CardProps = {
  figure: string
  description: string
  image: string
  addon?: {
    figure: string
    description: string
  }
}

const Card: FC<CardProps> = ({ figure, description, image, addon }) => (
  <div
    className="flex justify-center items-center flex-col px-4 m-4"
    style={{ maxWidth: '150px' }}
  >
    <img
      src={image}
      width="100%"
      className="block mx-auto mb-2"
      alt={description}
      style={{ aspectRatio: '1' }}
    />
    <p className="text-2xl font-medium whitespace-nowrap">{figure}</p>
    <p className="text-gray-700 mb-2 whitespace-nowrap">{description}</p>
    {addon && (
      <>
        <p className="text-xl font-medium whitespace-nowrap">{addon.figure}</p>
        <p className="text-gray-700 mb-2 whitespace-nowrap">
          {addon.description}
        </p>
      </>
    )}
  </div>
)

const YearInNumbersSection: FC = () => (
  <section className="py-8 md:py-16 max-w-7xl mx-auto">
    <h2 className="text-4xl font-semibold p-4 text-center">
      July 2021&mdash;June 2022 in numbers
    </h2>
    <p className="text-center">
      Read more in our{' '}
      <a
        href="https://prezi.com/i/view/DzjydpaXoACQHRpcsXvJ"
        target={'_blank'}
        className="link"
      >
        latest annual report
      </a>
      .
    </p>
    <div className="flex justify-center items-start flex-wrap mt-8">
      {content.map((section, i) => (
        <Card {...section} key={`section-${i}`} />
      ))}
    </div>
  </section>
)

export default YearInNumbersSection
