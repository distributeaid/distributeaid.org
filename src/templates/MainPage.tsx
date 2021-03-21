import { graphql } from 'gatsby'
import { FunctionComponent } from 'react'
import Section from '../components/section/Section'
import DefaultLayout from '../layouts/Default'

interface Props {
  pageContext: any
  data: any
}

const MainPageTemplate: FunctionComponent<Props> = ({ pageContext, data }) => {
  const { site, pages, pageLookup, pageStructure } = pageContext
  const pageDetails = data.contentfulSitePage
  const page = {
    ...pageStructure,
    ...pageDetails,
  }
  if (page.sections === null) {
    page.sections = []
  }

  return (
    <DefaultLayout
      site={site}
      pages={pages}
      pageLookup={pageLookup}
      page={page}
    >
      {/* page header */}
      <header>
        <h1>{page.title}</h1>
      </header>

      {/* page body */}
      {page.sections.map((section) => {
        return (
          <Section key={section.contentful_id} page={page} section={section} />
        )
      })}

      {/* page footer */}
      <footer>
        <p>{page.updatedAt}</p>
      </footer>
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
