import { FC } from 'react'
import cx from 'classnames'
import refugeeAidImage from '../../images/home/how-we-help-refugees.jpg'
import covidAidImage from '../../images/home/how-we-help-covid.jpg'

const content = [
  {
    title: 'Refugee Aid',
    subtitle: 'Europe',
    body: `Distribute Aid helps European grassroots refugee aid groups support over 100,000 asylum seekers. We assist with every point in the supply chain: assessing needs, gathering supplies at home or from in-kind donors, coordinating shipments, and advising on distributions. We currently send several regular shipments each month to multiple destinations, and handle specialty / emergency response shipments as well.`,
    image: refugeeAidImage,
  },
  {
    title: 'COVID-19 Response',
    subtitle: 'Europe & USA',
    body: `Distribute Aid is actively working to prevent the spread of COVID-19 globally. We regularly send hygiene and PPE shipments to our European partners who continue to work to protect people in crowded refugee camps. Because COVID-19 affects everybody, our response grew as the virus spread. We now also collaborate with multiple grassroots networks in the US to support their response.`,
    image: covidAidImage,
  },
]

type CardProps = {
  title: string
  subtitle: string
  body: string
  image: string
  side: 'left' | 'right'
}

const Card: FC<CardProps> = ({ title, subtitle, body, image, side }) => (
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
      <p className="text-xl text-navy-700 mb-2">{subtitle}</p>
      <p>{body}</p>
    </div>
  </article>
)

const HowWeHelpSection: FC = () => (
  <section className="bg-gray-50">
    <div className="px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
      <h2 className="text-4xl font-semibold">How we help</h2>
      {content.map((section, i) => (
        <Card
          {...section}
          side={i % 2 === 0 ? 'left' : 'right'}
          key={`section-${i}`}
        />
      ))}
    </div>
  </section>
)

export default HowWeHelpSection
