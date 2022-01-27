import { FC } from 'react'
import moneyImage from '../../images/home/money.svg'
import truckImage from '../../images/home/truck.svg'
import boxImage from '../../images/home/box.svg'
import peopleImage from '../../images/home/people.svg'
import highwayImage from '../../images/home/highway.svg'
import rocketImage from '../../images/home/rocket.svg'
import ExternalLink from '@components/link/ExternalLink'

const content = [
  {
    figure: '$2+ Million',
    description: 'worth of aid shipped',
    image: moneyImage,
  },
  {
    figure: '1+ Million',
    description: 'pieces shipped',
    image: boxImage,
  },
  {
    figure: '290,500 ×',
    description: 'aid delivered',
    image: peopleImage,
  },
  {
    figure: '467,100 kg',
    description: 'aid shipped',
    image: truckImage,
  },
  {
    figure: '54,953 km',
    description: 'transport arranged',
    image: highwayImage,
  },
  {
    figure: '20x Impact',
    description: 'every $1 we spend delivers $20 worth of aid',
    image: rocketImage,
  },
]

type CardProps = {
  figure: string
  description: string
  image: string
}

const Card: FC<CardProps> = ({ figure, description, image }) => (
  <article className="text-center px-4">
    <img src={image} width="160" className="block mx-auto" alt="" />
    <p className="text-2xl font-medium">{figure}</p>
    <p className="text-gray-700 mb-2">{description}</p>
  </article>
)

const YearInNumbersSection: FC = () => (
  <section className="py-8 md:py-16 max-w-7xl mx-auto">
    <h2 className="text-4xl font-semibold mb-8 p-4 text-center">
      2020 in Numbers
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 justify-center">
      {content.map((section, i) => (
        <Card {...section} key={`section-${i}`} />
      ))}
    </div>

    <div className="text-center mt-8 text-gray-500 p-4 lg:px-8">
      All emojis designed by{' '}
      <ExternalLink className="link" href="https://openmoji.org/">
        OpenMoji
      </ExternalLink>
      – the open-source emoji and icon project. License:{' '}
      <ExternalLink
        className="link"
        href="https://creativecommons.org/licenses/by-sa/4.0/"
      >
        CC BY-SA 4.0
      </ExternalLink>
    </div>
  </section>
)

export default YearInNumbersSection
