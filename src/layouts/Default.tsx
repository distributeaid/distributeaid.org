import React from 'react'
import NavBreadcrumbs from '../components/NavBreadcrumbs'
import NavMain from '../components/NavMain'

class DefaultLayout extends React.Component {
  render() {
    const { site, pages, pageLookup, page, children } = this.props

    return (
      <div>
        <header>
          <NavMain pageLookup={pageLookup} page={page} />
          <NavBreadcrumbs pageLookup={pageLookup} page={page} />
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </div>
    )
  }
}

export default DefaultLayout
