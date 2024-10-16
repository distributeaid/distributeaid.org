import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'

import { Region } from '../../types/place.d'

import Button from '@components/button/Button'
import SmartLink from '@components/link/SmartLink'
import { PageHeader } from '@components/PageHeader'
import { BlockLinksList } from '@components/section/blocks/BlockLinksList'
import { BlockUpdatesList } from '@components/section/blocks/BlockUpdatesList'
import { SectionGrid } from '@components/section/sections/SectionGrid'
import SimpleLayout from 'layouts/Simple'
import { getCommaSeparator } from 'utils/strings'
import { getBackgroundColor } from '../../utils/site-theme'

import { Section } from '@components/section/Section'

import { getQuarterOption } from '@components/vis/needs-bar-chart/options-helpers'

import { AxisOption } from '../../types/vis/needs-bar-chart-options.d'

import {
  SortByOption,
  SortOrderOption,
} from '../../types/vis/nivo-bar-chart-options.d'

import { getBaseURL } from '../../utils/urls'

// imports for HACK, see HACK comment below
import {
  getBlockTextNode,
  getBlockTitleNode,
  getSectionGridNode,
} from '../../types/generic-page.test-helpers'

type TemplateProps = {
  data: {
    region: Region
  }
}

export function Head({ data: { region } }: TemplateProps) {
  return <PageHeader title={`Region: ${region.name}`} />
}

const RegionPage: FC<TemplateProps> = ({ data: { region } }) => {
  // HACK START
  //   goal: use the generic pages stuff
  //   better way:
  //     1. Have sections & blocks take the plain data, not the node.
  //     2. Enable section & block support for custom pages.

  const sections = []

  if (region.overview) {
    sections.push(
      getSectionGridNode({
        blocks: [
          getBlockTitleNode({
            text: 'Overview',
          }),
          getBlockTextNode({
            text: region.overview,
          }),
        ],
      }),
    )
  }

  if (region.governmentResponse) {
    sections.push(
      getSectionGridNode({
        blocks: [
          getBlockTitleNode({
            text: 'Government Response',
          }),
          getBlockTextNode({
            text: region.governmentResponse,
          }),
        ],
      }),
    )
  }

  if (region.longText) {
    sections.push(
      getSectionGridNode({
        blocks: [
          getBlockTitleNode({
            text: 'Government Response',
          }),
          getBlockTextNode({
            text: region.longText,
          }),
        ],
      }),
    )
  }
  // HACK END

  const today = new Date()
  const quarterOption = getQuarterOption(today)
  const needsExplorerOtions = {
    filters: {
      search: '',
      quarter: quarterOption,
      region: region.name,
    },
    axis: {
      indexBy: AxisOption.Item,
      groupBy: AxisOption.Category,
    },
    sort: {
      by: SortByOption.Value,
      order: SortOrderOption.Desc,
    },
  }

  const needsExplorerUrl = new URL('/needs-assessments/explorer/', getBaseURL())
  needsExplorerUrl.searchParams.set(
    'InteractiveNeedsBarChartTitle',
    `Top Needs In ${region.name} (${quarterOption})`,
  )
  needsExplorerUrl.searchParams.set(
    'InteractiveNeedsBarChartOptions',
    JSON.stringify(needsExplorerOtions),
  )

  region.subregions.sort((subregionA, subregionB) => {
    if (subregionA.name > subregionB.name) {
      return 1
    } else if (subregionA.name < subregionB.name) {
      return -1
    } else {
      return 0
    }
  })

  return (
    <SimpleLayout>
      <header
        style={{
          backgroundColor: getBackgroundColor(),
        }}
        className="prose max-w-none py-8 flex flex-col md:flex-row justify-center items-center gap-x-4"
      >
        {region.map.image && (
          <div className="bg-white rounded-full p-2 drop-shadow-md">
            <GatsbyImage
              image={region.map.image.gatsbyImageData}
              alt={region.map.alt}
              className="w-36 h-36"
            />
          </div>
        )}

        <div className="flex flex-col justify-center">
          <h1 className="mb-0 text-center md:text-left">{region.name}</h1>

          <hr className="lg:w-6/5 m-0 border-b-4 border-navy-700" />

          <nav className="text-xl flex justify-center md:justify-start gap-4 pt-2">
            <div className="hidden sm:flex">
              <SmartLink className="link" href="/regions/">
                All Regions
              </SmartLink>
            </div>

            <span className="hidden sm:block relative -top-2 left-1 text-4xl text-navy-700">
              &#10095;
            </span>

            <div className="hidden sm:flex">
              <SmartLink className="link" href={region.path}>
                {region.name}
              </SmartLink>
            </div>

            <span className="hidden sm:block relative -top-2 -left-1 text-4xl text-navy-700">
              &#10095;
            </span>

            <div className="flex">
              {region.subregions.map((subregion, index, array) => {
                const seperator = getCommaSeparator(index, array)
                return (
                  <span key={subregion.name}>
                    {seperator}
                    <SmartLink className="link" href={subregion.path}>
                      {subregion.name}
                    </SmartLink>
                  </span>
                )
              })}
            </div>
          </nav>
        </div>
      </header>

      <div className="py-8">
        <ul className="flex gap-4 justify-center text-2xl border-b-2">
          <li>
            <SmartLink href={region.path}>
              <Button variant="primary">Overview</Button>
            </SmartLink>
          </li>
          <li>
            <SmartLink href={needsExplorerUrl.toString()}>
              <Button>Needs</Button>
            </SmartLink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col">
          {sections.map((section, i) => {
            return (
              <div
                key={i}
                className="last:grow"
                style={{
                  backgroundColor: getBackgroundColor(),
                }}
              >
                <Section key={i} section={section} className="prose mx-auto" />
              </div>
            )
          })}
        </div>

        <div className="flex flex-col">
          {/* SMALL HACK: shouldn't use test-helpers as a way to get defaults */}
          {region.stayInformed && region.stayInformed.links.length > 0 && (
            <div
              className="last:grow"
              style={{ backgroundColor: getBackgroundColor() }}
            >
              <SectionGrid
                section={getSectionGridNode()}
                className="prose mx-auto"
              >
                <BlockLinksList block={region.stayInformed} />
              </SectionGrid>
            </div>
          )}

          {/* SMALL HACK: shouldn't use test-helpers as a way to get defaults */}
          {region.newsUpdates && region.newsUpdates.updates.length > 0 && (
            <div
              className="last:grow"
              style={{ backgroundColor: getBackgroundColor() }}
            >
              <SectionGrid
                section={getSectionGridNode()}
                className="prose mx-auto"
              >
                <BlockUpdatesList block={region.newsUpdates} />
              </SectionGrid>
            </div>
          )}
        </div>
      </div>
    </SimpleLayout>
  )
}

export default RegionPage

export const query = graphql`
  query ($id: String!) {
    region: daRegion(id: { eq: $id }) {
      id
      path

      name
      overview
      governmentResponse
      longText

      map {
        relativePath
        alt
        image {
          gatsbyImageData(
            width: 256
            aspectRatio: 1
            transformOptions: { fit: COVER }
          )
        }
      }
      population {
        needsTotal
        totalItemsRequested
        ngoBeneficiaries
        ngoPopulation
        ngoRespondents
        count
        trend
        description
      }
      newsUpdates {
        title
        visibleCount
        updates {
          title
          content
          date
          pinned
        }
      }
      stayInformed {
        title
        links {
          label
          url
          description
        }
      }

      subregions {
        path
        name
      }
    }
  }
`
