import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'

type Props = {
  data: {
    allDaTeamMember: {
      nodes: any[]
    }
  }
}
const TeamPage: FC<Props> = ({ data }) => {
  const members = data.allDaTeamMember.nodes
  return (
    <SimpleLayout pageTitle="Team">
      <div>
        <h1 className="text-3xl">Meet the Team</h1>
        <h2 className="text-2xl">Staff</h2>
        <ul className="grid grid-cols-5 gap-4">
          {members.map((member: any) => {
            return (
              <li>
                <span>{member.name}</span>
                <span>({member.pronouns})</span>
              </li>
            )
          })}
        </ul>
        <h2 className="text-2xl">Volunteers</h2>
      </div>
    </SimpleLayout>
  )
}

export default TeamPage

export const pageQuery = graphql`
  query TeamQuery {
    allDaTeamMember {
      nodes {
        bio
        name
        pronouns
        profilePhoto {
          gatsbyImageData
        }
      }
    }
  }
`
