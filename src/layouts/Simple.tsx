import Footer from '@components/Footer'
import MainMenu from '@components/nav/MainMenu/MainMenu'
import { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  pageTitle: string
}

const SimpleLayout: FunctionComponent<Props> = ({ pageTitle, children }) => {
  return (
    <>
      <Helmet title={`${pageTitle} < Distribute Aid`} />
      <header>
        <MainMenu />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default SimpleLayout
