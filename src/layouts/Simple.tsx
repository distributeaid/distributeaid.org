import { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
// import Breadcrumbs from '@components/nav/Breadcrumbs'
// import MainMenu from '@components/nav/MainMenu/MainMenu'

interface Props {
  pageContext: {
    pageTitle: string
    siteTitle: string
  }
  children: any
}

const SimpleLayout: FunctionComponent<Props> = ({ pageContext, children }) => {
  const { pageTitle, siteTitle } = pageContext

  return (
    <>
      {/* html document head */}
      <Helmet title={`${pageTitle} < ${siteTitle}`}>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Inconsolata:wght@200..900&family=Karla:ital,wght@0,200..800;1,200..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        />
      </Helmet>

      {/* site level header / body / footer */}
      <header>
        {/*
          <MainMenu />
          <Breadcrumbs pageContext={pageContext} />
        */}
        Site Header
      </header>
      <main>{children}</main>
      <footer>Site Footer</footer>
    </>
  )
}

export default SimpleLayout
