import { CreateNodeArgs } from 'gatsby'
import { getArrayProperty } from '../utils/untypedAccess/getArrayProperty'
import { deriveSectionNodes } from './sections'

import { PageGenericNodeInput } from '../../src/types/generic-page.d'

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
  createNodeArgs: CreateNodeArgs,
) => PageGenericNodeInput

export const deriveGenericPageNode: DerivePageFn = (
  page,
  parentId,
  createNodeArgs,
) => {
  const { createNodeId, createContentDigest, reporter } = createNodeArgs

  const sections = deriveSectionNodes(
    getArrayProperty(page, 'sections'),
    parentId,
    createNodeArgs,
  )

  if (sections.length === 0) {
    reporter.panic(
      new Error(`Page title="${page.title}" is empty after processsing.`),
    )
  }

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
