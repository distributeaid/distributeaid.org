import React from 'react'
import {
  useStaticQuery,
  graphql,
  Link
} from 'gatsby'

import styles from './NavMain.module.css'

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
      <ul className={styles.navigation}>
        {pages.map(( page ) => {
          return (
            <li key={page.contentful_id} className={styles.navigationItem}>
              <Link to={`/${page.slug}`}>{page.title}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavMain
