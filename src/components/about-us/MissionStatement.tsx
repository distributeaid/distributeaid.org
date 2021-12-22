import SocialIconContainer from '@components/social-media/SocialIconContainer'
import React, { FC } from 'react'
import logoBlueSrc from '../../images/logomark_blue.svg'

const MissionStatement: FC = () => (
  <section className="bg-navy-50 px-4 py-20 flex">
    <div className="max-w-5xl mx-auto">
      <div className="space-y-6 text-navy-700 text-2xl lg:text-3xl lg:leading-snug">
        <div className="lg:flex justify-between items-center lg:space-x-8">
          <img
            className="mx-auto my-6"
            width="130"
            height="60"
            src={logoBlueSrc}
            alt="Distribute Aid Logo: A flock of doves stylized by stacking wings behind the main outline of a dove."
          />
          <p className="flex-grow">
            Distribute Aid’s mission is to provide for basic human needs at
            scale by connecting communities and empowering people to uphold
            human dignity.
          </p>
        </div>
      </div>
    </div>
    <SocialIconContainer position="side" />
  </section>
)

export default MissionStatement
