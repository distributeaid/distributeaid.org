import { Link } from 'gatsby'
import { FunctionComponent } from 'react'
import { PageContext } from '../../types/site-types'
import { NavLinkItem } from './MainMenu/MainMenu'

interface Props {
  pageContext: PageContext
}

const Tabs: FunctionComponent<Props> = ({ pageContext }) => {
  const { page, pageLookup } = pageContext
  const indexPage = page.layout === 'Tabs' ? page : pageLookup[page.comesFromID]

  if (!indexPage.leadsTo) {
    return null
  }

  const links: NavLinkItem[] = []
  indexPage.leadsTo.forEach((tabPage) => {
    if (tabPage && tabPage.title) {
      links.push({
        title: tabPage.title,
        path: pageLookup[tabPage.contentful_id].path,
      })
    }
  })

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
        {links.map((link) => {
          return (
            <li
              key={link.path}
              className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
            >
              <Link to={link.path}>{link.title}</Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Tabs
