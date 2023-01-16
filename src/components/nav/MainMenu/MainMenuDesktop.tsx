import { Link } from 'gatsby'
import { FunctionComponent } from 'react'
import { NavItem } from './MainMenu'

interface Props {
  nav: NavItem[]
}

const DesktopNavigation: FunctionComponent<Props> = ({ nav }) => {
  return (
    <nav role="navigation" className="hidden md:block">
      <div className="pl-6 flex space-x-2 items-center">
        {nav.map((linkItem) => {
          if (linkItem._type === 'NavLink') {
            return (
              <Link
                key={linkItem.label}
                to={linkItem.path}
                className="py-2 px-4 rounded hover:bg-navy-700 transition-colors text-white"
              >
                {linkItem.label}
              </Link>
            )
          } else if (linkItem._type === 'NavLabel') {
            return (
              <a
                key={linkItem.label}
                href="#"
                className="peer py-2 px-4 text-white block rounded-t cursor-default group-hover:bg-navy-700"
              >
                {linkItem.label}
              </a>
            )
          } else if (linkItem._type === 'NavButton') {
            return (
              <Link
                key={linkItem.label}
                to={linkItem.path}
                className="py-2 px-6 rounded bg-white transition-colors text-navy-700"
              >
                {linkItem.label}
              </Link>
            )
          } else if (linkItem._type === 'NavGroup') {
            return (
              <nav className="group relative">
                <a
                  href={linkItem.main.path}
                  className={`peer py-2 px-4 text-white block rounded-t group-hover:bg-navy-700 ${
                    linkItem.main.path === '#' ? 'cursor-default' : ''
                  }`}
                >
                  {linkItem.main.label}
                </a>
                <ul className="hidden peer-hover:flex hover:flex flex-col absolute right-0 bg-navy-700 shadow-lg">
                  {linkItem.sub.map((subLinkItem) => (
                    <Link
                      key={subLinkItem.label}
                      to={subLinkItem.path}
                      className="py-2 px-4 rounded block hover:bg-navy-600 transition-colors text-white whitespace-nowrap"
                    >
                      {subLinkItem.label}
                    </Link>
                  ))}
                </ul>
              </nav>
            )
          } else {
            return null
          }
        })}
      </div>
    </nav>
  )
}

export default DesktopNavigation
