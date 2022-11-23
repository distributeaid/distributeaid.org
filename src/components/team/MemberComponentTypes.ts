import { IGatsbyImageData } from 'gatsby-plugin-image'

/*
Members
================================================================================
*/

export type Member = {
  bio?: string
  name: string
  profilePhoto?: {
    gatsbyImageData: IGatsbyImageData
  }
  link?: string
  roles: {
    role: {
      title: string
      commitment: string
      domain: string
    }
  }[]
}
