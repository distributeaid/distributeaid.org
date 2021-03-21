import { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import Breadcrumbs from '../components/nav/Breadcrumbs'
import MainMenu from '../components/nav/MainMenu/MainMenu'

interface Props {
  site: {
    title: string
  }
  pages: [object?]
  pageLookup: [string?]
  page: {
    title: string
    breadcrumbIDs: [string?]
  }
  children: any
}

const DefaultLayout: FunctionComponent<Props> = ({
  site,
  pages,
  pageLookup,
  page,
  children,
}) => {
  return (
    <>
      {/* html document head */}
      <Helmet title={`${page.title} < ${site.title}`} />

      {/* site level header / body / footer */}
      <header>
        <MainMenu pageLookup={pageLookup} page={page} />
        <Breadcrumbs pageLookup={pageLookup} page={page} />
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  )
}

export default DefaultLayout
