import { FC } from 'react'
import PhotoCredit from './PhotoCredit'
import { RouteFrontlineGroup, RouteImages } from './RouteComponentTypes'
import RoutesSectionImage from './RoutesSectionImage'
import SectionTitle from './SectionTitle'
import TextWithVisual from './TextWithVisual'

type FrontlineProps = {
  images: RouteImages
  frontlineGroups: RouteFrontlineGroup[]
}

const Frontline: FC<FrontlineProps> = ({ images, frontlineGroups }) => {
  return (
    <TextWithVisual
      id="frontline-groups"
      positionOfVisual="right"
      visual={
        <RoutesSectionImage
          ariaLabel="Mobile refugee support station with a few people gathering."
          image={images.groupsSection}
        />
      }
    >
      <SectionTitle title="Frontline Groups" />
      <div className="mb-8">
        <div className="flex flex-wrap gap-6 justify-center">
          {frontlineGroups.map((group, index) => (
            <div
              className="w-full"
              style={{ maxWidth: 160 }}
              key={`group-${index}`}
            >
              <img
                className="icon icon--responsive mx-auto rounded-full"
                src={group.logo}
                alt={`Frontline Group Logo: ${group.name}`}
                style={{ width: 120 }}
              />
              <div className="text-center text-sm mt-4">{group.name}</div>
            </div>
          ))}
        </div>
      </div>

      <PhotoCredit
        url="https://www.facebook.com/MobileRefugeeSupport/posts/1492064960999110"
        description="Mobile Refugee Support"
      />
    </TextWithVisual>
  )
}

export default Frontline
