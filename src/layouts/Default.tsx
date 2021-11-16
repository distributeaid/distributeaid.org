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
      <Helmet title={`${page.title} < ${site.title}`}>
        {/* TODO: Consolidate fonts, remove unneeded ones */}
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
