import { useStaticQuery, graphql } from 'gatsby'

import MarkdownContent from '@components/markdown/MarkdownContent'
import SocialIconContainer from '@components/social-media/SocialIconContainer'
import { FC } from 'react'
import ShipmentsOnGlobeVis from '@components/vis/shipments-on-globe'
import { getColor } from '@utils/'

type Props = {
  missionStatement: string
}

const MissionSection: FC<Props> = ({ missionStatement }) => {
  const data = useStaticQuery(graphql`
    query GlobeVisQuery {
      categoryVisItems: allDaLineItem {
        nodes {
          value
          count
          shipment {
            origin
            destination
          }
          item {
            category
            item
            ageGender
            sizeStyle
          }
        }
      }
    }
  `)

  return (
    <section className="bg-navy-50 px-4 py-20">
      <div className="max-w-7xl mx-auto lg:flex justify-between items-center">
        <div className="space-y-6 text-navy-700 text-2xl lg:text-3xl lg:w-1/2 lg:leading-snug">
          <MarkdownContent content={missionStatement} />
        </div>
        {/* <img
          className="hidden lg:block"
          src={mapImage}
          alt="Map of where Distribute Aid has operated in the past"
        /> */}
        <ShipmentsOnGlobeVis categoryVisItems={data.categoryVisItems} />
        <SocialIconContainer position="side" />
      </div>
    </section>
  )
}

export default MissionSection
