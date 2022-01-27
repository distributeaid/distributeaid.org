import { FC } from 'react'
import cx from 'classnames'
import refugeeAidImage from '../../images/home/how-we-help-refugees.jpg'
import covidAidImage from '../../images/home/how-we-help-covid.jpg'
import inKindDonationsImage from '../../images/home/in-kind-donations.webp'
import fortPickettImage from '../../images/home/fort-pickett.jpg'
import MarkdownContent from '@components/markdown/MarkdownContent'

export type HowWeHelpBlock = {
  title: string
  location: string
  description: string
}

// TODO move this to our CMS
const images = [refugeeAidImage, covidAidImage, inKindDonationsImage, fortPickettImage]

type CardProps = {
  title: string
  location: string
  description: string
  image: string
  side: 'left' | 'right'
}

const HowWeHelpBlock: FC<CardProps> = ({
  title,
  location,
  description,
  image,
  side,
}) => (
  <article className="md:flex my-12">
    <img
      className={cx('w-full md:w-1/2', {
        'order-2': side === 'right',
      })}
      src={image}
      style={{
        height: '56.25%',
      }}
    />
    <div className="py-4 md:mx-8 md:w-1/2">
      <h3 className="text-2xl font-medium">{title}</h3>
      <p className="text-xl text-navy-700 mb-2">{location}</p>
      <MarkdownContent content={description} />
    </div>
  </article>
)

type Props = {
  blocks: HowWeHelpBlock[]
}

const HowWeHelpSection: FC<Props> = ({ blocks }) => (
  <section className="bg-gray-50">
    <div className="px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
      <h2 className="text-4xl font-semibold">How we help</h2>
      {blocks.map((section, i) => (
        <HowWeHelpBlock
          {...section}
          image={images[i]}
          side={i % 2 === 0 ? 'left' : 'right'}
          key={`section-${i}`}
        />
      ))}
    </div>
  </section>
)

export default HowWeHelpSection
