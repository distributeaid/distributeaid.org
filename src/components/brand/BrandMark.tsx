import { Flavors } from '@types/display-option-types'
import { ContentfulSiteSite } from '@types/gatsby-graphql-types.gen'
import { graphql, useStaticQuery } from 'gatsby'
import { FunctionComponent } from 'react'

export type BrandMarkLayouts = 'logo' | 'lettermark' | 'wordmark'

interface LogosData {
  contentfulSiteSite: ContentfulSiteSite
}

interface Props {
  flavor?: Flavors
  layout?: BrandMarkLayouts
  className?: string
}

const BrandMark: FunctionComponent<Props> = ({
  flavor = 'white',
  layout = 'logo',
  className = '',
}) => {
  const data: LogosData = useStaticQuery(graphql`
    query BrandMarkQuery {
      contentfulSiteSite {
        logos {
          contentful_id
          title
          file {
            contentType
            url
            details {
              image {
                height
                width
              }
            }
          }
        }
      }
    }
  `)

  const logos = data.contentfulSiteSite.logos
    ? data.contentfulSiteSite.logos
    : []
  const logo = logos.find((logo) => {
    if (!logo) {
      return false
    }

    const title = logo.title ? logo.title.toLowerCase() : ''
    const hasFlavor = title.indexOf(flavor) !== -1
    const hasLayout = title.indexOf(layout) !== -1
    return hasFlavor && hasLayout
  })

  if (!logo || !logo.file || !logo.file.url || !logo.title) {
    return null
  }

  return (
    <div className={className}>
      <img src={logo.file.url} alt={`${logo.title}`} />
      <h3>{logo.title}</h3>
    </div>
  )
}

export default BrandMark
