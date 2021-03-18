import { graphql, useStaticQuery } from 'gatsby'
import { FunctionComponent } from 'react'
import { Flavors } from '../../types/display-option-types'

export type BrandMarkLayouts = 'logo' | 'lettermark' | 'wordmark'

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
  const data = useStaticQuery(graphql`
    query BrandMarkQuery {
      contentfulSiteSite {
        logos {
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
          contentful_id
          title
        }
      }
    }
  `)

  const logos = data.contentfulSiteSite.logos
  const logo = logos.find((logo) => {
    const title = logo.title.toLowerCase()
    const hasFlavor = title.indexOf(flavor) !== -1
    const hasLayout = title.indexOf(layout) !== -1
    return hasFlavor && hasLayout
  })

  return (
    <div className={className}>
      <img src={logo.url} alt={logo.title} />
      <h3>{logo.title}</h3>
    </div>
  )
}

export default BrandMark
