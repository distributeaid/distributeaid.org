import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { StaticImage } from 'gatsby-plugin-image'
import RouteLayout from '../../layouts/Route'
import logoSrc from '../../images/lettermark_blue.svg'
import netIcon from '../../images/routes/icons/noun_net_2428552.svg'
import mapIcon from '../../images/routes/icons/noun_Maps_3610706.svg'
import truckIcon from '../../images/routes/icons/noun_Truck_1731459.svg'
import heartBillIcon from '../../images/routes/icons/noun_Heart_Bill_98293.svg'
import boxIcon from '../../images/routes/icons/noun_Box_1897159.svg'
import sackIcon from '../../images/routes/icons/noun_sack_1468937.svg'
import vanIcon from '../../images/routes/icons/noun_Van_485356.svg'
import halfPalletIcon from '../../images/routes/icons/noun_Pallet_3364535.svg'
import palletIcon from '../../images/routes/icons/noun_Pallet_3307940.svg'

const UkToFrance: FC = () => {
  return (
    <RouteLayout>
      <Helmet>
        <title>Route: UK to France</title>
      </Helmet>
      <section className="text-navy-700 section section--above-the-fold relative min-h-screen flex justify-start items-stretch section--content-left bg--img-cover bg--img-forklift-loading">
        <div className="section__content bg-white">
          <header className="section__header">
            <h1 className="section__title">
              <img
                className="lettermark lettermark--inline"
                width="130"
                height="60"
                src={logoSrc}
                alt="Distribute Aid Logo: A flock of doves stylized by stacking wings behind the main outline of a dove."
              />
              <span>Delivery</span>
            </h1>
            <h2 className="section__subtitle">Regular Route: UK&rarr;France</h2>
          </header>

          <div className="section__body">
            <p className="mb-4">
              Distribute Aid is organising a regular route for humanitarian aid
              shipments between the UK and France. We won't let pandemics,
              Brexit, or global supply chain disruptions stop the flow of aid to
              those who need it most! &#9829;
            </p>
            <p className="mb-4">
              If you're here because you want to donate goods for people on the
              move in France-{' '}
              <strong className="text-uppercase">thank you!</strong> Groups on
              the ground would not be able to provide the services they do
              without support from donations like yours.
            </p>

            <div className="tiles tiles--grid tiles--highlight">
              <div className="tile tile--column w-1/2">
                <div className="tile-icon mx-auto">
                  <img
                    className="icon icon--responsive"
                    src={netIcon}
                    alt="Hub Icon: Multiple nodes connected to a center hub."
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">1 UK Staging Hubs</p>
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
                  <p className="tile-title">Service to Calais &amp; Dunkirk</p>
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
                  <p className="tile-title">Regular Shipments</p>
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
                  <p className="tile-title">Fair Flat-Rate Pricing</p>
                  <p>All-Inclusive, At-Cost</p>
                </div>
              </div>
            </div>
          </div>

          <footer className="section__footer">
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
        </div>
      </section>

      <section
        id="reserve-your-spot"
        className="text-navy-700 section section--content-right bg--img-cover bg--img-pallet-storage"
      >
        <div className="section__content bg-white">
          <header className="section__header">
            <h2 className="section__title">Reserve Your Spot!</h2>
          </header>

          <div className="section__body">
            <ol className="stages list--unstyled">
              <li className="stage stage--active">
                <h4 className="text-lg font-semibold mb-4">
                  1) Submit Your Aid Delivery Request
                </h4>
                <p className="mb-4">
                  Download the{' '}
                  <a
                    className="stage-action"
                    // TODO host this resource
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
                    className="stage-action"
                    href="mailto:hubs@distributeaid.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    hubs@distributeaid.org
                  </a>
                  . Your local Staging Hub will receive it and follow up if
                  there are any questions.
                </p>
                <p className="h5">Submissions Close: 31st October</p>
              </li>
              <li className="stage">
                <h4 className="text-lg font-semibold mb-4">
                  2) Consult Frontline Groups
                </h4>
                <p className="mb-4">
                  We'll check in with the frontline groups during the offer
                  period, to confirm which offered donations they want and to
                  prioritise deliveries that meet their biggest needs. Then we
                  can confirm if you have a place reserved on the next truck.
                </p>
                <p className="h5">Latest Confirmation Date: 5th November</p>
              </li>
              <li className="stage">
                <h4 className="text-lg font-semibold mb-4">
                  3) Drop Off @ Staging Hubs
                </h4>
                <p className="mb-4">
                  Schedule a drop-off appointment with your local Staging Hub,
                  pay them the flat-rate{' '}
                  <a href="#storage-and-shipping-charge">
                    Storage &amp; Shipping charge
                  </a>
                  , and deliver the boxes of aid at the agreed time.
                </p>
                <p className="h5">Staging Period: 15th - 22nd November</p>
              </li>
              <li className="stage">
                <h4 className="text-lg font-semibold mb-4">
                  4) Deliver The Aid
                </h4>
                <p className="mb-4">
                  <strong>And that's it!</strong> Take an evening off to
                  celebrate a job well done, we got it from here. Once your aid
                  is delivered we'll follow up with an after-shipment report,
                  including photos and acknowledgments from the frontline
                  groups.
                </p>
                <p className="h5">Truck Departs: 23rd November</p>
              </li>
              <li className="stage">
                <h4 className="text-lg font-semibold mb-4">
                  Shipment Timetable
                </h4>
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

          <footer className="section__footer">
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
        </div>
      </section>

      <section
        id="frontline-groups"
        className="text-navy-700 section flex justify-start items-stretch section--content-left bg--img-cover bg--img-mrs-distro"
      >
        <div className="section__content bg-white">
          <header className="section__header">
            <h2 className="section__title">Frontline Groups</h2>
          </header>

          <div className="section__body">
            <div className="tiles tiles--grid tiles--highlight">
              <div className="tile tile--column w-1/3">
                <div className="tile-icon mx-auto">
                  <StaticImage
                    className="icon icon--responsive"
                    src="../../images/routes/mrs-logo.256.jpg"
                    alt="Frontline Group Logo: Mobile Refugee Support (MRS)"
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Mobile Refugee Support</p>
                </div>
              </div>

              <div className="tile tile--column w-1/3">
                <div className="tile-icon mx-auto">
                  <StaticImage
                    className="icon icon--responsive icon--rounded"
                    src="../../images/routes/ca-logo.256.jpg"
                    alt="Frontline Group Logo: Collective Aid (CA)"
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Collective Aid</p>
                </div>
              </div>

              <div className="tile tile--column w-1/3">
                <div className="tile-icon mx-auto">
                  <StaticImage
                    className="icon icon--responsive icon--rounded"
                    src="../../images/routes/u56-logo.256.jpg"
                    alt="Frontline Group Logo: Utopia 56 (U56)"
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Utopia 56</p>
                </div>
              </div>

              <div className="tile tile--column w-1/3">
                <div className="tile-icon mx-auto">
                  <StaticImage
                    className="icon icon--responsive icon--rounded"
                    src="../../images/routes/cfc-logo.256.jpg"
                    alt="Frontline Group Logo: Calais Food Collective (CFC)"
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Calais Food Collective</p>
                </div>
              </div>

              <div className="tile tile--column w-1/3">
                <div className="tile-icon mx-auto">
                  <StaticImage
                    className="icon icon--responsive"
                    src="../../images/routes/rck-logo.256.jpg"
                    alt="Frontline Group Logo: Refugee Community Kitchen (RCK)"
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Refugee Community Kitchen</p>
                </div>
              </div>

              <div className="tile tile--column w-1/3">
                <div className="tile-icon mx-auto">
                  <StaticImage
                    className="icon icon--responsive"
                    src="../../images/routes/rwc-logo.256.jpg"
                    alt="Frontline Group Logo: Refugee Women's Center (RWC)"
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Refugee Women's Center</p>
                </div>
              </div>

              <div className="tile tile--column w-1/3">
                <div className="tile-icon mx-auto">
                  <StaticImage
                    className="icon icon--responsive"
                    src="../../images/routes/auberge-logo.256.jpg"
                    alt="Frontline Group Logo: L'Auberge des Migrants (Auberge)"
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">L'Auberge des Migrants</p>
                </div>
              </div>
            </div>
          </div>

          <footer className="section__footer">
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
        </div>
      </section>

      <div className="flex">
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1a1ZBC-Fc-WJCP27ZGx70YFRaAByjdFTS"
            width="100%"
            height="100%"
          />
        </div>

        <section
          id="uk-staging-hubs"
          className="text-navy-700 section w-full md:w-1/2"
        >
          <div className="section__content bg-white">
            <header className="section__header">
              <h1 className="section__title">UK Staging Hubs</h1>
            </header>

            <div className="section__body">
              <p className="mb-4">
                The most{' '}
                <strong>cost efficient and Brexit / pandemic-proof</strong> way
                to send aid from the UK to France is by shipping palletised aid
                on articulated lorries that are loaded by a forklift.{' '}
                <strong>That's where our UK Staging Hubs come in!</strong> They
                have the necessary infrastructure and experience working with us
                to ensure each shipment is fully optimized, which everybody
                benefits from. Once it's in a Staging Hub, your aid will be
                palletised, stored, and loaded by a forklift onto the next
                truck.
              </p>

              <div className="mb-12 flex">
                <div className="tile-icon">
                  <StaticImage
                    src="../../images/routes/pallet-aid-logo.256.png"
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
                    pallets, loose boxes, bulk bags of tents &amp; sleeping
                    bags, etc
                  </p>
                </div>
              </div>
            </div>

            <footer className="section__footer">
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
          </div>
        </section>
      </div>

      <section
        id="storage-and-shipping-charge"
        className="text-navy-700 section flex justify-start items-stretch section--content-left bg--img-cover bg--img-cfc-unloading"
      >
        <div className="section__content bg-white">
          <header className="section__header">
            <h1 className="section__title">Storage &amp; Shipping (£)</h1>
          </header>

          <div className="section__body">
            <p>
              We offer a flat, per-pallet and per-box storage and shipment
              charge (S&amp;S) to take the stress out of budgeting to move your
              aid. By using the Staging Hubs we can keep shipping costs low and
              consistent, and spread the cost evenly for all groups sending aid.
            </p>

            <div className="tiles tiles--row tiles--highlight">
              <div className="tile tile--column">
                <div className="tile-icon mx-auto">
                  <img
                    className="icon icon--responsive"
                    src={palletIcon}
                    alt="Standard Pallet Icon: Four boxes stacked evenly on a pallet."
                  />
                </div>
                <div className="tile-content text-left">
                  <p className="tile-title">Standard Pallet - £75</p>
                  <p>1.2m x 1.0m x 1.70m high</p>
                  <p>700kg</p>
                </div>
              </div>

              <div className="tile tile--column">
                <div className="tile-icon mx-auto">
                  <img
                    className="icon icon--responsive"
                    src={halfPalletIcon}
                    alt="Half Pallet Icon: 3 boxes stacked in a pyramid on a pallet."
                  />
                </div>
                <div className="tile-content text-left">
                  <p className="tile-title">Half Pallet - £45</p>
                  <p>1.2m x 1.0m x 0.85m high</p>
                  <p>350kg</p>
                </div>
              </div>
            </div>

            <h3>What if my aid doesn't fit exactly?</h3>

            <ul>
              <li>
                We encourage groups to work together to submit a combined offer
                that makes up a Standard Pallet or Half Pallet worth of aid.
              </li>
              <li>
                We reserve 2 pallets worth of space on each truck for overflow,
                so if you have slightly more then a Standard Pallet's worth of
                aid that's ok! Overflow pricing is £2.50 per banana box (500mm x
                400mm x 250mm high, holds 15kg).
              </li>
              <li>
                You'll still need to book a Standard Pallet space for
                commercially purchased aid with smaller pallet dimensions.
                Unfortunately, due to the way trucks are packed a smaller pallet
                size doesn't actually allow us to fit more on there. You can
                always contact{' '}
                <a
                  className="stage-action"
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
                accommodate bulky items. Please submit the exact dimensions of
                the item on the offer form so we can assess how many Standard
                Pallets it will require, and ensure that we book a curtain-side
                truck to load it.
              </li>
            </ul>
          </div>

          <footer className="section__footer">
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
        </div>
      </section>

      <section
        id="all-about-pallets"
        className="text-navy-700 section section--content-right bg--img-cover bg--img-collection-and-sorting"
      >
        <div className="section__content bg-white">
          <header className="section__header">
            <h1 className="section__title">All About Pallets</h1>
          </header>

          <div className="section__body">
            <h3>How many Standard Pallet spaces do I need?</h3>

            <div className="tiles tiles--column tiles--highlight">
              <div className="tile flex">
                <div className="tile-icon w-20 flex-shrink-0">
                  <img
                    className="icon icon--responsive"
                    src={vanIcon}
                    alt="Van Icon: The Calais classic."
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Van Loads</p>
                  <p>
                    The Calais classic. Most Vans fit about{' '}
                    <strong>3 Standard Pallets</strong> worth of aid in the
                    back.
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
                  <p className="tile-title">Bulk Bags</p>
                  <p>
                    Perfect for those larger, clumsier items like tents or
                    sleeping bags that are too awkward to box up.
                  </p>
                  <ul className="list--v-inline">
                    <li>
                      Each Bulk Bag takes up one <strong>Half Pallet</strong>{' '}
                      space.
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
                  <p className="tile-title">Banana Boxes</p>
                  <p>
                    Easy to acquire, small, and sturdy boxes. Each Banana Box
                    should hold a specific item, such as mens small pants or
                    women's medium winter sweaters. Any consistently sized box
                    could be used to fill a Standard or Half pallet. Banana Box
                    sizes can vary a bit, but a good rule of thumb is:
                  </p>
                  <ul className="list--v-inline">
                    <li>
                      <strong>Dimensions:</strong> 500mm x 400mm x 250mm high,
                      holds 15kg
                    </li>
                    <li>
                      18 Banana Boxes make up a <strong>Half Pallet</strong>
                    </li>
                    <li>
                      36 Banana Boxes can fit on a{' '}
                      <strong>Standard Pallet</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <footer className="section__footer">
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
        </div>
      </section>
    </RouteLayout>
  )
}

export default UkToFrance
