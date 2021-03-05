import React from 'react'
import {
  useStaticQuery,
  graphql,
  Link
} from 'gatsby'

const NavMain = () => {
  const data = useStaticQuery(graphql`
    query NavMainComponentQuery {
      contentfulSite {
        contentful_id

        pages {
          contentful_id
          title
          slug
        }
      }
    }
  `)

  const pages = data.contentfulSite.pages

  return (
    <nav role="navigation">
      <ul className="flex justify-center h-48">
        {pages.map(( page ) => {
          return (
            <li key={page.contentful_id} className="mx-4">
              <Link to={`/${page.slug}`}>{page.title}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavMain
