import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { FunctionComponent } from 'react'

interface Props {
  data: {
    allContentfulDataPersonVolunteer: { nodes: any }
  }
}

const TeamPage: FunctionComponent<Props> = ({ data }) => {
  const volunteers = data.allContentfulDataPersonVolunteer.nodes
  const teams = [
    'Admin',
    'Logistics',
    'Sourcing',
    'Tech',
    'Design',
    'Stories',
    'Fundraising',
    'Advisory Board',
    'Board',
  ]

  return (
    <div>
      <h1>Our Team</h1>
      <div>
        {teams.map((team) => (
          <div className="team-and-title">
            <h2>{team}</h2>
            <div className="team">
              {volunteers.map(
                (volunteer) =>
                  volunteer.team == team && (
                    <div className="volunteer">
                      <div className="volunteer-image-container">
                        {volunteer.avatar != null && (
                          <GatsbyImage
                            image={volunteer.avatar.gatsbyImageData}
                            alt={volunteer.avatar.file.title}
                            className="volunteer-image"
                          />
                        )}
                      </div>

                      <h3>{volunteer.name}</h3>
                      <p>{volunteer.title}</p>
                      <p>{volunteer.Whereabouts}</p>
                    </div>
                  ),
              )}
            </div>
          </div>
        ))}
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
        team
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
          gatsbyImageData(layout: FULL_WIDTH, width: 200)
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
