import { FC } from 'react'
import cx from 'classnames'
import refugeeAidImage from '../../images/home/how-we-help-refugees.jpg'
import covidAidImage from '../../images/home/how-we-help-covid.jpg'
import placeholderImage from '../../images/home/how-we-help-placeholder.png'
import inKindDonationsImage from '../../images/home/in-kind-donations.webp'
import fortPickettImage from '../../images/home/fort-pickett.jpg'
import ExternalLink from '@components/link/ExternalLink'

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
  {
    title: 'In-kind Donations',
    subtitle: 'Global',
    body: (
      <>
        Distribute Aid runs a successful in-kind donation programme where we
        connect companies with aid organisations. Through our network of
        hundreds of charities we can handle coordinating large volumes of
        donations. To date we have secured over 5 million items through our
        in-kind donor programme. Email{' '}
        <ExternalLink
          className="link"
          href="mailto:donate-aid@distributeaid.org"
        >
          donate-aid@distributeaid.org
          <span className="sr-only">(opens in your email client)</span>
        </ExternalLink>{' '}
        if you can donate in-kind.
      </>
    ),
    image: inKindDonationsImage,
  },
  {
    title: 'Fort Pickett',
    subtitle: 'USA',
    body: (
      <>
        Distribute Aid was officially invited to join Operation Allies Welcome
        at Fort Pickett in November. Our role on base is to manage all the
        donated aid. We work with NGOs and departments across the base to assess
        the needs of our guests, and work with the community of external
        organizations supporting the Operation Allies Welcome mission to help
        facilitate aid deliveries. Once aid arrives on base we work with the US
        Marines to distribute items to guests, and supply materials for NGOs
        running education & activity programs to use in their classes. In
        November & December, our efforts resulted in more than 750,000 items
        being distributed to or used by 7,500 guests at Fort Pickett. You can
        support our work by donating{' '}
        <ExternalLink
          className="link"
          href="https://opencollective.com/fort-pickett"
        >
          here
        </ExternalLink>
        !
      </>
    ),
    image: fortPickettImage,
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
