import { CreateResolversArgs } from 'gatsby'
import { imageSharpResolver } from '../create-resolvers'

export const createBlockPhotoResolvers = (args: CreateResolversArgs) => {
  const { createResolvers, getNode } = args
  createResolvers({
    DABlockImage: {
      image: imageSharpResolver(getNode, 'relativePath'),
    },
  })
}
