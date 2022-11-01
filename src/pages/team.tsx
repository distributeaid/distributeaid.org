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
  const domains = data.allDaTeamMember.nodes
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

      <div className="flex justify-center items-center landscape:hidden">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={getClickStaff}
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Staff domains
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          {showStaff && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tab-index="-1"
            >
              <div className="py-1" role="none">
                {domains.map((memberDomain) => (
                  <a
                    href="#"
                    className="text-gray-700 block px-8 py-2 text-sm hover:bg-slate-100"
                    role="menuitem"
                    tab-index="-1"
                    id="menu-item-0"
                  >
                    <div>
                      {'Staff' === memberDomain?.roles[0]?.role?.domain
                        ? `${memberDomain.name}`
                        : 'Not Staff'}
                    </div>
                  </a>
                ))}

                {/* <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
              role="menuitem"
              tab-index="-1"
              id="menu-item-1"
            >
              ???
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
              role="menuitem"
              tab-index="-1"
              id="menu-item-2"
            >
              ???
            </a> */}
                {/* <form method="POST" action="#" role="none">
              <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-100" role="menuitem" tab-index="-1" id="menu-item-3">Sign out</button>
            </form> */}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ))} */}

      {/* This dropdown is for volunteer domains  */}

      <div className="flex justify-center items-center landscape:hidden">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={handleClickVolunteers}
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Volunteer domains
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          {showVolunteers && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tab-index="-1"
            >
              <div className="py-1" role="none">
                {domains.map((memberDomain) => (
                  <a
                    href="#"
                    className="text-gray-700 block px-8 py-2 text-sm hover:bg-slate-100"
                    role="menuitem"
                    tab-index="-1"
                    id="menu-item-0"
                  >
                    <div>
                      {'Volunteer' === memberDomain?.roles[0]?.role?.domain
                        ? `${memberDomain.name}`
                        : 'Not a Volunteer'}
                    </div>
                  </a>
                ))}

                {/* <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
              role="menuitem"
              tab-index="-1"
              id="menu-item-1"
            >
              ???
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
              role="menuitem"
              tab-index="-1"
              id="menu-item-2"
            >
              ???
            </a> */}
                {/* <form method="POST" action="#" role="none">
              <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-100" role="menuitem" tab-index="-1" id="menu-item-3">Sign out</button>
            </form> */}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ))} */}

      {/* This dropdown is for board domains  */}

      <div className="flex justify-center items-center landscape:hidden">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={handleClickBoard}
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Board domains
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          {showBoard && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tab-index="-1"
            >
              <div className="py-1" role="none">
                {domains.map((memberDomain) => (
                  <a
                    href="#"
                    className="text-gray-700 block px-8 py-2 text-sm hover:bg-slate-100"
                    role="menuitem"
                    tab-index="-1"
                    id="menu-item-0"
                  >
                    <div>
                      {'Board' === memberDomain?.roles[0]?.role?.domain
                        ? `${memberDomain.name}`
                        : 'Not Board'}
                      {/* {"Staff" !== memberDomain?.roles[0]?.role?.domain ? '' : `${domains.splice(memberDomain.name)}`} */}
                    </div>
                  </a>
                ))}

                {/*
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100"
              role="menuitem"
              tab-index="-1"
              id="menu-item-2"
            >
              ???
            </a> */}
                {/* <form method="POST" action="#" role="none">
              <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-100" role="menuitem" tab-index="-1" id="menu-item-3">Sign out</button>
            </form> */}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ))} */}

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
