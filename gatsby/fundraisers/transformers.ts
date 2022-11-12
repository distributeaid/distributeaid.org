import {
  CreateNodeArgs,
  CreateResolversArgs,
  CreateSchemaCustomizationArgs,
} from 'gatsby'
import minimatch from 'minimatch'
import path from 'path'
import { Photo } from '../../src/types/fundraiser.d'
import { imagesSharpResolver } from '../create-resolvers'
import { getObjectProperty } from '../utils/untypedAccess/getObjectProperty'
import { getStringProperty } from '../utils/untypedAccess/getStringProperty'
import { nodeParent } from '../utils/untypedAccess/nodeParent'

/**
 * Creates the fundraiser nodes
 */
export const createFundraisersFromMarkdown = ({
  node,
  actions: { createNode },
  createNodeId,
  createContentDigest,
  getNode,
}: CreateNodeArgs) => {
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.fileAbsolutePath &&
    minimatch(
      getStringProperty(node, 'fileAbsolutePath'),
      '**/content/blocks/fundraisers/*.md',
    )
  ) {
    const fileRelativePath = path.join(
      'content',
      getStringProperty(getNode(nodeParent(node)), 'relativePath'),
    )
    const fileName = path.parse(fileRelativePath).name

    const fm = getObjectProperty(node, 'frontmatter')
    const galleryData = fm.gallery || []
    const galleryMeta = galleryData.map((image: Photo) => {
      return {
        url: `**/static${image.url}`,
        alt: image.alt,
      }
    })
    createNode({
      name: fileName,
      title: fm.title,
      galleryMeta: galleryMeta,
      allocations: fm.allocations ?? [],
      body: node.rawMarkdownBody,
      fileRelativePath,
      id: createNodeId(`Fundraiser - ${fileName}`),
      parent: node.id,
      children: [],
      internal: {
        type: 'DAFundraiser',
        contentDigest: createContentDigest(fm),
      },
    })
  }
}

export const createFundraiserSchemaCustomization = ({
  actions: { createTypes },
}: CreateSchemaCustomizationArgs) => {
  const typeDefs = `
    type DAFundraiser implements Node {
      name: String!
      title: String!
      gallery: [ImageSharp]
      galleryMeta: [DAFundraiserPhoto]!
      allocations: [DAFundraiserAllocation]!
      body: String!
    }

    type DAFundraiserAllocation {
      date: Date!
      amountEUR: Int!
      purpose: String!
    }

    type DAFundraiserPhoto {
      url: String!
      alt: String!
    }
  `
  createTypes(typeDefs)
}

export const createFundraiserResolvers = ({
  createResolvers,
  getNode,
}: CreateResolversArgs) => {
  createResolvers({
    DAFundraiser: {
      gallery: {
        type: ['ImageSharp'],
        // @ts-ignore
        resolve: async (source, args, context, info) => {
          const relativePaths = source.gallery
            .map((image: Photo) => image.url)
            .join('|')
          return imagesSharpResolver(getNode, relativePaths)
        },
      },
    },
  })
}
