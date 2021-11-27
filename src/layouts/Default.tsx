import Footer from '@components/Footer'
import Breadcrumbs from '@components/nav/Breadcrumbs'
import MainMenu from '@components/nav/MainMenu/MainMenu'
import { PageContext } from '@types/site-types'
import { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  pageContext: PageContext
  children: any
}

const DefaultLayout: FunctionComponent<Props> = ({ pageContext, children }) => {
  const { site, pageLookup, page } = pageContext

  return (
    <>
      {/* html document head */}
      <Helmet title={`${page.title} < ${site.title}`} />

      {/* site level header / body / footer */}
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
