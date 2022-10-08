import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'
import Footer from '@components/Footer'
import MainMenu from '@components/nav/MainMenu/MainMenu'

interface Props {
  footer?: ReactNode
}

const SimpleLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  footer,
  children,
}) => (
  <>
    <header>
      <MainMenu />
    </header>
    <main>{children}</main>
    {footer ? footer : <Footer />}
  </>
)

export default SimpleLayout
