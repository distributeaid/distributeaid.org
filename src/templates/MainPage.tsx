import Section from '@components/section/Section'
import DefaultLayout from '@layouts/Default'
import { ContentfulSitePage } from '@types/gatsby-graphql-types.gen'
import { PageContext } from '@types/site-types'
import { graphql } from 'gatsby'
import { FunctionComponent } from 'react'

interface Props {
  pageContext: PageContext
  data: {
    contentfulSitePage: ContentfulSitePage
  }
}

const MainPageTemplate: FunctionComponent<Props> = ({ pageContext, data }) => {
  const { __typename, ...pageData } = data.contentfulSitePage
  pageContext.page = {
    ...pageContext.page,
    ...pageData,
  }

  const page = pageContext.page

  return (
    <DefaultLayout pageContext={pageContext}>
      {/* page header */}
      <header>
        <h1>{page.title}</h1>
      </header>

      {/* page body */}
      {page.sections &&
        page.sections.map((section) => {
          if (!section) {
            return
          }
          return (
            <Section
              key={section.contentful_id}
              page={page}
              section={section}
            />
          )
        })}
    </DefaultLayout>
  )
}

export default MainPageTemplate

export const pageQuery = graphql`
  query MainPageDetails($pageContentfulId: String!) {
    contentfulSitePage(contentful_id: { eq: $pageContentfulId }) {
      contentful_id
      title
      flavor
      updatedAt

      sections {
        contentful_id
        title
        slug

        flavor
        layout

        content {
          ... on ContentfulContentMarkdown {
            __typename
            contentful_id
            label
            internal {
              type
            }
            entry {
              childMarkdownRemark {
                html
              }
            }
          }

          ... on ContentfulContentPhoto {
            __typename
            contentful_id
            label
            internal {
              type
            }
            entry {
              contentful_id
              title
              description
              file {
                contentType
                url
                details {
                  image {
                    width
                    height
                  }
                  size
                }
              }
            }
          }

          ... on ContentfulContentPrezi {
            __typename
            contentful_id
            label
            internal {
              type
            }

            width
            height
            embedUrl
          }
        }
      }
    }
  }
`
