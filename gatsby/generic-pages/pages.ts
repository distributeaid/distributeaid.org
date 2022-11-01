import { CreateNodeArgs, NodeInput } from 'gatsby'
import { getArrayProperty } from '../utils/untypedAccess/getArrayProperty'
import { deriveSectionNodes } from './sections'

export const schema = `
  type DAPageGeneric implements Node @dontInfer {
    title: String!
    slug: String!
    desc: String
    sections: [DASectionTypes!]!
  }
`

type DerivePageFn = (
  page: Record<string, any>,
  parentId: string,
  args: CreateNodeArgs,
) => NodeInput

export const deriveGenericPageNode: DerivePageFn = (page, parentId, args) => {
  const { createNodeId, createContentDigest } = args

  const sections = deriveSectionNodes(
    getArrayProperty(page, 'sections'),
    parentId,
    args,
  )

  return {
    // Node Data
    title: page.title,
    description: page.desc,
    sections: sections,

    // navigation
    slug: page.slug,
    path: `/${page.slug}/`,

    // Gatsby Fields
    id: createNodeId(`DAPageGeneric - ${page.slug}`),
    parent: parentId,
    children: [],
    internal: {
      type: 'DAPageGeneric',
      contentDigest: createContentDigest(page),
    },
  }
}
