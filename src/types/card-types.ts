import { IGatsbyImageData } from 'gatsby-plugin-image'

export type Action = {
  url: string
  label: string
}

export type DynamicCardImage = {
  image: IGatsbyImageData
  alt: string
}
