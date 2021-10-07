import { FunctionComponent } from 'react'
// import { ContentfulContentMarkdown } from '../../types/gatsby-graphql-types.gen'
import { ContentfulSitePageSection } from '../../types/gatsby-graphql-types.gen'
import Content from '../content/Content'

interface Props {
  section: ContentfulSitePageSection
}

const PageBanner: FunctionComponent<Props> = ({ section }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 bg-gray-100 px-16 py-20 font-sans text-2xl text-navy-600">
      {section.content &&
        section.content.map((content) => {
          let className = ''
          if (content === null) {
            return
          } else if (
            content.__typename === 'ContentfulContentPhoto' &&
            content.entry
          ) {
            content.entry.title = null
            className = 'flex-none w-48 lg:w-64'
          } else if (content.__typename === 'ContentfulContentMarkdown') {
            className = 'max-w-prose'
          }
          return (
            <div className={className} key={content.contentful_id}>
              <Content section={section} content={content} />
            </div>
          )
        })}
    </div>
  )
}

export default PageBanner
