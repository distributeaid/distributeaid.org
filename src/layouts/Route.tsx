import Footer from '@components/Footer'
import MainMenu from '@components/nav/MainMenu/MainMenu'
import { FC } from 'react'

const RouteLayout: FC = ({ children }) => (
  <>
    <header>
      <MainMenu />
    </header>
    <main>{children}</main>
    <Footer />
  </>
)

export default RouteLayout
