import React from 'react'
import Content from '../Content'
import SectionStack from './SectionStack'

// import Row from '../components/SectionRow'
// import Grid from '../components/SectionGrid'

// import TableOfContents from '../components/SectionTableOfContents'
// import Gallery from '../components/SectionGallery'

const Section = ({ page, section }) => {
  if (section.content === null) {
    section.content = []
  }

  switch (section.layout) {
    case 'Stack':
      return (
        <SectionStack page={page} section={section}>
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
        <SectionStack page={page} section={section}>
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
