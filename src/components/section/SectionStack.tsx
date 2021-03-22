import { FunctionComponent } from 'react'
import { ContentfulSitePageSection } from '../../types/gatsby-graphql-types.gen'

interface Props {
  section: ContentfulSitePageSection
  children: any
}

const SectionStack: FunctionComponent<Props> = ({ section, children }) => {
  const { slug, flavor } = section

  return (
    <section id={`${slug}`} className={`${flavor}`}>
      <h2>{section.title}</h2>
      {children}
    </section>
  )
}

export default SectionStack
