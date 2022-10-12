import { useStaticQuery, graphql } from 'gatsby'

import SocialIconContainer from '@components/social-media/SocialIconContainer'
import React, { FC, Suspense } from 'react'
import ReactMarkdown from 'react-markdown'

import worldMapImage from '../../images/homepage-banner-image.svg'

const ShipmentsOnGlobeVis = React.lazy(
  () => import('@components/vis/shipments-on-globe'),
)

type Props = {
  missionStatement: string
}

const MissionSection: FC<Props> = ({ missionStatement }) => {
  const isSSR = typeof window === 'undefined'

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
          <ReactMarkdown children={missionStatement} />
        </div>
        {/* <img
          className="hidden lg:block"
          src={mapImage}
          alt="Map of where Distribute Aid has operated in the past"
        /> */}
        <div className="motion-reduce:hidden">
          {!isSSR && (
            <Suspense fallback={<div />}>
              <ShipmentsOnGlobeVis categoryVisItems={data.categoryVisItems} />
            </Suspense>
          )}
        </div>
        <div className="motion-safe:hidden">
          <img src={worldMapImage} className="mx-auto block" alt="" />
        </div>
        <SocialIconContainer position="side" />
      </div>
    </section>
  )
}

export default MissionSection
