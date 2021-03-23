import {
  ContentfulSitePage,
  ContentfulSiteSite,
  Scalars,
} from './gatsby-graphql-types.gen'

export type Page = ContentfulSitePage & {
  __typename?: 'Page'
  path: string
  comesFromID: Scalars['ID']
  breadcrumbIDs: Scalars['ID'][]
}

export type PageContext = {
  __typename?: 'PageContext'
  site: ContentfulSiteSite
  pages: Page[]
  pageLookup: {
    [key: string]: Page
  }
  page: Page
}
