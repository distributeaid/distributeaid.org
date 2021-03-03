import React from 'react'
import { Link } from 'gatsby'

const NavTabs = ({ page, tabs }) => {
  if (tabs === null) {
    tabs = []
  }

  return (
    <nav role="navigation">
      <ul>
        <li key={page.contentful_id}>
          <Link to={`/${page.slug}`}>{page.title}</Link>
        </li>
        {tabs.map(( tab ) => {
          return (
            <li key={tab.contentful_id}>
              <Link to={`/${page.slug}/${tab.slug}`}>{tab.title}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavTabs
