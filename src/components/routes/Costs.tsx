import { FC } from 'react'
import palletIcon from '../../images/regular-routes/icons/noun_Pallet_3307940.svg'
import halfPalletIcon from '../../images/regular-routes/icons/noun_Pallet_3364535.svg'
import IconWithTextXL from '../icon/IconWithTextXL'
import PhotoCredit from './PhotoCredit'
import { RouteCosts, RouteImages } from './RouteComponentTypes'
import RoutesSectionImage from './RoutesSectionImage'
import SectionTitle from './SectionTitle'
import TextWithVisual from './TextWithVisual'

type CostsProps = {
  images: RouteImages
  costs: RouteCosts
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

const Costs: FC<CostsProps> = ({ images, costs }) => {
  return (
    <TextWithVisual
      id="storage-and-shipping-charge"
      positionOfVisual="right"
      visual={
        <RoutesSectionImage
          ariaLabel="Pallets with lots of cans of food and a person celebrating the successful unloading."
          image={images.storageSection}
        />
      }
    >
      <SectionTitle title="Storage &amp; Shipping (£)" />
      <div className="mt-4">
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

        <div className="flex flex-wrap justify-center mt-4">
          <IconWithTextXL
            icon={palletIcon}
            altText="Standard Pallet Icon: Four boxes stacked evenly on a pallet."
            line1={`Standard Pallet -${' '}
            ${formatCostInCurrency(costs.standardPaletteCost, costs.currency)}`}
            line2="1.2m x 1.0m x 1.70m high"
            line3="700kg"
          />
          <IconWithTextXL
            icon={halfPalletIcon}
            altText="Half Pallet Icon: 3 boxes stacked in a pyramid on a pallet."
            line1={`Half Pallet -${' '}
            ${formatCostInCurrency(costs.halfPaletteCost, costs.currency)}`}
            line2="1.2m x 1.0m x 0.85m high"
            line3="350kg"
          />
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
              {formatCostInCurrency(costs.overflowPricing, costs.currency)} per
              banana box (500mm x 400mm x 250mm high, holds 15kg).
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
  )
}

export default Costs
