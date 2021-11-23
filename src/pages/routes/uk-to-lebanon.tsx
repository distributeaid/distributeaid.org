import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import RouteLayout from '../../layouts/Route'
import logoSrc from '../../images/lettermark_blue.svg'

const UkToLebanon: FC = () => {
  return (
    <RouteLayout>
      <Helmet>
        <title>Route: UK to Lebanon</title>
      </Helmet>
      <section className="text-navy-700 relative min-h-screen flex justify-start items-stretch bg--img-cover bg--img-free-shop-unloading">
        <div className="section__content bg--white">
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
            <h2 className="section__subtitle">
              Regular Route: UK&rarr;Lebanon
            </h2>
          </header>

          <div className="section__body">
            <p>
              Distribute Aid is organising a shipment of humanitarian aid
              between the UK and Lebanon. We won't let pandemics or global
              supply chain disruptions stop the flow of aid to those who need it
              most! &#9829;
            </p>
            <p>
              If you're here because you want to donate goods for displaced
              peoples in Lebanon-{' '}
              <strong className="text-uppercase">thank you!</strong> Groups on
              the ground would not be able to provide the services they do
              without support from donations like yours.
            </p>

            <div className="tiles tiles--grid tiles--highlight">
              <div className="tile tile--column col-6">
                <div className="tile-icon">
                  <img
                    className="icon icon--responsive"
                    src="/img/icons/noun_net_2428552.svg"
                    alt="Hub Icon: Multiple nodes connected to a center hub."
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">1 UK Staging Hub</p>
                  <p>Cambridge</p>
                </div>
              </div>

              <div className="tile tile--column col-6">
                <div className="tile-icon">
                  <img
                    className="icon icon--responsive"
                    src="/img/icons/noun_Maps_3610706.svg"
                    alt="Map Icon: A destination marker on a map."
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Service to Lebanon</p>
                  <p>Supporting 7 Frontline Groups</p>
                </div>
              </div>

              <div className="tile tile--column col-6">
                <div className="tile-icon">
                  <img
                    className="icon icon--responsive"
                    src="/img/icons/noun_Shipping_2027289.svg"
                    alt="Ship Icon: A container ship in motion."
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Regular Shipments</p>
                  <p>Scaled To Demand</p>
                </div>
              </div>

              <div className="tile tile--column col-6">
                <div className="tile-icon">
                  <img
                    className="icon icon--responsive"
                    src="/img/icons/noun_Heart_Bill_98293.svg"
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
        </div>
      </section>

      <section
        id="reserve-your-spot"
        className="section section--content-right bg--img-cover bg--img-pallet-storage"
      >
        <div className="section__content bg--white">
          <header className="section__header">
            <h2 className="section__title">Reserve Your Spot!</h2>
          </header>

          <div className="section__body">
            <ol className="stages list--unstyled">
              <li className="stage stage--active">
                <h4>1) Submit Your Aid Delivery Request</h4>
                <p>
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
                <p>
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
                <p className="h5">Submissions Close: Sunday, May 9th</p>
              </li>
              <li className="stage">
                <h4>2) Consult Frontline Groups</h4>
                <p>
                  We'll check in with the frontline groups after the form
                  submission deadline, to prioritise deliveries that meet their
                  biggest needs and build a manifest for the upcoming shipment
                  with their input. Then we can confirm if you have a place
                  reserved on the next container.
                </p>
                <p className="h5">Confirmation Date: Friday, May 14th</p>
              </li>
              <li className="stage">
                <h4>3) Drop Off @ Staging Hubs</h4>
                <p>
                  Schedule a drop-off appointment with your local Staging Hub,
                  pay them the flat-rate{' '}
                  <a href="#storage-and-shipping-charge">
                    Storage &amp; Shipping charge
                  </a>
                  , and deliver the boxes of aid at the agreed time.
                </p>
                <p className="h5">Staging Period: May 22nd - May 29th</p>
              </li>
              <li className="stage">
                <h4>4) Deliver The Aid</h4>
                <p>
                  <strong>And that's it!</strong> Take an evening off to
                  celebrate a job well done, we got it from here. Once your aid
                  is delivered we'll follow up with an after-shipment report,
                  including photos and acknowledgments from the frontline
                  groups.
                </p>
                <p className="h5">Container Departs: Monday, May 30th</p>
              </li>
            </ol>
          </div>

          <footer className="section__footer">
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
        </div>
      </section>

      <section
        id="frontline-groups"
        className="section flex justify-start items-stretch bg--img-cover bg--img-its-lebanon"
      >
        <div className="section__content bg--white">
          <header className="section__header">
            <h2 className="section__title">Frontline Groups</h2>
          </header>

          <div className="section__body">
            <div className="tiles tiles--grid tiles--highlight">
              <div className="tile tile--column col-3">
                <div className="tile-icon tile-icon--auto">
                  <img
                    className="icon icon--responsive"
                    src="./frontline-logos/the-free-shop-logo.392.png"
                    alt="Frontline Group Logo: The Free Shop"
                  />
                </div>
              </div>

              <div className="tile tile--column col-7">
                <div className="tile-icon tile-icon--auto">
                  <img
                    className="icon icon--responsive"
                    src="./frontline-logos/beirut-celebrations-logo.1061x256.png"
                    alt="Frontline Group Logo: Beirut Celebrations"
                  />
                </div>
              </div>

              <div className="tile tile--column col-7">
                <div className="tile-icon tile-icon--auto">
                  <img
                    className="icon icon--responsive"
                    src="./frontline-logos/ema-logo.512x256.jpg"
                    alt="Frontline Group Logo: Endless Medical Advantage (EMA)"
                  />
                </div>
              </div>

              <div className="tile tile--column col-3">
                <div className="tile-icon tile-icon--auto">
                  <img
                    className="icon icon--responsive"
                    src="./frontline-logos/live-love-beirut-logo.256.png"
                    alt="Frontline Group Logo: Live Love Beirut"
                  />
                </div>
              </div>

              <div className="tile tile--column col-6 col-mx-auto">
                <div className="tile-icon tile-icon--auto">
                  <img
                    className="icon icon--responsive"
                    src="./frontline-logos/wing-woman-logo.300x168.jpg"
                    alt="Frontline Group Logo: Wing Woman"
                  />
                </div>
              </div>

              <div className="tile tile--column col-6 col-mx-auto">
                <div className="tile-icon tile-icon--auto">
                  <img
                    className="icon icon--responsive"
                    src="./frontline-logos/arcenciel-logo.455x256.jpg"
                    alt="Frontline Group Logo: Arcenciel"
                  />
                </div>
              </div>

              <div className="tile tile--column col-6 col-mx-auto">
                <div className="tile-icon tile-icon--auto">
                  <img
                    className="icon icon--responsive"
                    src="./frontline-logos/shaabe-logo.262x82.jpg"
                    alt="Frontline Group Logo: Shaabe"
                  />
                </div>
                <div className="tile-content">
                  <p className="tile-title">Shaabe</p>
                </div>
              </div>
            </div>
          </div>

          <footer className="section__footer">
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
        </div>
      </section>

      <div className="display-flex">
        <div className="col-6 col-sm-12">
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1ZRALkbEQoigOjaT5tFEgJtVFkXBOW6LM"
            width="100%"
            height="100%"
          ></iframe>
        </div>

        <section id="uk-staging-hubs" className="section col-6 col-sm-12">
          <div className="section__content bg--white">
            <header className="section__header">
              <h1 className="section__title">UK Staging Hubs</h1>
            </header>

            <div className="section__body">
              <p>
                The most <strong>cost efficient and pandemic-proof</strong> way
                to send aid from the UK to Lebanon is by shipping palletised aid
                in containers.{' '}
                <strong>That's where our UK Staging Hubs come in!</strong> They
                have the necessary infrastructure and experience working with us
                to ensure each shipment is fully optimized, which everybody
                benefits from. Once it's in a Staging Hub, your aid will be
                palletised, stored, and loaded by a forklift onto the next
                container.
              </p>

              <div className="tiles tiles--column tiles--highlight">
                <div className="tile">
                  <div className="tile-icon">
                    <img
                      className="icon icon--responsive"
                      src="./hub-logos/camcrag-logo.jpg"
                      alt="Hub Logo: Cambridge Convoy Refugee Action Group (CamCRAG)"
                    />
                  </div>
                  <div className="tile-content">
                    <p className="tile-title">Cambridge - South England</p>
                    <p>Both Community &amp; Commercial Aid</p>
                    <p className="text-italic">
                      pallets, loose boxes, bulk bags of tents &amp; sleeping
                      bags, etc
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <footer className="section__footer">
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
          </div>
        </section>
      </div>

      <section
        id="storage-and-shipping-charge"
        className="section flex justify-start items-stretch bg--img-cover bg--img-forklift-loading-2"
      >
        <div className="section__content bg--white">
          <header className="section__header">
            <h1 className="section__title">Storage &amp; Shipping (£)</h1>
          </header>

          <div className="section__body">
            <p>
              We offer a flat, per-pallet storage and shipment charge (S&amp;S)
              to take the stress out of budgeting to move your aid. By using the
              Staging Hubs we can keep shipping costs low and consistent, and
              spread the cost evenly for all groups sending aid.
            </p>

            <div className="tiles tiles--row tiles--highlight">
              <div className="tile tile--column">
                <div className="tile-icon">
                  <img
                    className="icon icon--responsive"
                    src="/img/icons/noun_Pallet_3307940.svg"
                    alt="Standard Pallet Icon: Four boxes stacked evenly on a pallet."
                  />
                </div>
                <div className="tile-content text-left">
                  <p className="tile-title">Standard Pallet - ££</p>
                  <p>1.2m x 1.0m x 1.70m high</p>
                  <p>700kg</p>
                </div>
              </div>

              <div className="tile tile--column">
                <div className="tile-icon">
                  <img
                    className="icon icon--responsive"
                    src="/img/icons/noun_Pallet_3364535.svg"
                    alt="Half Pallet Icon: 3 boxes stacked in a pyramid on a pallet."
                  />
                </div>
                <div className="tile-content text-left">
                  <p className="tile-title">Half Pallet - £</p>
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
                Pallets it will require, and ensure that we book the right type
                of truck to load it.
              </li>
            </ul>

            <h3>When will prices be set?</h3>

            <p>
              This is a new route, so we are currently comparing quotes from our
              commercial partners. Our goal is to provide the best possible flat
              rate for sending groups! We will reach out to all groups who have
              had their aid offers matched to confirm pricing as soon as we can.
            </p>
          </div>

          <footer className="section__footer">
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
        </div>
      </section>

      <section
        id="all-about-pallets"
        className="section section--content-right bg--img-cover bg--img-collection-and-sorting"
      >
        <div className="section__content bg--white">
          <header className="section__header">
            <h1 className="section__title">All About Pallets</h1>
          </header>

          <div className="section__body">
            <h3>How many Standard Pallet spaces do I need?</h3>

            <div className="tiles tiles--column tiles--highlight">
              <div className="tile">
                <div className="tile-icon">
                  <img
                    className="icon icon--responsive"
                    src="/img/icons/noun_Van_485356.svg"
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
              <div className="tile">
                <div className="tile-icon">
                  <img
                    className="icon icon--responsive"
                    src="/img/icons/noun_sack_1468937.svg"
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
              <div className="tile">
                <div className="tile-icon">
                  <img
                    className="icon icon--responsive"
                    src="/img/icons/noun_Box_1897159.svg"
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

export default UkToLebanon
