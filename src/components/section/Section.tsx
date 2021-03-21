import { FunctionComponent } from 'react'
import Content from '../content/Content'
import SectionStack from './SectionStack'

// import Row from './SectionRow'
// import Grid from './SectionGrid'

// import TableOfContents from './SectionTableOfContents'
// import Gallery from './SectionGallery'

interface Props {
  page: object
  section: {
    title: string
    slug: string
    flavor: string
    layout: 'Stack'
    content: [any?]
  }
}

const Section: FunctionComponent<Props> = ({ page, section }) => {
  if (section.content === null) {
    section.content = []
  }

  switch (section.layout) {
    case 'Stack':
      return (
        <SectionStack section={section}>
          {section.content.map((content) => {
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
          {section.content.map((content) => {
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
