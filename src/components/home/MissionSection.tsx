import SocialIconContainer from '@components/social-media/SocialIconContainer'
import { FC } from 'react'
import mapImage from '../../images/homepage-banner-image.svg'

type Props = {
  missionStatement: string
}

const MissionSection: FC<Props> = ({ missionStatement }) => {
  return (
    <section className="bg-navy-50 px-4 py-20">
      <div className="max-w-7xl mx-auto lg:flex justify-between items-center">
        <div
          className="space-y-6 text-navy-700 text-2xl lg:text-3xl lg:w-1/2 lg:leading-snug"
          dangerouslySetInnerHTML={{ __html: missionStatement }}
        />
        <img
          className="hidden lg:block"
          src={mapImage}
          alt="Map of where Distribute Aid has operated in the past"
        />
        <SocialIconContainer position="side" />
      </div>
    </section>
  )
}

export default MissionSection
