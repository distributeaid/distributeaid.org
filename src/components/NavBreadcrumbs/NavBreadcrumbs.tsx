import { Link } from 'gatsby'
import React from 'react'

const NavBreadcrumbs = ({ pageLookup, page }) => {
  return (
    <nav aria-label="breadcrumb" role="navigation">
      <strong>Breadcrumbs:</strong>
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {page.breadcrumbIDs.map((breadcrumbID) => {
          const breadcrumb = pageLookup[breadcrumbID]
          return (
            <li key={breadcrumb.contentful_id} className="px-4">
              <Link to={`${breadcrumb.path}`}>{breadcrumb.title}</Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default NavBreadcrumbs
