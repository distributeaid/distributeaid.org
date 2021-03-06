import { FunctionComponent } from 'react'
// import Row from './SectionRow'
// import Grid from './SectionGrid'
// import TableOfContents from './SectionTableOfContents'
// import Gallery from './SectionGallery'
import {
  ContentfulSitePage,
  ContentfulSitePageSection,
} from '../../types/gatsby-graphql-types.gen'
import Content from '../content/Content'
import SectionStack from './SectionStack'

interface Props {
  page: ContentfulSitePage
  section: ContentfulSitePageSection
}

const Section: FunctionComponent<Props> = ({ page, section }) => {
  switch (section.layout) {
    case 'Stack':
      return (
        <SectionStack section={section}>
          {section.content &&
            section.content.map((content) => {
              if (content === null) {
                return
              }
              return (
                <div key={content.contentful_id}>
                  <Content section={section} content={content} />
                </div>
              )
            })}
        </SectionStack>
      )

    default:
      return (
        <SectionStack section={section}>
          {section.content &&
            section.content.map((content) => {
              if (content === null) {
                return
              }
              return (
                <Content
                  key={content.contentful_id}
                  section={section}
                  content={content}
                />
              )
            })}
        </SectionStack>
      )
  }
}

export default Section
