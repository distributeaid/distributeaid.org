import { graphql } from 'gatsby'
import { FC } from 'react'

import { PageGeneric as PageGenericType } from '../types/generic-page'

import { PageHeader } from '@components/PageHeader'
import SimpleLayout from 'layouts/Simple'

import { Sections } from '@components/section/section'

type Props = {
  data: {
    page: PageGenericType
  }
}

export function Head({ data: { page } }: Props) {
  return <PageHeader title={`Region: ${page.title}`} description={page.desc} />
}

const GenericPage: FC<Props> = ({ data: { page } }) => {
  return (
    <SimpleLayout>
      <article>
        <header className="prose">
          <h1>{page.title}</h1>
        </header>

        <Sections sections={page.sections} />
      </article>
    </SimpleLayout>
  )
}

export default GenericPage

export const query = graphql`
  query ($id: String!) {
    page: daPageGeneric(id: { eq: $id }) {
      title
      slug
      sections {
        ... on DASectionGrid {
          internal {
            type
          }
          options {
            cols
            layout
            margin
            order
            rows
          }
          blocks {
            ... on DABlockTitle {
              internal {
                type
              }
              text
            }
            ... on DABlockText {
              internal {
                type
              }
              text
            }
            ... on DABlockYoutube {
              internal {
                type
              }
              title
              embedUrl
            }
            ... on DABlockTimeline {
              internal {
                type
              }
              entries {
                period
                desc
              }
            }
          }
        }
      }
    }
  }
`
