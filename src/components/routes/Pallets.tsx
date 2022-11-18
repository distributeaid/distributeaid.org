import { FC } from 'react'
import sackIcon from '../../images/regular-routes/icons/openmoji_bag.svg'
import boxIcon from '../../images/regular-routes/icons/openmoji_box.svg'
import vanIcon from '../../images/regular-routes/icons/openmoji_van.svg'
import IconWithText from '../icon/IconWithText'
import PhotoCredit from './PhotoCredit'
import { RouteImages } from './RouteComponentTypes'
import RoutesSectionImage from './RoutesSectionImage'
import SectionTitle from './SectionTitle'
import TextWithVisual from './TextWithVisual'

type PalletsProps = {
  images: RouteImages
}

const Pallets: FC<PalletsProps> = ({ images }) => {
  return (
    <TextWithVisual
      id="all-about-pallets"
      positionOfVisual="left"
      visual={
        <RoutesSectionImage
          ariaLabel="Three people sorting and packing clothes into boxes."
          image={images.palletsSection}
        />
      }
    >
      <SectionTitle title="All About Pallets" />
      <div className="mt-4">
        <h2 className="font-bold">
          How many Standard Pallet spaces do I need?
        </h2>

        <div className="flex flex-col mb-4 divide-y-2 divide-navy-700/50%">
          <IconWithText
            icon={vanIcon}
            altText="Van Icon: The Calais classic."
            description={
              <div className="flex flex-col justify-center w-4/5">
                <p className="mb-1">Van Loads</p>
                <p>
                  The Calais classic. Most Vans fit about{' '}
                  <strong>3 Standard Pallets</strong> worth of aid in the back.
                </p>
              </div>
            }
            positionOfVisual="horizontal"
          />

          <IconWithText
            icon={sackIcon}
            altText="Bulk Bag Icon: A large sack."
            description={
              <div className="flex flex-col justify-center w-4/5">
                <p className="mb-1">Bulk Bags</p>
                <p>
                  Perfect for those larger, clumsier items like tents or
                  sleeping bags that are too awkward to box up.
                </p>
                <ul className="mt-1">
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
            }
            positionOfVisual="horizontal"
          />

          <IconWithText
            icon={boxIcon}
            altText="Confirmed Box Icon: The proverbial banana box."
            description={
              <div className="flex flex-col justify-center w-4/5">
                <p className="mb-1">Banana Boxes</p>
                <p>
                  Easy to acquire, small, and sturdy boxes. Each Banana Box
                  should hold a specific item, such as mens small pants or
                  women's medium winter sweaters. Any consistently sized box
                  could be used to fill a Standard or Half pallet. Banana Box
                  sizes can vary a bit, but a good rule of thumb is:
                </p>
                <ul className="mt-1">
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
            }
            positionOfVisual="horizontal"
          />
        </div>
      </div>

      <PhotoCredit
        url="https://www.facebook.com/DGRefugeeAction"
        description="Jay Rubenstien of Massive Outpouring of Love"
      />
    </TextWithVisual>
  )
}

export default Pallets
