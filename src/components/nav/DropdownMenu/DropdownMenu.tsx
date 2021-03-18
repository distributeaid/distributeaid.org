import cx from 'classnames'
import { FunctionComponent, ReactNode, useRef, useState } from 'react'
import DropdownMenuButton from './DropdownMenuButton'
import DropdownMenuDivider from './DropdownMenuDivider'
import DropdownMenuText from './DropdownMenuText'

interface Props {
  /**
   * An optional way to style the button that triggers the dropdown
   */
  buttonClassname?: string
  /**
   * The content of the trigger
   */
  label: ReactNode
  /**
   * Determines whether the menu is horizontally-aligned to the left or right of
   * the button.
   */
  position?: 'left' | 'right'
}

interface NestedComponents {
  Text: typeof DropdownMenuText
  Button: typeof DropdownMenuButton
  Divider: typeof DropdownMenuDivider
}

const ANIMATION_DURATION_MS = 200
enum MenuAnim {
  Hidden,
  Visible,
  TransitionIn,
  TransitionOut,
}

/**
 * A dropdown menu that can be composed with the following components:
 * - DropdownMenu.Button (DropdownMenuButton)
 * - DropdownMenu.Text (DropdownMenuText)
 * - DropdownMenu.Divider (DropdownMenuDivider)
 *
 * The menu will close when the user clicks outside of it or presses the Escape
 * key.
 */
const DropdownMenu: FunctionComponent<Props> & NestedComponents = ({
  position = 'left',
  buttonClassname,
  label,
  children,
}) => {
  const dropdownContainerRef = useRef<HTMLDivElement>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [animation, setAnimation] = useState(MenuAnim.Hidden)

  const hideMenu = () => {
    document.removeEventListener('click', closeMenuOnClickOutside)
    document.removeEventListener('keydown', closeMenuOnEscape)

    // Animate the menu
    setAnimation(MenuAnim.TransitionOut)
    setTimeout(() => {
      setAnimation(MenuAnim.Hidden)
    }, ANIMATION_DURATION_MS)

    setShowMenu(false)
  }

  const closeMenuOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideMenu()
    }
  }

  const closeMenuOnClickOutside = (event: MouseEvent) => {
    if (!dropdownContainerRef.current?.contains(event.target as any)) {
      hideMenu()
    }
  }

  const toggleMenu = () => {
    if (showMenu) {
      hideMenu()
    } else {
      // Add an event listener to close the menu when pressing Escape
      document.addEventListener('keydown', closeMenuOnEscape)

      setShowMenu(true)

      // Wait for the next frame and then...
      requestAnimationFrame(() => {
        // Start the animation
        setAnimation(MenuAnim.TransitionIn)

        // After the animation is over, update the animation state
        setTimeout(() => {
          setAnimation(MenuAnim.Visible)
        }, ANIMATION_DURATION_MS)

        // Close the menu when clicking outside
        document.addEventListener('click', closeMenuOnClickOutside)
      })
    }
  }

  return (
    <div className="relative">
      <button type="button" onClick={toggleMenu} className={buttonClassname}>
        {label}
      </button>
      <div
        className={cx('absolute', {
          hidden: !showMenu && animation === MenuAnim.Hidden,
          'right-0': position === 'right',
          'left-0': position === 'left',
        })}
      >
        <div
          ref={dropdownContainerRef}
          className={cx(
            'bg-white min-w-max border border-gray-200 shadow-sm text-gray-700 py-1 rounded-sm transition-opacity',
            {
              'opacity-0':
                animation === MenuAnim.Hidden ||
                animation === MenuAnim.TransitionOut,
              'opacity-100':
                animation === MenuAnim.TransitionIn ||
                animation === MenuAnim.Visible,
            },
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

DropdownMenu.Text = DropdownMenuText
DropdownMenu.Button = DropdownMenuButton
DropdownMenu.Divider = DropdownMenuDivider

export default DropdownMenu
