import { Link } from 'gatsby'
import { FunctionComponent } from 'react'
import LogoMark from '../../brand/LogoMark'
import DesktopNavigation from './MainMenuDesktop'
import MobileNavigation from './MainMenuMobile'

export interface NavLabel {
  _type: 'NavLabel'
  label: string
}

export interface NavLink {
  _type: 'NavLink'
  label: string
  path: string
}

export interface NavButton {
  _type: 'NavButton'
  label: string
  path: string
}

export interface NavGroup {
  _type: 'NavGroup'
  main: NavLink
  sub: NavLink[]
}

export type NavItem = NavLabel | NavLink | NavButton | NavGroup

const nav: NavItem[] = [
  { _type: 'NavLink', label: 'Home', path: '/' },
  { _type: 'NavLink', label: 'About Us', path: '/about-us/' },
  {
    _type: 'NavGroup',
    main: {
      _type: 'NavLink',
      label: 'Needs',
      path: '/needs-assessments/explorer/',
    },
    sub: [
      {
        _type: 'NavLink',
        label: 'Overview',
        path: '/needs-assessments/overview/',
      },
      {
        _type: 'NavLink',
        label: 'Data Explorer',
        path: '/needs-assessments/explorer/',
      },
      {
        _type: 'NavLink',
        label: 'Methodology',
        path: '/needs-assessments/methodology/',
      },
    ],
  },
  { _type: 'NavLink', label: 'Regions', path: '/regions/' },

  // NOTE: Intentionally hiding routes pages until we can get all of our routes
  //       up, since they contain old info + people think we can only do
  //       UK > France & UK > Lebanon.
  //
  // SEE: https://github.com/distributeaid/distributeaid.org/issues/968
  //
  // NOTE: Main menu route link tests were deleted from the home page E2E tests
  //       as part of this update. We should write comprehensive main menu E2E
  //       tests at some point, which cover the updated route pages & other key
  //       main menu items.
  //
  // {
  //   _type: 'NavGroup',
  //   main: { _type: 'NavLink', label: 'Routes', path: '#' },
  //   sub: [
  //     {
  //       _type: 'NavLink',
  //       label: 'UK to France',
  //       path: '/routes/uk-to-france/',
  //     },
  //     {
  //       _type: 'NavLink',
  //       label: 'UK to Lebanon',
  //       path: '/routes/uk-to-lebanon/',
  //     },
  //   ],
  // },

  { _type: 'NavButton', label: 'Donate', path: '/donate/' },
]

/**
 * A full-width element that sits at the top of the page. It displays the DA
 * branding and a dropdown-menu with some account information.
 */
const MainMenu: FunctionComponent = () => (
  <header className="py-2 bg-navy-800 h-nav sticky top-0 z-10">
    <div className="max-w-5xl px-4 mx-auto h-full flex items-center justify-between">
      <MobileNavigation nav={nav} />
      <div className="h-full">
        <Link to="/" className="text-white" aria-label="Go to the home page">
          <LogoMark width="50" height={(60 / 70) * 50} />
        </Link>
      </div>
      <DesktopNavigation nav={nav} />
    </div>
  </header>
)

export default MainMenu
