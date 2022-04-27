import { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import SimpleLayout from 'layouts/Simple'
import MarkdownContent from '@components/markdown/MarkdownContent'
import { Region, Subregion } from '@components/regions/RegionComponentTypes'

type TemplateProps = {
  pageContext: {
    region: Region
    subregions: Subregion[]
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
