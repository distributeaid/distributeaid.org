import { graphql } from 'gatsby'
import React, { FunctionComponent } from 'react'

interface Props {
  data: {
    allContentfulDataPersonVolunteer: { nodes: any }
  }
}

const TeamPage: FunctionComponent<Props> = ({ data }) => {
  const volunteers = data.allContentfulDataPersonVolunteer.nodes
  return (
    <div>
      <h1>Our Team</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Title</th>
              <th>Location</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr>
                <td>
                  {volunteer.avatar != null && (
                    <img
                      src={volunteer.avatar.file.url}
                      alt={volunteer.avatar.file.title}
                      width="100px"
                      height="100px"
                    />
                  )}
                </td>
                <td>{volunteer.name}</td>
                <td>{volunteer.title}</td>
                <td>{volunteer.Whereabouts}</td>
                <td>{volunteer.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
