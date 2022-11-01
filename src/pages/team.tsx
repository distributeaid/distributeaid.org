import { FC, useState } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import { Card, ImageVariant } from '@components/card/Card'
// import DomainDropdown from '@components/team/Team'
import ExternalLink from '@components/link/ExternalLink'
import React from 'react'
import console from 'console'

type Props = {
  data: {
    allDaTeamMember: {
      nodes: any[]
    }
  }
}

const TeamPage: FC<Props> = ({ data }) => {
  const members = data.allDaTeamMember.nodes
  const domains = Array.from(new Set(members.map((member) => member.memberDomain?.roles[0]?.role?.domain)))

  const membersByDomain = domains.map(domain => {
    return {
      domainName: domain,
      members: members.filter(member => member.memberDomain?.roles[0]?.role?.domain === domain)
    }
  })
  console.log(JSON.stringify(domains))
  console.log(JSON.stringify(membersByDomain))

  const [showStaff, setShowStaff] = useState(false)
  const getClickStaff = () => {
    setShowStaff(!showStaff)
  }
  const [showVolunteers, setShowVolunteers] = useState(false)
  const handleClickVolunteers = () => {
    setShowVolunteers(!showVolunteers)
  }
  const [showBoard, setShowBoard] = useState(false)
  const handleClickBoard = () => {
    setShowBoard(!showBoard)
  }

  return (
    <SimpleLayout pageTitle="Team">
      <h1 className="text-4xl text-center mt-9">Meet the Team</h1>

      {/* <DomainDropdown />
<h2>Test</h2>
 <DomainDropdown/> */}

      {/* {domains.map((memberDomain) =>( */}

      {/* This dropdown is for the staff domain */}

      <div
        id="memberdata"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto"
      >
        {members.map((member) => (
          <Card
            dynamicCardImage={{
              image: member?.profilePhoto?.gatsbyImageData,
              alt: member.name,
            }}
            imageVariant={ImageVariant.square}

          // actions={[{label:member.name, url:member.link}]}

          // title={`${member?.roles[0]?.role?.title} (${member?.roles[0]?.role?.commitment})`}

          // body={member.bio}
          >
            <h3 className="text-2xl text-gray-600 mb-4 pl-4 pr-4">
              <ExternalLink className="link" href={member.link}>
                {member.name}
              </ExternalLink>
            </h3>

            <h4 className="text-xl text-gray-600 mb-4 pl-4 pr-4">{`${member?.roles[0]?.role?.title} (${member?.roles[0]?.role?.commitment})`}</h4>

            <h4 className="pb-8 pl-4 pr-4 space-y-2">{member.bio}</h4>
          </Card>
        ))}
      </div>
    </SimpleLayout>
  )
}

export default TeamPage

// //doesnt work
// export function App() {
//   return (
//     <div className='App outline outline-offset-2 outline-pink-500 ...'>
//   <DomainDropdown />
//   <h2>TEST</h2>
//     </div>
//   )}

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
