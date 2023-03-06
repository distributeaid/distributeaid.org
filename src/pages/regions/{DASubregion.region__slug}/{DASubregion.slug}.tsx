import Button from '@components/button/Button'
import SmartLink from '@components/link/SmartLink'
import { PageHeader } from '@components/PageHeader'
import { BlockLinksList } from '@components/section/blocks/BlockLinksList'
import { BlockUpdatesList } from '@components/section/blocks/BlockUpdatesList'
import { SectionGrid } from '@components/section/sections/SectionGrid'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import SimpleLayout from 'layouts/Simple'
import { FC } from 'react'
import { Subregion } from '../../../types/place.d'
import { getBackgroundColor } from '../../../utils/site-theme'

import { Section } from '@components/section/Section'

// imports for HACK, see HACK comment below
import {
  getBlockTextNode,
  getBlockTitleNode,
  getSectionGridNode,
} from '../../../types/generic-page.test-helpers'

type TemplateProps = {
  data: {
    subregion: Subregion
  }
}

export function Head({ data: { subregion } }: TemplateProps) {
  return (
    <PageHeader
      title={`Subregion: ${subregion.name} (${subregion.region.name})`}
    />
  )
}

const SubregionPage: FC<TemplateProps> = ({ data: { subregion } }) => {
  // HACK START
  //   goal: use the generic pages stuff
  //   better way:
  //     1. Have sections & blocks take the plain data, not the node.
  //     2. Enable section & block support for custom pages.

  const sections = []

  if (subregion.overview) {
    sections.push(
      getSectionGridNode({
        blocks: [
          getBlockTitleNode({
            text: 'Overview',
          }),
          getBlockTextNode({
            text: subregion.overview,
          }),
        ],
      }),
    )
  }

  if (subregion.governmentResponse) {
    sections.push(
      getSectionGridNode({
        blocks: [
          getBlockTitleNode({
            text: 'Government Response',
          }),
          getBlockTextNode({
            text: subregion.governmentResponse,
          }),
        ],
      }),
    )
  }

  if (subregion.longText) {
    sections.push(
      getSectionGridNode({
        blocks: [
          getBlockTitleNode({
            text: 'Government Response',
          }),
          getBlockTextNode({
            text: subregion.longText,
          }),
        ],
      }),
    )
  }
  // HACK END

  return (
    <SimpleLayout>
      <header
        style={{
          backgroundColor: getBackgroundColor(),
        }}
        className="prose max-w-none py-8 flex flex-col md:flex-row justify-center items-center gap-x-4"
      >
        <div className="bg-white rounded-full drop-shadow-md">
          <GatsbyImage
            image={subregion.map.image.gatsbyImageData}
            alt={subregion.map.alt}
            className="w-36 h-36 rounded-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="mb-0 text-center md:text-left">{subregion.name}</h1>

          <hr className="lg:w-6/5 m-0 border-b-4 border-navy-700" />

          <nav className="text-xl flex justify-center md:justify-start gap-2 pt-2">
            <div className="hidden sm:flex">
              <SmartLink className="link" href="/regions/">
                All Regions
              </SmartLink>
            </div>

            <span className="hidden sm:block relative -top-2 text-4xl text-navy-700">
              &#10095;
            </span>

            <div className="flex">
              <SmartLink className="link" href={subregion.region.path}>
                {subregion.region.name}
              </SmartLink>
            </div>

            <span className="hidden sm:block relative -top-2 text-4xl text-navy-700">
              &#10095;
            </span>

            <div className="hidden sm:flex">
              <SmartLink className="link" href={subregion.path}>
                {subregion.name}
              </SmartLink>
            </div>
          </nav>
        </div>
      </header>

      <div className="py-8">
        <ul className="flex gap-4 justify-center text-2xl border-b-2">
          <li>
            <SmartLink href={subregion.path}>
              <Button variant="primary">Overview</Button>
            </SmartLink>
          </li>
          <li>
            <SmartLink
              href={
                subregion.needsUrl ??
                `/needs-assessments/explorer/?InteractiveNeedsBarChartOptions=%7B%22filters%22%3A%7B%22search%22%3A%22%22%2C%22quarter%22%3A%222023+Q1%22%2C%22subregion%22%3A%22${subregion.name.replace(
                  ' ',
                  '+',
                )}%22%7D%2C%22axis%22%3A%7B%22indexBy%22%3A%22Item%22%2C%22groupBy%22%3A%22Category%22%7D%2C%22sort%22%3A%7B%22by%22%3A%22Value%22%2C%22order%22%3A%22Descending%22%7D%7D&InteractiveNeedsBarChartTitle=Top+Need+In+${subregion.name.replace(
                  ' ',
                  '+',
                )}+%28${subregion.region.name.replace(' ', '+')}%29+-+2023+Q1`
              }
            >
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
          {subregion.stayInformed.links.length > 0 && (
            <div
              className="last:grow"
              style={{ backgroundColor: getBackgroundColor() }}
            >
              <SectionGrid
                section={getSectionGridNode()}
                className="prose mx-auto"
              >
                <BlockLinksList block={subregion.stayInformed} />
              </SectionGrid>
            </div>
          )}

          {/* SMALL HACK: shouldn't use test-helpers as a way to get defaults */}
          {subregion.newsUpdates.updates.length > 0 && (
            <div
              className="last:grow"
              style={{ backgroundColor: getBackgroundColor() }}
            >
              <SectionGrid
                section={getSectionGridNode()}
                className="prose mx-auto"
              >
                <BlockUpdatesList block={subregion.newsUpdates} />
              </SectionGrid>
            </div>
          )}
        </div>
      </div>
    </SimpleLayout>
  )
}

export default SubregionPage

export const query = graphql`
  query ($id: String!) {
    subregion: daSubregion(id: { eq: $id }) {
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

      region {
        path
        name
      }
    }
  }
`
