import { Link } from 'gatsby'
import { FunctionComponent } from 'react'
import { NavLinkItem } from './MainMenu'

interface Props {
  navLinks: NavLinkItem[]
  routeLinks?: NavLinkItem[]
}

const DesktopNavigation: FunctionComponent<Props> = ({
  navLinks,
  routeLinks,
}) => {
  return (
    <nav role="navigation" className="hidden md:block">
      <div className="pl-6 flex space-x-2 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="py-2 px-4 rounded hover:bg-navy-700 transition-colors text-white"
          >
            {link.label}
          </Link>
        ))}
        {routeLinks && (
          <nav className="group relative">
            <a
              href="#"
              className="peer py-2 px-4 text-white block rounded-t cursor-default group-hover:bg-navy-700"
            >
              Routes
            </a>
            <ul className="hidden peer-hover:flex hover:flex flex-col absolute right-0 bg-navy-700 shadow-lg">
              {routeLinks.map((route) => (
                <Link
                  to={route.path}
                  key={route.path}
                  className="py-2 px-4 rounded block hover:bg-navy-600 transition-colors text-white whitespace-nowrap"
                >
                  {route.label}
                </Link>
              ))}
            </ul>
          </nav>
        )}
        <Link
          to="/donate/"
          className="py-2 px-6 rounded bg-white transition-colors text-navy-700"
        >
          Donate
        </Link>
      </div>
    </nav>
  )
}

export default DesktopNavigation
