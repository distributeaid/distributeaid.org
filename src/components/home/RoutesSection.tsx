import { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import InternalLink from '@components/link/InternalLink'
import Card from '@components/card/Card'

const RoutesSection: FC = () => (
  <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
    <Card
      header={
        <StaticImage
          src={'../../images/home/help-refugees-warehouse-calais.jpg'}
          alt="Calais warehouse"
          className="mb-4 object-cover w-full"
          height={200}
        />
      }
      title="UK ➜ France"
      subtitle="Pallets via DA Delivery"
      body={
        <>
          <p>Send pallets to Calais & Dunkirk on our monthly truck.</p>
          <p>
            Organizing your own shipments from the UK to EU? Be sure to checkout
            our{' '}
            <InternalLink
              to="/docs/brexit-vs-humanitarian-aid.pdf"
              className="link"
            >
              Brexit vs. Humanitarian Aid
            </InternalLink>{' '}
            guide to understand the new requirements and how to qualify for a
            VAT tax exemption!
          </p>
        </>
      }
      actions={{
        url: '/routes/uk-to-france/',
        label: 'Ship aid to France!',
      }}
    />
    <Card
      header={
        <StaticImage
          src={'../../images/home/the-free-shop-unloading.jpg'}
          alt="Two volunteers unloading a truck"
          className="mb-4 object-cover w-full"
          height={200}
        />
      }
      title="UK ➜ Lebanon Home Card"
      subtitle="Pallets via DA Delivery"
      body={
        <>
          <p>
            <strong>New Route!</strong> We're proud to announce regular
            shipments to support aid groups in Lebanon.
          </p>
        </>
      }
      actions={{
        url: '/routes/uk-to-lebanon/',
        label: 'Ship aid to Lebanon!',
      }}
    />
    <Card
      title="Custom Shipments"
      subtitle="Pallets, Trucks, & Containers"
      header={
        <StaticImage
          src={'../../images/home/bobby-moving-a-pallet-iha.jpg'}
          alt="Volunteer Bobby moving a pallet"
          className="mb-4 object-cover w-full"
          height={200}
        />
      }
      body={
        <>
          <p>
            We're happy to help organize or advise on humanitarian aid shipments
            to:
          </p>
          <div className="flex">
            <div className="flex-grow">
              <ul className="list-disc list-inside">
                <li>France</li>
                <li>Italy</li>
                <li>Greece</li>
                <li>Croatia</li>
              </ul>
            </div>
            <div className="flex-grow">
              <ul className="list-disc list-inside">
                <li>Serbia</li>
                <li>Bosnia</li>
                <li>Lebanon</li>
                <li>Somewhere new!</li>
              </ul>
            </div>
          </div>
        </>
      }
      actions={{
        url: 'mailto:logistics@distributeaid.org',
        label: 'Contact Us!',
      }}
    />
  </section>
)

export default RoutesSection
