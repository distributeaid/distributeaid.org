import Footer from '@components/Footer'
import MainMenu from '@components/nav/MainMenu/MainMenu'
import { FC } from 'react'
import { Helmet } from 'react-helmet'

const RouteLayout: FC = ({ children }) => (
  <>
    <Helmet>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Inconsolata:wght@200..900&family=Karla:ital,wght@0,200..800;1,200..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap"
        rel="stylesheet"
      ></link>
    </Helmet>

    <header>
      <MainMenu />
    </header>
    <main>{children}</main>
    <Footer />
  </>
)

export default RouteLayout
