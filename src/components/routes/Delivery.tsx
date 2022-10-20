import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { FC } from 'react'
import heartBillIcon from '../../images/regular-routes/icons/noun_Heart_Bill_98293.svg'
import mapIcon from '../../images/regular-routes/icons/noun_Maps_3610706.svg'
import netIcon from '../../images/regular-routes/icons/noun_net_2428552.svg'
import truckIcon from '../../images/regular-routes/icons/openmoji_truck.svg'
import { RouteFrontlineGroup, RouteImages } from './RouteComponentTypes'
import RoutesSectionImage from './RoutesSectionImage'
import TextWithVisual from './TextWithVisual'

type DeliveryProps = {
  images: RouteImages
  introduction: string
  routeDestination: string
  routeOrigin: string
  frontlineGroups: RouteFrontlineGroup[]
}

const Delivery: FC<DeliveryProps> = ({
  frontlineGroups,
  images,
  introduction,
  routeDestination,
  routeOrigin,
}) => {
  console.log('here')
  return (
    <TextWithVisual
      positionOfVisual="right"
      visual={
        <RoutesSectionImage
          ariaLabel="Fork lift loading pallets into a truck"
          image={images.deliverySection}
        />
      }
    >
      <header className="my-4 text-center">
        <h1 className="section__title">Delivery</h1>
        <h2 className="text-2xl">
          Regular Route: {routeOrigin}&rarr;
          {routeDestination}
        </h2>
      </header>

      <div className="section__body space-y-4">
        <MarkdownContent content={introduction} />
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
              <p>Coventry</p>
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
              <p className="mb-1">Service to {routeDestination}</p>
              <p>Supporting {frontlineGroups.length} Frontline Groups</p>
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
  )
}

export default Delivery
