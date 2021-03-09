import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import { Helmet } from 'react-helmet'
import NavTabs from '../components/NavTabs'
import DefaultLayout from '../layouts/Default'

class MainPageTemplate extends React.Component {
  render() {
    const site = get(this.props, 'data.contentfulPageMain.site')
    const page = get(this.props, 'data.contentfulPageMain')
    const tabs = get(this.props, 'data.contentfulPageMain.tabs')

    return (
      <DefaultLayout>
        <div>
          <Helmet title={`${page.title} // ${site.title}`} />
          <h1>{page.title}</h1>

          <NavTabs page={page} tabs={tabs} />

          <div>
            <p>{page.updatedAt}</p>

            <p>TODO: show page content</p>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

export default MainPageTemplate

export const pageQuery = graphql`
  query MainPageQuery($mainPageContentfulId: String!) {
    contentfulPageMain(contentful_id: { eq: $mainPageContentfulId }) {
      contentful_id
      title
      slug
      updatedAt(formatString: "MMMM Do, YYYY")

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
  }
`
