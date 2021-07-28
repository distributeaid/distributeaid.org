import { graphql } from 'gatsby'
import React, { FunctionComponent } from 'react'

interface Props {
  data: {
    allContentfulContentMarkdown: { nodes: any }
  }
}

const AboutUsPage: FunctionComponent<Props> = ({ data }) => {
  const info = data.allContentfulContentMarkdown.nodes
  return (
    <div>
      <h1>About Us</h1>
      <h2>Our Mission</h2>
      <p>Our Mission content from contentful</p>

      <ul>
        <li>Our Story</li>
        <li>
          <a href="./team">Our Team</a>
        </li>
        <li>Our Purpose and Values</li>
      </ul>
    </div>
  )
}

export default AboutUsPage

export const pageQuery = graphql`
  query AboutUsInfo {
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
