import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { FC } from 'react'

import { PageHeader } from '@components/PageHeader'
import { Route } from '@components/routes/RouteComponentTypes'

import RoutesSectionImage from '../../components/routes/RoutesSectionImage'
import TextWithVisual from '../../components/routes/TextWithVisual'
import SimpleLayout from '../../layouts/Simple'

import Delivery from '@components/routes/Delivery'
import Frontline from '@components/routes/Frontline'
import PhotoCredit from '@components/routes/PhotoCredit'
import Reservations from '@components/routes/Reservations'
import SectionTitle from '@components/routes/SectionTitle'
import palletIcon from '../../images/regular-routes/icons/noun_Pallet_3307940.svg'
import halfPalletIcon from '../../images/regular-routes/icons/noun_Pallet_3364535.svg'
import sackIcon from '../../images/regular-routes/icons/openmoji_bag.svg'
import boxIcon from '../../images/regular-routes/icons/openmoji_box.svg'
import vanIcon from '../../images/regular-routes/icons/openmoji_van.svg'

type TemplateProps = {
  data: {
    route: Route
  }
}

const formatters: Record<string, Intl.NumberFormat> = {}

const formatCostInCurrency = (cost: number, currency: string) => {
  if (formatters[currency] === undefined) {
    formatters[currency] = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  }

  return formatters[currency]?.format(cost) ?? `${currency} ${cost.toFixed(2)}`
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
    <Frontline images={route.images} frontlineGroups={route.frontlineGroups} />

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

    <TextWithVisual
      id="storage-and-shipping-charge"
      positionOfVisual="right"
      visual={
        <RoutesSectionImage
          ariaLabel="Pallets with lots of cans of food and a person celebrating the successful unloading."
          image={route.images.storageSection}
        />
      }
    >
      <SectionTitle title="Storage &amp; Shipping (£)" />
      <div className="section__body">
        <p className="mb-6">
          We offer a flat, per-pallet and per-box storage and shipment charge
          (S&amp;S) to take the stress out of budgeting to move your aid. By
          using the Staging Hubs we can keep shipping costs low and consistent,
          and spread the cost evenly for all groups sending aid.
        </p>

        <p className="mb-6">
          We've recently had to raise prices to match current economic
          conditions. However, we are applying for funding for upcoming
          shipments to help offset these. This funding will be applied evenly
          across all pallets on the shipment, so please do offer as much aid as
          you can and we'll confirm the final total before the drop-off date.
        </p>

        <div className="tiles tiles--row ">
          <div className="tile tile--column">
            <div className="tile-icon mx-auto mb-2">
              <img
                className="icon icon--responsive mx-auto"
                src={palletIcon}
                alt="Standard Pallet Icon: Four boxes stacked evenly on a pallet."
                style={{ width: 100 }}
              />
            </div>
            <div className="tile-content text-left">
              <p className="mb-1">
                Standard Pallet -{' '}
                {formatCostInCurrency(
                  route.costs.standardPaletteCost,
                  route.costs.currency,
                )}
              </p>
              <p>1.2m x 1.0m x 1.70m high</p>
              <p>700kg</p>
            </div>
          </div>

          <div className="tile tile--column">
            <div className="tile-icon mx-auto mb-2">
              <img
                className="icon icon--responsive mx-auto"
                src={halfPalletIcon}
                alt="Half Pallet Icon: 3 boxes stacked in a pyramid on a pallet."
                style={{ width: 100 }}
              />
            </div>
            <div className="tile-content text-left">
              <p className="mb-1">
                Half Pallet -{' '}
                {formatCostInCurrency(
                  route.costs.halfPaletteCost,
                  route.costs.currency,
                )}
              </p>
              <p>1.2m x 1.0m x 0.85m high</p>
              <p>350kg</p>
            </div>
          </div>
        </div>

        <h2 className="font-bold mb-4 mt-8">
          What if my aid doesn't fit exactly?
        </h2>

        <ul className="space-y-4">
          <li>
            We encourage groups to work together to submit a combined offer that
            makes up a Standard Pallet or Half Pallet worth of aid.
          </li>
          <li>
            We reserve 2 pallets worth of space on each truck for overflow, so
            if you have slightly more then a Standard Pallet's worth of aid
            that's ok!{' '}
            <strong>
              Overflow pricing is{' '}
              {formatCostInCurrency(
                route.costs.overflowPricing,
                route.costs.currency,
              )}{' '}
              per banana box (500mm x 400mm x 250mm high, holds 15kg).
            </strong>
          </li>
          <li>
            You'll still need to book a Standard Pallet space for commercially
            purchased aid with smaller pallet dimensions. Unfortunately, due to
            the way trucks are packed a smaller pallet size doesn't actually
            allow us to fit more on there. You can always contact{' '}
            <a
              className="font-bold underline"
              href="mailto:hubs@distributeaid.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              hubs@distributeaid.org
            </a>{' '}
            to look into booking a full truck load at a custom rate.
          </li>
          <li>
            We can book you multiple Standard Pallets worth of space to
            accommodate bulky items. Please submit the exact dimensions of the
            item on the offer form so we can assess how many Standard Pallets it
            will require, and ensure that we book a curtain-side truck to load
            it.
          </li>
        </ul>
      </div>

      <PhotoCredit
        url="https://www.instagram.com/calais_food_collective/"
        description="Calais Food Collective"
      />
    </TextWithVisual>

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
