import { Link } from 'gatsby'
import { FunctionComponent } from 'react'
import { NavLinkItem } from './MainMenu'

interface Props {
  navLinks: NavLinkItem[]
}

const DesktopNavigation: FunctionComponent<Props> = ({ navLinks }) => {
  return (
    <nav role="navigation" className="hidden md:block w-full">
      <ul className="pl-6 flex space-x-2">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="py-2 px-4 rounded hover:bg-navy-700 transition-colors flex items-center text-white"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default DesktopNavigation
