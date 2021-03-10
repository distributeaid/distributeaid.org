import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import { Helmet } from 'react-helmet'
import NavTabs from '../components/NavTabs'
import Layout from '../layouts/Default'

class TabPageTemplate extends React.Component {
  render() {
    const site = get(
      this.props,
      'data.contentfulPageTab.page___main[0].site[0]',
    )
    const page = get(this.props, 'data.contentfulPageTab.page___main[0]')
    const tabs = get(this.props, 'data.contentfulPageTab.page___main[0].tabs')
    const tab = get(this.props, 'data.contentfulPageTab')

    return (
      <Layout>
        <div>
          <Helmet title={`${tab.title} // ${site.title}`} />
          <h1>{tab.title}</h1>

          <NavTabs page={page} tabs={tabs} />

          <div>
            <p>{tab.updatedAt}</p>

            {tab.sections.map((section) => {
              return (
                <div>
                  <h2>{section.title}</h2>

                  {section.content.map((content) => {
                    if (content.contentful_id == null) {
                      return null
                    }

                    return (
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            content
                              .childContentfulComponentMarkdownContentTextNode
                              .childMarkdownRemark.html,
                        }}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default TabPageTemplate

export const pageQuery = graphql`
  query TabPageQuery($tabPageContentfulId: String!) {
    contentfulPageTab(contentful_id: { eq: $tabPageContentfulId }) {
      contentful_id
      title
      slug
      updatedAt(formatString: "MMMM Do, YYYY")

      page___main {
        contentful_id
        title
        slug

        site {
          contentful_id
          title
        }

        tabs {
          contentful_id
          title
          slug
        }
      }

      sections {
        ... on ContentfulSectionContent {
          contentful_id
          title

          content {
            ... on ContentfulComponentMarkdown {
              contentful_id
              name

              childContentfulComponentMarkdownContentTextNode {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    }
  }
`
