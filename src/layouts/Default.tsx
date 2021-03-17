import React from 'react'
import { Helmet } from 'react-helmet'
import NavBreadcrumbs from '../components/NavBreadcrumbs'
import NavMain from '../components/NavMain'

class DefaultLayout extends React.Component {
  render() {
    const { site, pages, pageLookup, page, children } = this.props

    return (
      <>
        {/* html document head */}
        <Helmet title={`${page.title} < ${site.title}`} />

        {/* site level header / body / footer */}
        <header>
          <NavMain pageLookup={pageLookup} page={page} />
          <NavBreadcrumbs pageLookup={pageLookup} page={page} />
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </>
    )
  }
}

export default DefaultLayout
