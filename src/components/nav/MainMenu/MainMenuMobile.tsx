import cx from 'classnames'
import { Link } from 'gatsby'
import { FunctionComponent, useState } from 'react'
import { NavItem } from './MainMenu'

interface Props {
  nav: NavItem[]
}

const MobileNavigation: FunctionComponent<Props> = ({ nav }) => {
  const [showMobileNav, setShowMobileNav] = useState(false)

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav)
  }

  return (
    <nav role="navigation" className="md:hidden">
      {/* Screenreaders work best when the button is inside the nav */}
      <button
        className={cx('burger', { 'is-active': showMobileNav })}
        type="button"
        onClick={toggleMobileNav}
        aria-label="Menu"
      >
        <span className="burger-box">
          <span className="burger-inner"></span>
        </span>
      </button>
      <div
        onClick={toggleMobileNav}
        className={cx(
          'fixed inset-x-0 top-16 bg-navy-900 transition-all duration-200',
          {
            'pointer-events-none h-0 delay-200': !showMobileNav,
            'h-content': showMobileNav,
          },
        )}
      ></div>
      <ul
        className={cx(
          'fixed left-0 right-0 py-4 top-16 border-t border-navy-700 transform-gpu transition-all duration-200',
          {
            'pointer-events-none opacity-0 -translate-y-4': !showMobileNav,
            'opacity-100 translate-y-0 delay-200': showMobileNav,
          },
        )}
      >
        {nav.map((linkItem) => {
          if (linkItem._type === 'NavLink') {
            return (
              <li key={linkItem.label}>
                <Link
                  to={linkItem.path}
                  className="py-2 px-4 flex items-center text-white"
                >
                  {linkItem.label}
                </Link>
              </li>
            )
          } else if (linkItem._type === 'NavLabel') {
            return (
              <li className="mt-6">
                <p className="text-navy-100 px-4 mb-2 text-sm tracking-wide uppercase">
                  {linkItem.label}
                </p>
              </li>
            )
          } else if (linkItem._type === 'NavButton') {
            return (
              <li>
                <Link
                  to={linkItem.path}
                  className="mt-8 block mx-4 py-2 px-6 text-center rounded bg-white transition-colors text-navy-700"
                >
                  {linkItem.label}
                </Link>
              </li>
            )
          } else if (linkItem._type === 'NavGroup') {
            return (
              <li className="mt-6">
                <Link
                  key={linkItem.main.label}
                  to={linkItem.main.path}
                  className="text-navy-100 px-4 mb-2 text-sm tracking-wide uppercase"
                >
                  {linkItem.main.label}
                </Link>

                {linkItem.sub.map((subLinkItem) => (
                  <Link
                    key={subLinkItem.label}
                    to={subLinkItem.path}
                    className="py-2 px-6 flex items-center text-white"
                  >
                    {subLinkItem.label}
                  </Link>
                ))}
              </li>
            )
          } else {
            return null
          }
        })}
      </ul>
    </nav>
  )
}

export default MobileNavigation
