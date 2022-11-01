import { graphql } from 'gatsby'
import { FC } from 'react'

import { PageGeneric as PageGenericType } from '../types/generic-page'

import { PageHeader } from '@components/PageHeader'
import SimpleLayout from 'layouts/Simple'

type Props = {
  data: {
    page: PageGenericType
  }
}

export function Head({ data: { page } }: Props) {
  return <PageHeader title={`Region: ${page.title}`} />
}

const GenericPage: FC<Props> = ({ data: { page } }) => {
  return (
    <SimpleLayout>
      <p>Hello world!</p>
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
                description
              }
            }
          }
        }
      }
    }
  }
`
