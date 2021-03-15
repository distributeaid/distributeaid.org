import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'

const NavMain = (props) => {
  const data = useStaticQuery(graphql`
    query MainMenuQuery {
      contentfulSiteSite {
        contentful_id

        mainMenu {
          contentful_id
          title
          flavor
          layout

          links {
            contentful_id
            label
            type

            toPage {
              contentful_id
            }
          }
        }
      }
    }
  `)

  const { pageLookup, page } = props

  const menu = data.contentfulSiteSite.mainMenu
  menu.links.forEach((link) => {
    link.toPage = pageLookup[link.toPage.contentful_id]
  })

  return (
    <nav role="navigation">
      <ul className="flex justify-center h-48">
        {menu.links.map((link) => {
          const label = link.label ? link.label : link.toPage.title
          return (
            <li key={link.toPage.contentful_id} className="mx-4">
              <Link to={`${link.toPage.path}`}>{label}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavMain
