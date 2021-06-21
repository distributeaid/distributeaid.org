import { graphql } from 'gatsby'
import React, { FunctionComponent } from 'react'

interface Props {
  data: {
    allContentfulDataPersonVolunteer
  }
}

const TeamPage: FunctionComponent<Props> = ({ data }) => {
  const volunteers = data.allContentfulDataPersonVolunteer.nodes
  return (
    <div>
      <h1>Our Team</h1>
      <div>
        {/* <div>
      <ul>{
          volunteers.map((volunteer) => (
            <li>
              <img src={volunteer.avatar.file.url} />
            </li>
            ))
          }
          </ul>
        </div> */}
        <ul>
          {volunteers.map((volunteer) => (
            <li>
              {volunteer.name} - {volunteer.title} - {volunteer.Whereabouts}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TeamPage

export const pageQuery = graphql`
  query TeamMembers {
    allContentfulDataPersonVolunteer {
      nodes {
        contentful_id
        name
        slug
        title
        position
        joined
        left
        status
        Whereabouts
        bio {
          childMarkdownRemark {
            html
          }
        }
        avatar {
          contentful_id
          description
          title
          file {
            contentType
            fileName
            url
            details {
              image {
                height
                width
              }
              size
            }
          }
        }
      }
    }
  }
`
