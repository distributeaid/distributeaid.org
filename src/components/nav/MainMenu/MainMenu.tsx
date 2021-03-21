import { graphql, Link, useStaticQuery } from 'gatsby'
import { FunctionComponent } from 'react'
import BrandMark from '../../brand/BrandMark'
import DesktopNavigation from './MainMenuDesktop'
import MobileNavigation from './MainMenuMobile'

export interface NavLinkItem {
  title: string
  toPage: {
    path: string
  }
}

interface Props {
  pageLookup: object
  page: object
}

/**
 * A full-width element that sits at the top of the page. It displays the DA
 * branding and a dropdown-menu with some account information.
 */
const MainMenu: FunctionComponent<Props> = ({ pageLookup, page }) => {
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

  const menu = data.contentfulSiteSite.mainMenu
  menu.links.forEach((link) => {
    link.toPage = pageLookup[link.toPage.contentful_id]
  })

  return (
    <header className="py-2 bg-navy-800 h-nav sticky top-0">
      <div className="max-w-5xl px-4 mx-auto h-full flex items-center justify-between">
        <MobileNavigation navLinks={menu.links} />
        <div className="flex items-center">
          <Link to="/" className="text-white" aria-label="Go to the home page">
            <BrandMark flavor="white" layout="logo" className="block h-8" />
          </Link>
        </div>
        <DesktopNavigation navLinks={menu.links} />
      </div>
    </header>
  )
}

export default MainMenu
