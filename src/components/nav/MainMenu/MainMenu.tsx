import { graphql, Link, useStaticQuery } from 'gatsby'
import { FunctionComponent } from 'react'
import { ContentfulSiteSite } from '../../../types/gatsby-graphql-types.gen'
import { PageContext } from '../../../types/site-types'
import BrandMark from '../../brand/BrandMark'
import DesktopNavigation from './MainMenuDesktop'
import MobileNavigation from './MainMenuMobile'

export interface NavLinkItem {
  title: string
  path: string
}

interface Props {
  pageContext: PageContext
}

interface MainMenuData {
  contentfulSiteSite: ContentfulSiteSite
}

/**
 * A full-width element that sits at the top of the page. It displays the DA
 * branding and a dropdown-menu with some account information.
 */
const MainMenu: FunctionComponent<Props> = ({ pageContext }) => {
  const data: MainMenuData = useStaticQuery(graphql`
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

  const { mainMenu } = data.contentfulSiteSite
  const links: NavLinkItem[] = []
  if (mainMenu && mainMenu.links) {
    mainMenu.links.forEach((link) => {
      if (!link || !link.label || !link.toPage) {
        return
      }
      const navLink: NavLinkItem = {
        title: link.label,
        path: pageContext.pageLookup[link.toPage.contentful_id].path,
      }
      links.push(navLink)
    })
  }

  return (
    <header className="py-2 bg-navy-800 h-nav sticky top-0">
      <div className="max-w-5xl px-4 mx-auto h-full flex items-center justify-between">
        <MobileNavigation navLinks={links} />
        <div className="flex items-center">
          <Link to="/" className="text-white" aria-label="Go to the home page">
            <BrandMark flavor="white" layout="logo" className="block h-8" />
          </Link>
        </div>
        <DesktopNavigation navLinks={links} />
      </div>
    </header>
  )
}

export default MainMenu
