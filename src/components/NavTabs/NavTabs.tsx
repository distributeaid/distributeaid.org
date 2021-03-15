import { Link } from 'gatsby'
import React from 'react'

const NavTabs = ({ pageLookup, page }) => {
  const indexPage = page.layout === 'Tabs' ? page : pageLookup[page.comesFromID]

  return (
    <nav role="navigation" className="flex flex-col sm:flex-row">
      <strong>Tabs</strong>
      <ol className="flex leading-none">
        <li
          key={indexPage.contentful_id}
          className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500"
        >
          <Link to={indexPage.path}>{indexPage.title}</Link>
        </li>
        {indexPage.leadsTo.map((tabPage) => {
          return (
            <li
              key={tabPage.contentful_id}
              className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
            >
              <Link to={tabPage.path}>{tabPage.title}</Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default NavTabs
