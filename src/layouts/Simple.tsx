import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import Favicon from '@components/Favicon'
import Footer from '@components/Footer'
import MainMenu from '@components/nav/MainMenu/MainMenu'

interface Props {
  pageTitle: string
  footer?: ReactNode
}

const SimpleLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  pageTitle,
  footer,
  children,
}) => (
  <>
    <Helmet
      title={`${pageTitle} - Distribute Aid`}
      htmlAttributes={{
        lang: 'en',
      }}
    >
      <meta
        name="description"
        content="Humanitarian aid delivery reimagined. By supporting a huge network of grassroots organisations, we ensure that donations get to where they are needed most."
      ></meta>
    </Helmet>
    <Favicon />
    <header>
      <MainMenu />
    </header>
    <main>{children}</main>
    {footer ? footer : <Footer />}
  </>
)

export default SimpleLayout
