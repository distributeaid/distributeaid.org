import { Link } from 'gatsby'
import { FunctionComponent } from 'react'
import BrandMark from '../../brand/BrandMark'
import DesktopNavigation from './MainMenuDesktop'
import MobileNavigation from './MainMenuMobile'

export interface NavLinkItem {
  title: string
  path: string
}

const linksHardcoded: NavLinkItem[] = [
  {
    title: 'Who We Are',
    path: '/who-we-are/',
  },
  {
    title: 'What We Do',
    path: '/what-we-do',
  },
  {
    title: 'Get Involved',
    path: '/get-involved',
  },
]

const routeLinks: NavLinkItem[] = [
  { title: 'UK to France', path: '/regular-routes/uk-to-france' },
  { title: 'UK to Lebanon', path: '/regular-routes/uk-to-lebanon' },
]

/**
 * A full-width element that sits at the top of the page. It displays the DA
 * branding and a dropdown-menu with some account information.
 */
const MainMenu: FunctionComponent = () => (
  <header className="py-2 bg-navy-800 h-nav sticky top-0 z-10">
    <div className="max-w-5xl px-4 mx-auto h-full flex items-center justify-between">
      <MobileNavigation navLinks={linksHardcoded} routeLinks={routeLinks} />
      <div className="flex items-center w-16 h-16">
        <Link to="/" className="text-white" aria-label="Go to the home page">
          <BrandMark flavor="white" layout="logo" />
        </Link>
      </div>
      <DesktopNavigation navLinks={linksHardcoded} routeLinks={routeLinks} />
    </div>
  </header>
)

export default MainMenu
