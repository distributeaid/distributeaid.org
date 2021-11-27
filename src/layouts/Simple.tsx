import { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'

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
      <Helmet title={`${pageTitle} < ${siteTitle}`} />

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
