import { Link } from 'gatsby'
import { FunctionComponent } from 'react'
import BrandMark from '../../brand/BrandMark'
import DesktopNavigation from './MainMenuDesktop'
import MobileNavigation from './MainMenuMobile'

export interface NavLinkItem {
  label: string
  path: string
}

const linksHardcoded: NavLinkItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us/' },
  //  { label: 'Regions', path: '/regions/' },
]

const routeLinks: NavLinkItem[] = [
  { label: 'UK to France', path: '/routes/uk-to-france' },
  { label: 'UK to Lebanon', path: '/routes/uk-to-lebanon' },
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
