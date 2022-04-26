import { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import SimpleLayout from '../layouts/Simple'
import MarkdownContent from '../components/markdown/MarkdownContent'

type TemplateProps = {
  pageContext: {
    region: {
      name: string
      map: string
      overview: string
      governmentResponse: string
      newsUpdates: {
        title: string
        visibleCount: number
        updates: {
          title: string
          content: string
          date: string
          pinned: boolean
        }
      }
      linksList: {
        title: string
        links: {
          title: string
          url: string
          description: string
        }
      }
      subregions: string[]
    }

    subregions: [
      {
        name: string
        map: string
        overview: string
        population: {
          count: number
          trend: string
          description: string
        }
        newsUpdates: {
          title: string
          visibleCount: number
          updates: {
            title: string
            content: string
            date: string
            pinned: string
          }
        }
      },
    ]
  }
}

const RegionPage: FC<TemplateProps> = ({
  pageContext: { region, subregions },
}) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">{region.name}</h1>
      <ul>
        {subregions.map(({ name }) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default RegionPage
