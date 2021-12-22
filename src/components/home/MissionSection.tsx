import SocialIconContainer from '@components/social-media/SocialIconContainer'
import { FC } from 'react'
import mapImage from '../../images/homepage-banner-image.svg'

const MissionSection: FC = () => {
  return (
    <section className="bg-navy-50 px-4 py-20">
      <div className="max-w-7xl mx-auto lg:flex justify-between items-center">
        <div className="space-y-6 text-navy-700 text-2xl lg:text-3xl lg:w-1/2 lg:leading-snug">
          <p>
            Distribute Aid delivers humanitarian aid to communities in need.
          </p>
          <p>
            By coordinating end-to-end shipments, we make it easy for donors to
            connect with frontline aid organisations, understand the needs on
            the ground, and get their aid delivered.
          </p>
        </div>
        <img
          className="hidden lg:block"
          src={mapImage}
          alt="Map of where Distribute Aid has operated in the past"
        />
        <SocialIconContainer />
      </div>
    </section>
  )
}

export default MissionSection
