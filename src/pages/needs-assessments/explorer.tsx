import SmartLink from '@components/link/SmartLink'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import React, { FC, Suspense } from 'react'

import { Need } from '../../types/need.d'

import { getBackgroundColor } from '../../utils/site-theme'

// These modules have dependencies to libraries which depend on browser features
// Use React Suspense to only load them when the page is rendered in the browser
const InteractiveNeedsBarChart = React.lazy(
  () => import('@components/vis/needs-bar-chart/chart-interactive'),
)

type Props = {
  data: {
    needs: {
      nodes: Need[]
    }
  }
}

export function Head() {
  return <PageHeader title={'Needs'} />
}

const NeedsAssessmentPage: FC<Props> = ({ data: { needs } }) => {
  const isSSR = typeof window === 'undefined'
  if (isSSR) return null
  return (
    <Suspense fallback={<div />}>
      <SimpleLayout>
        <header
          style={{
            backgroundColor: getBackgroundColor(),
          }}
          className="prose max-w-none py-8 flex flex-col justify-center items-center gap-2"
        >
          <h1 className="mb-0">Needs Assessments</h1>

          <nav className="flex gap-8 text-3xl">
            <SmartLink className="link" href="/needs-assessments/explorer">
              Explorer
            </SmartLink>
            <SmartLink className="link" href="/needs-assessments/methodology">
              Methodology
            </SmartLink>
          </nav>
        </header>

        <div className="grid grid-cols-3 gap-4">
          <section className="col-span-3">
            <InteractiveNeedsBarChart needs={needs.nodes} />
          </section>
        </div>
      </SimpleLayout>
    </Suspense>
  )
}

export default NeedsAssessmentPage

export const pageQuery = graphql`
  query AllNeedsQuery {
    needs: allDaNeed(
      filter: { product: { unit: { nin: "Wash Cycle" } }, need: { gt: 0 } }
    ) {
      nodes {
        need
        product {
          category
          item
          ageGender
          sizeStyle
          unit
        }
        place {
          region {
            name
          }
          subregion {
            name
          }
        }
        survey {
          id
          year
          quarter
        }
      }
    }
  }
`
