import { GatsbyImage } from 'gatsby-plugin-image'

export type PhotoData = {
  /**
   * relative path to media file
   */
  url: string
  /**
   * Alternative text
   */
  alt: string
}

export type Photo = {
  /**
   * relative path to media file
   */
  relativePath: string
  /**
   * Alternative text
   */
  alt: string
  /**
   * Image process by sharp
   */
  image: GatsbyImage
}
