import { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import SimpleLayout from '../layouts/Simple'
import TextWithVisual from '../components/routes/TextWithVisual'
import RoutesSectionImage from '../components/routes/RoutesSectionImage'
import MarkdownContent from '../components/markdown/MarkdownContent'

import logoSrc from '../images/lettermark_blue.svg'
import netIcon from '../images/regular-routes/icons/noun_net_2428552.svg'
import mapIcon from '../images/regular-routes/icons/noun_Maps_3610706.svg'
import truckIcon from '../images/regular-routes/icons/openmoji_truck.svg'
import heartBillIcon from '../images/regular-routes/icons/noun_Heart_Bill_98293.svg'
import boxIcon from '../images/regular-routes/icons/openmoji_box.svg'
import sackIcon from '../images/regular-routes/icons/openmoji_bag.svg'
import vanIcon from '../images/regular-routes/icons/openmoji_van.svg'
import halfPalletIcon from '../images/regular-routes/icons/noun_Pallet_3364535.svg'
import palletIcon from '../images/regular-routes/icons/noun_Pallet_3307940.svg'

import palletStorageBackground from '../pages/routes_old/pallet-storage.jpg'
import forkliftLoadingBackground from '../pages/routes_old/forklift-loading.jpg'
import collectionBackground from '../pages/routes_old/collection-and-sorting.jpg'
import mobileRefugeeSupportBackground from '../pages/routes_old/mobile-refugee-support-distribution.jpg'
import calaisUnloadingBackground from '../pages/routes_old/calais-food-collective-unloading.jpg'

type TemplateProps = {
  pageContext: {
    pageFields: {
      pagePath: string
      routeOrigin: string
      routeDestination: string
      introduction: string
      costs: {
        currency: string
        standardPaletteCost: number
        overflowPricing: number
        halfPaletteCost: number
      }
      deadlines: {
        submissionsDeadline: string
        confirmationDate: string
        stagingBegins: string
        stagingEnds: string
        shipmentDeparture: string
      }
      frontlineGroups: {
        logo: string
        name: string
      }[]
    }
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatCostInCurrency(cost: number, currency: string) {
  switch (currency) {
    case 'GBP':
      return '£' + cost.toFixed(2)
    case 'EUR':
      return cost.toFixed(2) + '€'
    case 'SEK':
      return cost.toFixed(2) + ' kr'
    case 'USD':
      return '$' + cost.toFixed(2)
  }
}

const RoutePage: FC<TemplateProps> = ({ pageContext: { pageFields } }) => (
  <SimpleLayout
    pageTitle={`Route: ${pageFields.routeOrigin} to ${pageFields.routeDestination}`}
  >
    <TextWithVisual
      positionOfVisual="right"
      visual={
        <RoutesSectionImage
          ariaLabel="Fork lift loading pallets into a truck"
          image={forkliftLoadingBackground}
        />
      }
    >
      <header className="my-4 text-center">
        <h1 className="section__title">
          <img
            width="130"
            height="60"
            src={logoSrc}
            alt="Distribute Aid Logo: A flock of doves stylized by stacking wings behind the main outline of a dove."
          />
          <span>Delivery</span>
        </h1>
        <h2 className="text-2xl">
          Regular Route: {pageFields.routeOrigin}&rarr;
          {pageFields.routeDestination}
        </h2>
      </header>

      <div className="section__body space-y-4">
        <MarkdownContent content={pageFields.introduction} />
        <div className="tiles tiles--grid tiles--highlight mt-4">
          <div className="tile tile--column w-1/2">
            <div className="tile-icon mx-auto">
              <img
                className="icon icon--responsive"
                src={netIcon}
                alt="Hub Icon: Multiple nodes connected to a center hub."
              />
            </div>
            <div className="tile-content">
              <p className="mb-1">1 UK Staging Hubs</p>
              <p>Cambridge</p>
            </div>
          </div>

          <div className="tile tile--column w-1/2">
            <div className="tile-icon mx-auto">
              <img
                className="icon icon--responsive"
                src={mapIcon}
                alt="Map Icon: A destination marker on a map."
              />
            </div>
            <div className="tile-content">
              <p className="mb-1">Service to Calais &amp; Dunkirk</p>
              <p>Supporting 7 Frontline Groups</p>
            </div>
          </div>

          <div className="tile tile--column w-1/2">
            <div className="tile-icon mx-auto">
              <img
                className="icon icon--responsive"
                src={truckIcon}
                alt="Truck Icon: A truck in motion."
              />
            </div>
            <div className="tile-content">
              <p className="mb-1">Regular Shipments</p>
              <p>Scaled To Demand</p>
            </div>
          </div>

          <div className="tile tile--column w-1/2">
            <div className="tile-icon mx-auto">
              <img
                className="icon icon--responsive"
                src={heartBillIcon}
                alt="Money Icon: A currency bill with a heart in the middle."
              />
            </div>
            <div className="tile-content">
              <p className="mb-1">Fair Flat-Rate Pricing</p>
              <p>All-Inclusive, At-Cost</p>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p className="photo-credit text-center">
          <span>Background Photo Credit:</span>{' '}
          <a
            href="https://www.facebook.com/groups/hertsforrefugees/permalink/3488608217903521/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mark Lampert of Herts For Refugees
          </a>
        </p>
      </footer>
    </TextWithVisual>

    <TextWithVisual
      id="reserve-your-spot"
      positionOfVisual="left"
      visual={
        <RoutesSectionImage
          ariaLabel="An aisle in a warehouse with shelves stacked high with pallets of boxes."
          image={palletStorageBackground}
        />
      }
    >
      <header className="mb-4 text-center">
        <h2 className="section__title">Reserve Your Spot!</h2>
      </header>

      <div className="section__body">
        <ol className="space-y-8">
          <li className="">
            <h4 className="text-lg font-semibold mb-4">
              1. Submit Your Aid Delivery Request
            </h4>
            <p className="mb-4">
              Download the{' '}
              <a
                className="font-bold underline"
                href="/docs/da_aid-delivery-request_uk-to-france.xlsx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aid Delivery Request Form
              </a>{' '}
              and fill it in.
            </p>
            <p className="mb-4">
              Email the completed form to{' '}
              <a
                className="font-bold underline"
                href="mailto:hubs@distributeaid.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                hubs@distributeaid.org
              </a>
              . Your local Staging Hub will receive it and follow up if there
              are any questions.
            </p>
            <p className="h5">
              Submissions close:{' '}
              {formatDate(pageFields.deadlines.submissionsDeadline)}
            </p>
          </li>
          <li>
            <h4 className="text-lg font-semibold mb-4">
              2. Consult Frontline Groups
            </h4>
            <p className="mb-4">
              We'll check in with the frontline groups during the offer period,
              to confirm which offered donations they want and to prioritise
              deliveries that meet their biggest needs. Then we can confirm if
              you have a place reserved on the next truck.
            </p>
            <p className="h5">
              Latest confirmation date:{' '}
              {formatDate(pageFields.deadlines.confirmationDate)}
            </p>
          </li>
          <li>
            <h4 className="text-lg font-semibold mb-4">
              3. Drop Off @ Staging Hubs
            </h4>
            <p className="mb-4">
              Schedule a drop-off appointment with your local Staging Hub, pay
              them the flat-rate{' '}
              <a href="#storage-and-shipping-charge">
                Storage &amp; Shipping charge
              </a>
              , and deliver the boxes of aid at the agreed time.
            </p>
            <p className="h5">
              Staging period: {formatDate(pageFields.deadlines.stagingBegins)} -{' '}
              {formatDate(pageFields.deadlines.stagingEnds)}
            </p>
          </li>
          <li>
            <h4 className="text-lg font-semibold mb-4">4. Deliver The Aid</h4>
            <p className="mb-4">
              <strong>And that's it!</strong> Take an evening off to celebrate a
              job well done, we got it from here. Once your aid is delivered
              we'll follow up with an after-shipment report, including photos
              and acknowledgments from the frontline groups.
            </p>
            <p className="h5">
              Shipment departs:{' '}
              {formatDate(pageFields.deadlines.shipmentDeparture)}
            </p>
          </li>
          <li>
            <h4 className="text-lg font-semibold mb-4">Shipment Timetable</h4>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-100 p-2"></th>
                  <th className="border-b-2 border-gray-100 p-2">
                    Offer Deadline
                  </th>
                  <th className="border-b-2 border-gray-100 p-2">
                    Truck Departs
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-2"></td>
                  <td className="p-2">8th August</td>
                  <td className="p-2">24th August</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-2"></td>
                  <td className="p-2">12th September</td>
                  <td className="p-2">5th October</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="text-center text-lg p-2">
                    <strong>&#10148;</strong>
                  </td>
                  <td className="p-2">31st October</td>
                  <td className="p-2">15th November</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-2"></td>
                  <td className="p-2">28th November</td>
                  <td className="p-2">13th December</td>
                </tr>
              </tbody>
            </table>
          </li>
        </ol>
      </div>

      <footer>
        <p className="photo-credit text-center">
          <span>Background Photo Credit:</span>{' '}
          <a href="https://unsplash.com/@ruchindra?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Ruchindra Gunasekara
          </a>{' '}
          <span>
            on{' '}
            <a href="https://unsplash.com/s/photos/warehouse?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Unsplash
            </a>
          </span>
        </p>
      </footer>
    </TextWithVisual>

    <TextWithVisual
      id="frontline-groups"
      positionOfVisual="right"
      visual={
        <RoutesSectionImage
          ariaLabel="Mobile refugee support station with a few people gathering."
          image={mobileRefugeeSupportBackground}
        />
      }
    >
      <header className="mb-4 text-center">
        <h2 className="section__title">Frontline Groups</h2>
      </header>
      <div className="section__body">
        <div className="flex flex-wrap gap-6 justify-center">
          {pageFields.frontlineGroups.map((group, index) => (
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
              <div className="text-center text-sm">{group.name}</div>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <p className="photo-credit text-center hide-sm">
          <span>Background Photo Credit:</span>{' '}
          <a
            href="https://www.facebook.com/MobileRefugeeSupport/posts/1492064960999110"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mobile Refugee Support
          </a>
        </p>
      </footer>
    </TextWithVisual>

    <TextWithVisual
      id="uk-staging-hubs"
      positionOfVisual="left"
      visual={
        <iframe
          className="w-full md:w-2/4 h-96 md:h-auto"
          src="https://www.google.com/maps/d/u/0/embed?mid=1a1ZBC-Fc-WJCP27ZGx70YFRaAByjdFTS"
          width="100%"
          height="100%"
        />
      }
    >
      <header className="mb-4 text-center">
        <h1 className="section__title">UK Staging Hubs</h1>
      </header>

      <div className="section__body">
        <p className="mb-4">
          The most <strong>cost efficient and Brexit / pandemic-proof</strong>{' '}
          way to send aid from the UK to France is by shipping palletised aid on
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
              src="../images/regular-routes/pallet-aid-logo.256.png"
              alt="Hub Logo: Pallet Aid (PA)"
              height={80}
              width={80}
            />
          </div>
          <div className="tile-content ml-4">
            <p className="text-lg font-medium mb-2">
              Cambridge - South England
            </p>
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
        <p className="photo-credit text-center">
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
          image={calaisUnloadingBackground}
        />
      }
    >
      <header className="mb-4 text-center">
        <h1 className="section__title">Storage &amp; Shipping (£)</h1>
      </header>

      <div className="section__body">
        <p className="mb-6">
          We offer a flat, per-pallet and per-box storage and shipment charge
          (S&amp;S) to take the stress out of budgeting to move your aid. By
          using the Staging Hubs we can keep shipping costs low and consistent,
          and spread the cost evenly for all groups sending aid.
        </p>

        <div className="tiles tiles--row ">
          <div className="tile tile--column">
            <div className="tile-icon mx-auto mx-auto mb-2">
              <img
                className="icon icon--responsive"
                src={palletIcon}
                alt="Standard Pallet Icon: Four boxes stacked evenly on a pallet."
                style={{ width: 100 }}
              />
            </div>
            <div className="tile-content text-left">
              <p className="mb-1">
                Standard Pallet -{' '}
                {formatCostInCurrency(
                  pageFields.costs.standardPaletteCost,
                  pageFields.costs.currency,
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
                  pageFields.costs.halfPaletteCost,
                  pageFields.costs.currency,
                )}
              </p>
              <p>1.2m x 1.0m x 0.85m high</p>
              <p>350kg</p>
            </div>
          </div>
        </div>

        <h3 className="font-bold mb-4 mt-8">
          What if my aid doesn't fit exactly?
        </h3>

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
                pageFields.costs.overflowPricing,
                pageFields.costs.currency,
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

      <footer>
        <p className="photo-credit text-center">
          <span>Background Photo Credit:</span>{' '}
          <a
            href="https://www.instagram.com/calais_food_collective/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Calais Food Collective
          </a>
        </p>
      </footer>
    </TextWithVisual>

    <TextWithVisual
      id="all-about-pallets"
      positionOfVisual="left"
      visual={
        <RoutesSectionImage
          ariaLabel="Three people sorting and packing clothes into boxes."
          image={collectionBackground}
        />
      }
    >
      <header className="mb-4 text-center">
        <h1 className="section__title">All About Pallets</h1>
      </header>
      <div className="section__body">
        <h3 className="font-bold">
          How many Standard Pallet spaces do I need?
        </h3>

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

      <footer>
        <p className="photo-credit text-center hide-sm">
          <span>Background Photo Credit:</span>{' '}
          <a
            href="https://www.facebook.com/DGRefugeeAction"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jay Rubenstien of Massive Outpouring of Love
          </a>
        </p>
      </footer>
    </TextWithVisual>
  </SimpleLayout>
)

export default RoutePage
