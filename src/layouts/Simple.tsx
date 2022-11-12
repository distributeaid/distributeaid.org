import Footer from '@components/Footer'
import MainMenu from '@components/nav/MainMenu/MainMenu'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

const SimpleLayout: FunctionComponent<
  PropsWithChildren<{
    className?: string
    footer?: ReactNode
  }>
> = ({ footer, children, className }) => (
  <>
    <header>
      <MainMenu />
    </header>
    <main className={className}>{children}</main>
    {footer ? footer : <Footer />}
  </>
)

export default SimpleLayout
