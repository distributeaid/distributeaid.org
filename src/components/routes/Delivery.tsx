import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { FC } from 'react'
import heartBillIcon from '../../images/regular-routes/icons/noun_Heart_Bill_98293.svg'
import mapIcon from '../../images/regular-routes/icons/noun_Maps_3610706.svg'
import netIcon from '../../images/regular-routes/icons/noun_net_2428552.svg'
import truckIcon from '../../images/regular-routes/icons/openmoji_truck.svg'
import IconWithText from './IconWithText'
import PhotoCredit from './PhotoCredit'
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
        <h1 className="flex justify-center mb-1 uppercase text-4xl">
          Delivery
        </h1>
        <h2 className="text-2xl">
          Regular Route: {routeOrigin}&rarr;
          {routeDestination}
        </h2>
      </header>

      <div className="mt-4">
        <MarkdownContent content={introduction} />
        <div className="flex flex-wrap justify-center mt-4">
          <IconWithText
            icon={netIcon}
            altText="Hub Icon: Multiple nodes connected to a center hub."
            description="UK Staging Hub in Coventry"
          />
          <IconWithText
            icon={mapIcon}
            altText="Map Icon: A destination marker on a map."
            description={`Service to ${routeDestination}, supporting ${frontlineGroups.length} frontline groups`}
          />
          <IconWithText
            icon={truckIcon}
            altText="Truck Icon: A truck in motion."
            description={'Regular shipments, scaled to demand'}
          />
          <IconWithText
            icon={heartBillIcon}
            altText="Money Icon: A currency bill with a heart in the middle."
            description="Fair flat-rate pricing, all-inclusive, at-cost"
          />
        </div>
      </div>
      <PhotoCredit
        url="https://www.facebook.com/groups/hertsforrefugees/permalink/3488608217903521/"
        description="Mark Lampert of Herts For Refugees"
      />
    </TextWithVisual>
  )
}

export default Delivery
