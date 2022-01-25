import { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import RouteLayout from '../../layouts/Route'
import logoSrc from '../../images/lettermark_blue.svg'
import netIcon from '../../images/regular-routes/icons/noun_net_2428552.svg'
import mapIcon from '../../images/regular-routes/icons/noun_Maps_3610706.svg'
import truckIcon from '../../images/regular-routes/icons/noun_Truck_1731459.svg'
import heartBillIcon from '../../images/regular-routes/icons/noun_Heart_Bill_98293.svg'
import halfPalletIcon from '../../images/regular-routes/icons/noun_Pallet_3364535.svg'
import palletIcon from '../../images/regular-routes/icons/noun_Pallet_3307940.svg'
import boxIcon from '../../images/regular-routes/icons/noun_Box_1897159.svg'
import sackIcon from '../../images/regular-routes/icons/noun_sack_1468937.svg'
import vanIcon from '../../images/regular-routes/icons/noun_Van_485356.svg'

import theFreeShopBackground from './the-free-shop-unloading.jpg'
import palletStorageBackground from './pallet-storage.jpg'
import settlementLebanonBackground from './informal-tented-settlement-lebanon.jpg'
import forkliftLoadingBackground from './forklift-loading-2.jpg'
import collectionBackground from './collection-and-sorting.jpg'
import SimpleLayout from '@layouts/Simple'
import TextWithVisual from '../../components/routes/TextWithVisual'
import RoutesSectionImage from '../../components/routes/RoutesSectionImage'

const UkToLebanon: FC = () => {
  return (
    <SimpleLayout pageTitle="Route: UK to Lebanon">
      <TextWithVisual
        positionOfVisual="right"
        visual={
          <RoutesSectionImage
            ariaLabel="Two people sitting in the back of a fully loaded truck"
            image={theFreeShopBackground}
          />
        }
      >
        <header className="mb-4 text-center">
          <h1 className="section__title">
            <img
              width="130"
              height="60"
              src={logoSrc}
              alt="Distribute Aid Logo: A flock of doves stylized by stacking wings behind the main outline of a dove."
            />
            <span>Delivery</span>
          </h1>
          <h2 className="text-2xl">Regular Route: UK&rarr;Lebanon</h2>
        </header>

        <div className="section__body">
          <p className="mb-4">
            Distribute Aid is organising a shipment of humanitarian aid between
            the UK and Lebanon. We won't let pandemics or global supply chain
            disruptions stop the flow of aid to those who need it most! &#9829;
          </p>
          <p className="mb-4">
            If you're here because you want to donate goods for displaced
            peoples in Lebanon-{' '}
            <strong className="text-uppercase">thank you!</strong> Groups on the
            ground would not be able to provide the services they do without
            support from donations like yours.
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
                <p className="mb-1">1 UK Staging Hub</p>
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
                <p className="mb-1">Service to Lebanon</p>
                <p>Supporting 7 Frontline Groups</p>
              </div>
            </div>

            <div className="tile tile--column w-1/2">
              <div className="tile-icon mx-auto">
                <img
                  className="icon icon--responsive"
                  src={truckIcon}
                  alt="Ship Icon: A container ship in motion."
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
          <p className="photo-credit text-center hide-sm">
            <span>Background Photo Credit:</span>{' '}
            <a
              href="https://www.instagram.com/thefreeshoplebanon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alice Corrigan of The Free Shop
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
          <ol className="">
            <li className="">
              <h4 className="text-lg font-semibold mb-4">
                1) Submit Your Aid Delivery Request
              </h4>
              <p className="mb-4">
                Download the{' '}
                <a
                  className="stage-action"
                  href="/docs/da_aid-delivery-request_uk-to-lebanon.xlsx"
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
                . Your local Staging Hub will receive it and follow up if there
                are any questions.
              </p>
              <p className="h5">
                Submissions Close: Sunday, 21st November 2021
              </p>
            </li>
            <li className="stage">
              <h4 className="text-lg font-semibold mb-4">
                2) Consult Frontline Groups
              </h4>
              <p className="mb-4">
                We'll check in with the frontline groups after the form
                submission deadline, to prioritise deliveries that meet their
                biggest needs and build a manifest for the upcoming shipment
                with their input. Then we can confirm if you have a place
                reserved on the next container.
              </p>
              <p className="h5">
                Confirmation Date: Wednesday, 24th November 2021
              </p>
            </li>
            <li className="stage">
              <h4 className="text-lg font-semibold mb-4">
                3) Drop Off @ Staging Hubs
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
                Staging Period: 27th November - 2nd December 2021
              </p>
            </li>
            <li className="stage">
              <h4 className="text-lg font-semibold mb-4">4) Deliver The Aid</h4>
              <p className="mb-4">
                <strong>And that's it!</strong> Take an evening off to celebrate
                a job well done, we got it from here. Once your aid is delivered
                we'll follow up with an after-shipment report, including photos
                and acknowledgments from the frontline groups.
              </p>
              <p className="h5">Container Departs: Friday, 3rd November 2021</p>
            </li>
          </ol>
        </div>

        <footer>
          <p className="photo-credit text-center hide-sm">
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
            ariaLabel="A refugee settlement."
            image={settlementLebanonBackground}
          />
        }
      >
        <header className="mb-4 text-center">
          <h2 className="section__title">Frontline Groups</h2>
        </header>
        <div className="section__body">
          <div className="tiles tiles--grid ">
            <div className="tile tile--column col-3">
              <div className="tile-icon tile-icon--auto">
                <StaticImage
                  height={140}
                  width={140}
                  className="icon icon--responsive"
                  src="../../images/regular-routes/the-free-shop-logo.392.png"
                  alt="Frontline Group Logo: The Free Shop"
                />
              </div>
            </div>

            <div className="tile tile--column col-7">
              <div className="tile-icon tile-icon--auto">
                <StaticImage
                  height={85}
                  width={360}
                  className="icon icon--responsive"
                  src="../../images/regular-routes/beirut-celebrations-logo.1061x256.png"
                  alt="Frontline Group Logo: Beirut Celebrations"
                />
              </div>
            </div>

            <div className="tile tile--column col-7">
              <div className="tile-icon tile-icon--auto">
                <StaticImage
                  height={180}
                  width={360}
                  className="icon icon--responsive"
                  src="../../images/regular-routes/ema-logo.512x256.jpg"
                  alt="Frontline Group Logo: Endless Medical Advantage (EMA)"
                />
              </div>
            </div>

            <div className="tile tile--column col-3">
              <div className="tile-icon tile-icon--auto">
                <StaticImage
                  height={145}
                  width={145}
                  className="icon icon--responsive"
                  src="../../images/regular-routes/live-love-beirut-logo.256.png"
                  alt="Frontline Group Logo: Live Love Beirut"
                />
              </div>
            </div>

            <div className="tile tile--column col-6 col-mx-auto">
              <div className="tile-icon tile-icon--auto">
                <StaticImage
                  height={168}
                  width={300}
                  className="icon icon--responsive"
                  src="../../images/regular-routes/wing-woman-logo.300x168.jpg"
                  alt="Frontline Group Logo: Wing Woman"
                />
              </div>
            </div>

            <div className="tile tile--column col-6 col-mx-auto">
              <div className="tile-icon tile-icon--auto">
                <StaticImage
                  height={173}
                  width={307}
                  className="icon icon--responsive"
                  src="../../images/regular-routes/arcenciel-logo.455x256.jpg"
                  alt="Frontline Group Logo: Arcenciel"
                />
              </div>
            </div>

            <div className="tile tile--column col-6 col-mx-auto">
              <div className="tile-icon tile-icon--auto">
                <StaticImage
                  height={82}
                  width={262}
                  className="icon icon--responsive"
                  src="../../images/regular-routes/shaabe-logo.262x82.jpg"
                  alt="Frontline Group Logo: Shaabe"
                />
              </div>
              <div className="tile-content">
                <p className="mb-1">Shaabe</p>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <p className="photo-credit text-center hide-sm">
            <span>Background Photo Credit:</span>{' '}
            <a
              href="https://www.instagram.com/thefreeshoplebanon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alice Corrigan of The Free Shop
            </a>
          </p>
        </footer>
      </TextWithVisual>

      <TextWithVisual
        id="frontline-groups"
        positionOfVisual="left"
        visual={
          <iframe
            className="w-full md:w-2/4 h-96 md:h-auto"
            src="https://www.google.com/maps/d/u/0/embed?mid=1ZRALkbEQoigOjaT5tFEgJtVFkXBOW6LM"
            width="100%"
            height="100%"
          />
        }
      >
        <header className="mb-4 text-center">
          <h1 className="section__title">UK Staging Hubs</h1>
        </header>

        <div className="section__body">
          <p>
            The most <strong>cost efficient and pandemic-proof</strong> way to
            send aid from the UK to Lebanon is by shipping palletised aid in
            containers.{' '}
            <strong>That's where our UK Staging Hubs come in!</strong> They have
            the necessary infrastructure and experience working with us to
            ensure each shipment is fully optimized, which everybody benefits
            from. Once it's in a Staging Hub, your aid will be palletised,
            stored, and loaded by a forklift onto the next container.
          </p>

          <div className="tiles tiles--column ">
            <div className="tile flex">
              <div className="tile-icon flex-shrink-0">
                <StaticImage
                  src="../../images/regular-routes/pallet-aid-logo.256.png"
                  alt="Hub Logo: Pallet Aid (PA)"
                  height={80}
                  width={80}
                />
              </div>
              <div className="tile-content">
                <p className="mb-1">Cambridgeshire</p>
                <p>Both Community &amp; Commercial Aid</p>
                <p className="text-italic">
                  pallets, loose boxes, bulk bags of tents &amp; sleeping bags,
                  etc
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <p className="photo-credit text-center hide-sm">
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
            image={forkliftLoadingBackground}
          />
        }
      >
        <header className="mb-4 text-center">
          <h1 className="section__title">Storage &amp; Shipping (£)</h1>
        </header>

        <div className="section__body">
          <p>
            We offer a flat, per-pallet storage and shipment charge (S&amp;S) to
            take the stress out of budgeting to move your aid. By using the
            Staging Hubs we can keep shipping costs low and consistent, and
            spread the cost evenly for all groups sending aid.
          </p>

          <div className="tiles tiles--row ">
            <div className="tile tile--column">
              <div className="tile-icon mx-auto">
                <img
                  className="icon icon--responsive"
                  src={palletIcon}
                  alt="Standard Pallet Icon: Four boxes stacked evenly on a pallet."
                />
              </div>
              <div className="tile-content text-left">
                <p className="mb-1">Standard Pallet - ££</p>
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
                <p className="mb-1">Half Pallet - £</p>
                <p>1.2m x 1.0m x 0.85m high</p>
                <p>350kg</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-medium">
            What if my aid doesn't fit exactly?
          </h3>

          <ul>
            <li>
              We encourage groups to work together to submit a combined offer
              that makes up a Standard Pallet or Half Pallet worth of aid.
            </li>
            <li>
              We reserve 2 pallets worth of space on each truck for overflow, so
              if you have slightly more then a Standard Pallet's worth of aid
              that's ok! Overflow pricing is £6 per banana box (500mm x 400mm x
              250mm high, holds 15kg).
            </li>
            <li>
              You'll still need to book a Standard Pallet space for commercially
              purchased aid with smaller pallet dimensions. Unfortunately, due
              to the way trucks are packed a smaller pallet size doesn't
              actually allow us to fit more on there. You can always contact{' '}
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
              accommodate bulky items. Please submit the exact dimensions of the
              item on the offer form so we can assess how many Standard Pallets
              it will require, and ensure that we book the right type of truck
              to load it.
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-12 mb-4">
            How are contribution prices set?
          </h3>

          <p>
            Our goal is to provide the best possible flat rate for sending
            groups! The current contribution prices are based on shipping prices
            so far this year. As of November/December 2021, the price/pallet is
            currently set at £250, covering shipping, storage and anticipated
            taxes.
          </p>
        </div>

        <footer>
          <p className="photo-credit text-center hide-sm">
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
          <h3>How many Standard Pallet spaces do I need?</h3>

          <div className="tiles tiles--column ">
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
                  Perfect for those larger, clumsier items like tents or
                  sleeping bags that are too awkward to box up.
                </p>
                <ul className="">
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
                <p className="mb-1">Banana Boxes</p>
                <p>
                  Easy to acquire, small, and sturdy boxes. Each Banana Box
                  should hold a specific item, such as mens small pants or
                  women's medium winter sweaters. Any consistently sized box
                  could be used to fill a Standard or Half pallet. Banana Box
                  sizes can vary a bit, but a good rule of thumb is:
                </p>
                <ul className="">
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
}

export default UkToLebanon
