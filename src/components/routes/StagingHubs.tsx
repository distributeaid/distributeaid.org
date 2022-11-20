import { StaticImage } from 'gatsby-plugin-image'
import { FC } from 'react'
import SectionTitle from './SectionTitle'
import TextWithVisual from './TextWithVisual'

type StagingHubsProps = {
  mapUrl: string
}
const StagingHubs: FC<StagingHubsProps> = ({ mapUrl }) => {
  return (
    <TextWithVisual
      id="uk-staging-hubs"
      positionOfVisual="left"
      visual={
        <iframe
          className="w-full md:w-2/4 h-96 md:h-auto"
          src={mapUrl}
          width="100%"
          height="100%"
          title="routeMap"
        />
      }
    >
      <SectionTitle title="UK Staging Hubs" />
      <div>
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
          <div>
            <StaticImage
              src="../../images/regular-routes/pallet-aid-logo.256.png"
              alt="Hub Logo: Pallet Aid (PA)"
              height={80}
              width={80}
            />
          </div>
          <div className="flex flex-col items-start justify-center ml-4">
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
  )
}

export default StagingHubs
