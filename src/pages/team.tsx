import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import DomainDesktop from '@components/team/DomainDesktop'
import DomainMobile from '@components/team/DomainMobile'

type Props = {
  data: {
    allDaTeamMember: {
      nodes: any[]
    }
  }
}

const TeamPage: FC<Props> = ({ data }) => {
  const members = data.allDaTeamMember.nodes
  const domains = Array.from(
    new Set(members.map((member) => member?.roles[0]?.role?.domain)),
  )

  const membersByDomain = domains.map((domain) => {
    return {
      domainName: domain,
      members: members.filter(
        (member) => member?.roles[0]?.role?.domain === domain,
      ),
    }
  })

  return (
    <SimpleLayout pageTitle="Team">
      <h1 className="text-4xl text-center mt-5 mb-5">Meet the Team</h1>

      {membersByDomain.map(
        ({ domainName, members }: { domainName: string; members: any[] }) => (
          <>
            <DomainDesktop domainName={domainName} members={members} />
            <DomainMobile domainName={domainName} members={members} />
          </>
        ),
      )}
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
        profilePhoto {
          gatsbyImageData
        }
        link
        roles {
          role {
            title
            commitment
            domain
          }
        }
      }
    }
  }
`
