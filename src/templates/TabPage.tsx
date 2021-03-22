import { graphql } from 'gatsby'
import { FunctionComponent } from 'react'
import Tabs from '../components/nav/Tabs'
import Section from '../components/section/Section'
import DefaultLayout from '../layouts/Default'
import { ContentfulSitePage } from '../types/gatsby-graphql-types.gen'
import { PageContext } from '../types/site-types'

interface Props {
  pageContext: PageContext
  data: {
    contentfulSitePage: ContentfulSitePage
  }
}

const TabPageTemplate: FunctionComponent<Props> = ({ pageContext, data }) => {
  const { __typename, ...pageData } = data.contentfulSitePage
  pageContext.page = {
    ...pageData,
    ...pageContext.page,
  }
  const page = pageContext.page

  return (
    <DefaultLayout pageContext={pageContext}>
      {/* page header */}
      <header>
        <Tabs pageContext={pageContext} />
        <h1>{page.title}</h1>
        <p>{page.updatedAt}</p>
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

      {/* page footer */}
      <footer>
        <p>{page.updatedAt}</p>
      </footer>
    </DefaultLayout>
  )
}

export default TabPageTemplate

export const pageQuery = graphql`
  query TabPageDetails($pageContentfulId: String!) {
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
