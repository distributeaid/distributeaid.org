import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql, HeadProps } from 'gatsby'
import PageData from '@components/PageData'

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
    <SimpleLayout>
      <h1 className="text-2xl">Meet the Team</h1>
      <ul>
        {members.map((member: any) => {
          return (
            <li>
              <span>{member.name}</span>
              <span>({member.pronouns})</span>
            </li>
          )
        })}
      </ul>
    </SimpleLayout>
  )
}

export default TeamPage

export function Head(props: HeadProps) {
  return (
    <>
      <title>Team - Distribute Aid</title>
      <PageData />
    </>
  )
}

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
