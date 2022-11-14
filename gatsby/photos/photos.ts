import {
  CreateNodeArgs,
  CreateResolversArgs,
  CreateSchemaCustomizationArgs,
} from 'gatsby'
import { PhotoData } from '../../src/types/photo.d'
import { imageSharpResolver } from '../create-resolvers'

export const createPhotoSchemaCustomization = ({
  actions: { createTypes },
}: CreateSchemaCustomizationArgs) => {
  const typeDefs = `
    type DAPhoto implements Node {
      relativePath: String!
      alt: String!
      image: ImageSharp!
    }
  `
  createTypes(typeDefs)
}

export const derivePhoto = (
  image: PhotoData,
  parentId: string,
  args: CreateNodeArgs,
) => {
  return {
    relativePath: image.url,
    alt: image.alt,

    id: args.createNodeId(`DAPhoto - ${image.url}`),
    parent: parentId,
    children: [],
    internal: {
      type: 'DAPhoto',
      contentDigest: args.createContentDigest(`${image.alt} ${image.url}`),
    },
  }
}

export const createPhotoResolvers = (args: CreateResolversArgs) => {
  const { createResolvers, getNode } = args
  createResolvers({
    DAPhoto: {
      image: imageSharpResolver(getNode, 'relativePath'),
    },
  })
}
