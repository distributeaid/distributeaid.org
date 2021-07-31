import { graphql } from 'gatsby'
import React, { FunctionComponent } from 'react'

interface Props {
  data: {
    allContentfulContentMarkdown: { nodes: any }
  }
}

const OurMissionPage: FunctionComponent<Props> = ({ data }) => {
  const siteInfo = data.allContentfulContentMarkdown.nodes

  const mission = siteInfo.map((info) => {
    if (info.label == 'Our mission overview') {
      return info.entry.childMarkdownRemark.html
    }
  })

  return (
    <div>
      <h1>Our Mission</h1>
      <div dangerouslySetInnerHTML={{ __html: mission }} />
    </div>
  )
}

export default OurMissionPage

export const pageQuery = graphql`
  query OurMissionInfo {
    allContentfulContentMarkdown {
      nodes {
        label
        entry {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
