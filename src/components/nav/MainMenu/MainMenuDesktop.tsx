import { Link } from 'gatsby'
import { FunctionComponent } from 'react'
import { NavLinkItem } from './MainMenu'

interface Props {
  navLinks: NavLinkItem[]
}

const DesktopNavigation: FunctionComponent<Props> = ({ navLinks }) => {
  return (
    <nav role="navigation" className="hidden md:block">
      <ul className="pl-6 flex space-x-2 items-center">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="py-2 px-4 rounded hover:bg-navy-700 transition-colors text-white"
            >
              {link.title}
            </Link>
          </li>
        ))}
        <Link
          to="/donate"
          className="py-2 px-6 rounded bg-white transition-colors text-navy-700"
        >
          Donate
        </Link>
      </ul>
    </nav>
  )
}

export default DesktopNavigation
