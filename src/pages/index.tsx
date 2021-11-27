import { FC } from 'react'
import RouteCard from '@components/home/RouteCard'
import HeroSection from '@components/home/HeroSection'
import MissionSection from '@components/home/MissionSection'
import SimpleLayout from '../layouts/Simple'
import franceRouteImage from '../images/home/help-refugees-warehouse-calais.jpg'
import lebanonRouteImage from '../images/home/the-free-shop-unloading.jpg'
import customShipmentsImage from '../images/home/bobby-moving-a-pallet-iha.jpg'

const HomePage: FC = () => {
  return (
    <SimpleLayout pageTitle="Home">
      <HeroSection />
      <MissionSection />
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
        <RouteCard
          title="UK ➜ France"
          subtitle="Pallets via DA Delivery"
          ctaLabel="Ship aid to France!"
          ctaUrl="/routes/uk-to-france/"
          imageSrc={franceRouteImage}
        >
          <p>Send pallets to Calais & Dunkirk on our monthly truck.</p>
          <p>
            Organizing your own shipments from the UK to EU? Be sure to checkout
            our{' '}
            <a href="/docs/brexit-vs-humanitarian-aid.pdf">
              Brexit vs. Humanitarian Aid
            </a>{' '}
            guide to understand the new requirements and how to qualify for a
            VAT tax exemption!
          </p>
        </RouteCard>
        <RouteCard
          title="UK ➜ Lebanon"
          subtitle="Pallets via DA Delivery"
          ctaLabel="Ship aid to Lebanon!"
          ctaUrl="/routes/uk-to-lebanon/"
          imageSrc={lebanonRouteImage}
        >
          <p>Send pallets to Calais & Dunkirk on our monthly truck.</p>
          <p>
            <strong>New Route!</strong> We're proud to announce regular
            shipments to support aid groups in Lebanon.
          </p>
        </RouteCard>
        <RouteCard
          title="Custom Shipments"
          subtitle="Pallets, Trucks, & Containers"
          ctaLabel="Contact Us!"
          ctaUrl="mailto:logistics@distributeaid.org"
          imageSrc={customShipmentsImage}
        >
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
        </RouteCard>
      </section>
    </SimpleLayout>
  )
}

export default HomePage
