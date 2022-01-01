import { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import { PageContext } from '@types/site-types'
import Footer from '@components/Footer'
import Breadcrumbs from '@components/nav/Breadcrumbs'
import MainMenu from '@components/nav/MainMenu/MainMenu'
import Favicon from '@components/Favicon'

interface Props {
  pageContext: PageContext
  children: any
}

const DefaultLayout: FunctionComponent<Props> = ({ pageContext, children }) => {
  const { site, pageLookup, page } = pageContext

  return (
    <>
      <Helmet title={`${page.title} - ${site.title}`} />
      <Favicon />

      <header>
        <MainMenu />
        <Breadcrumbs pageContext={pageContext} />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default DefaultLayout
