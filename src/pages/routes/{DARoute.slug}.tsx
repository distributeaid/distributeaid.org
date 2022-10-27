import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { FC } from 'react'

import { PageHeader } from '@components/PageHeader'
import { Route } from '@components/routes/RouteComponentTypes'

import RoutesSectionImage from '../../components/routes/RoutesSectionImage'
import TextWithVisual from '../../components/routes/TextWithVisual'
import SimpleLayout from '../../layouts/Simple'

import Costs from '@components/routes/Costs'
import Delivery from '@components/routes/Delivery'
import PhotoCredit from '@components/routes/PhotoCredit'
import Reservations from '@components/routes/Reservations'
import SectionTitle from '@components/routes/SectionTitle'

import sackIcon from '../../images/regular-routes/icons/openmoji_bag.svg'
import boxIcon from '../../images/regular-routes/icons/openmoji_box.svg'
import vanIcon from '../../images/regular-routes/icons/openmoji_van.svg'

type TemplateProps = {
  data: {
    route: Route
  }
}

export function Head({ data: { route } }: TemplateProps) {
  return (
    <PageHeader
      title={`Route: ${route.routeOrigin} to ${route.routeDestination}`}
    />
  )
}

const Routes: FC<TemplateProps> = ({ data: { route } }) => (
  <SimpleLayout>
    <Delivery
      images={route.images}
      introduction={route.introduction}
      routeDestination={route.routeDestination}
      routeOrigin={route.routeOrigin}
      frontlineGroups={route.frontlineGroups}
    />
    <Reservations
      deadlines={route.deadlines}
      images={route.images}
      aidRequestFormUrl={route.aidRequestFormUrl}
    />
    <TextWithVisual
      id="frontline-groups"
      positionOfVisual="right"
      visual={
        <RoutesSectionImage
          ariaLabel="Mobile refugee support station with a few people gathering."
          image={route.images.groupsSection}
        />
      }
    >
      <SectionTitle title="Frontline Groups" />
      <div className="section__body mb-8">
        <div className="flex flex-wrap gap-6 justify-center">
          {route.frontlineGroups.map((group, index) => (
            <div
              className="w-full"
              style={{ maxWidth: 160 }}
              key={`group-${index}`}
            >
              {/* TODO size the images correctly */}
              <img
                className="icon icon--responsive mx-auto rounded-full"
                src={group.logo}
                alt={`Frontline Group Logo: ${group.name}`}
                style={{ width: 120 }}
              />
              <div className="text-center text-sm mt-4">{group.name}</div>
            </div>
          ))}
        </div>
      </div>

      <PhotoCredit
        url="https://www.facebook.com/MobileRefugeeSupport/posts/1492064960999110"
        description="Mobile Refugee Support"
      />
    </TextWithVisual>

    <TextWithVisual
      id="uk-staging-hubs"
      positionOfVisual="left"
      visual={
        <iframe
          className="w-full md:w-2/4 h-96 md:h-auto"
          src={route.mapUrl}
          width="100%"
          height="100%"
          title="routeMap"
        />
      }
    >
      <SectionTitle title="UK Staging Hubs" />
      <div className="section__body">
        <p className="mb-4">
          The most <strong>cost efficient and Brexit / pandemic-proof</strong>{' '}
          way to send aid from the UK is by shipping palletised aid on
          articulated lorries that are loaded by a forklift.{' '}
          <strong>That's where our UK Staging Hubs come in!</strong> They have
          the necessary infrastructure and experience working with us to ensure
          each shipment is fully optimized, which everybody benefits from. Once
          it's in a Staging Hub, your aid will be palletised, stored, and loaded
          by a forklift onto the next truck.
        </p>

        <div className="mb-12 flex">
          <div className="tile-icon">
            <StaticImage
              src="../../images/regular-routes/pallet-aid-logo.256.png"
              alt="Hub Logo: Pallet Aid (PA)"
              height={80}
              width={80}
            />
          </div>
          <div className="tile-content ml-4">
            <p className="text-lg font-medium mb-2">Coventry - South England</p>
            <p className="text-sm leading-snug">
              Both Community &amp; Commercial Aid
            </p>
            <p className="text-sm leading-snug">
              pallets, loose boxes, bulk bags of tents &amp; sleeping bags, etc
            </p>
          </div>
        </div>
      </div>

      <footer>
        <p className="text-sm italic text-center">
          Questions? Comments? Contact us all at{' '}
          <a
            href="mailto:hubs@distributeaid.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            hubs@distributeaid.org
          </a>
          .
        </p>
      </footer>
    </TextWithVisual>

    <Costs images={route.images} costs={route.costs} />

    <TextWithVisual
      id="all-about-pallets"
      positionOfVisual="left"
      visual={
        <RoutesSectionImage
          ariaLabel="Three people sorting and packing clothes into boxes."
          image={route.images.palletsSection}
        />
      }
    >
      <SectionTitle title="All About Pallets" />
      <div className="section__body">
        <h2 className="font-bold">
          How many Standard Pallet spaces do I need?
        </h2>

        <div className="tiles tiles--column">
          <div className="tile flex">
            <div className="tile-icon w-20 flex-shrink-0">
              <img
                className="icon icon--responsive"
                src={vanIcon}
                alt="Van Icon: The Calais classic."
              />
            </div>
            <div className="tile-content">
              <p className="mb-1">Van Loads</p>
              <p>
                The Calais classic. Most Vans fit about{' '}
                <strong>3 Standard Pallets</strong> worth of aid in the back.
              </p>
            </div>
          </div>
          <div className="tile flex">
            <div className="tile-icon w-20 flex-shrink-0">
              <img
                className="icon icon--responsive"
                src={sackIcon}
                alt="Bulk Bag Icon: A large sack."
              />
            </div>
            <div className="tile-content">
              <p className="mb-1">Bulk Bags</p>
              <p>
                Perfect for those larger, clumsier items like tents or sleeping
                bags that are too awkward to box up.
              </p>
              <ul className="">
                <li>
                  Each Bulk Bag takes up one <strong>Half Pallet</strong> space.
                </li>
                <li>
                  2 Bulk Bags count as a <strong>Standard Pallet</strong> if
                  they can be stacked.
                </li>
                <li>
                  A <strong>Standard Pallet</strong> can also be made by
                  stacking a Bulk Bag on top of 18 Banana Boxes.
                </li>
              </ul>
            </div>
          </div>
          <div className="tile flex">
            <div className="tile-icon w-20 flex-shrink-0">
              <img
                className="icon icon--responsive"
                src={boxIcon}
                alt="Confirmed Box Icon: The proverbial banana box."
              />
            </div>
            <div className="tile-content">
              <p className="mb-1">Banana Boxes</p>
              <p>
                Easy to acquire, small, and sturdy boxes. Each Banana Box should
                hold a specific item, such as mens small pants or women's medium
                winter sweaters. Any consistently sized box could be used to
                fill a Standard or Half pallet. Banana Box sizes can vary a bit,
                but a good rule of thumb is:
              </p>
              <ul className="">
                <li>
                  <strong>Dimensions:</strong> 500mm x 400mm x 250mm high, holds
                  15kg
                </li>
                <li>
                  18 Banana Boxes make up a <strong>Half Pallet</strong>
                </li>
                <li>
                  36 Banana Boxes can fit on a <strong>Standard Pallet</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <PhotoCredit
        url="https://www.facebook.com/DGRefugeeAction"
        description="Jay Rubenstien of Massive Outpouring of Love"
      />
    </TextWithVisual>
  </SimpleLayout>
)

export default Routes

export const query = graphql`
  query ($id: String!) {
    route: daRoute(id: { eq: $id }) {
      id
      routeOrigin
      routeDestination
      introduction
      mapUrl
      aidRequestFormUrl
      images {
        deliverySection
        reservationSection
        groupsSection
        storageSection
        palletsSection
      }
      costs {
        currency
        standardPaletteCost
        overflowPricing
        halfPaletteCost
      }
      deadlines {
        submissionsDeadline
        confirmationDate
        stagingBegins
        stagingEnds
        shipmentDeparture
      }
      frontlineGroups {
        logo
        name
      }
    }
  }
`
