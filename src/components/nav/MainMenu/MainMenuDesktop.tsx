import { useState, useRef, useEffect } from 'react'
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
  const [showRoutes, setShowRoutes] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // TODO make this more accessible. We could do all of this with only CSS.
    const enableRoutes = () => setShowRoutes(true)
    const disableRoutes = () => setShowRoutes(false)
    navRef.current?.addEventListener('mouseover', enableRoutes)
    navRef.current?.addEventListener('mouseout', disableRoutes)

    return () => {
      navRef.current?.removeEventListener('mouseover', enableRoutes)
      navRef.current?.removeEventListener('mouseout', disableRoutes)
    }
  })

  return (
    <nav role="navigation" className="hidden md:block">
      <div className="pl-6 flex space-x-2 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="py-2 px-4 rounded hover:bg-navy-700 transition-colors text-white"
          >
            {link.title}
          </Link>
        ))}
        {routeLinks && (
          <nav ref={navRef} className="cursor-pointer">
            <div className="py-2 px-4 text-white">Routes</div>
            <ul
              style={{ display: showRoutes ? 'block' : 'none' }}
              className="absolute z-10 bg-navy-800"
            >
              {routeLinks.map((route) => (
                <Link
                  to={route.path}
                  key={route.path}
                  className="py-2 px-4 block hover:bg-navy-700 transition-colors text-white"
                >
                  {route.title}
                </Link>
              ))}
            </ul>
          </nav>
        )}
        <Link
          to="/donate"
          className="py-2 px-6 rounded bg-white transition-colors text-navy-700"
        >
          Donate
        </Link>
      </div>
    </nav>
  )
}

export default DesktopNavigation
