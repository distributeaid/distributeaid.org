import { CreateNodeArgs, NodeInput } from 'gatsby'

import { Layout, Margin, Order } from '../../src/types/generic-page.d'

import { getArrayProperty } from '../utils/untypedAccess/getArrayProperty'
import { getNumberProperty } from '../utils/untypedAccess/getNumberProperty'
import { getObjectProperty } from '../utils/untypedAccess/getObjectProperty'
import { getStringProperty } from '../utils/untypedAccess/getStringProperty'

import { deriveBlockNodes } from './content-blocks'

export const schema = `
  union DASectionTypes = DASectionGrid

  type DASectionGrid implements Node {
    options: DASectionGridOptions!
    blocks: [DABlockTypes!]!
  }

  type DASectionGridOptions {
    rows: Int
    cols: Int
    margin: DASectionGridMargin
    layout: DASectionGridLayout
    order: DASectionGridOrder
  }

  enum DASectionGridMargin {
    MARGIN
    BANNER
  }

  enum DASectionGridLayout {
    COL
    ROW
  }

  enum DASectionGridOrder {
    HORIZONTAL
    VERTICAL
    RANDOM
  }
`

type DeriveSectionsFn = (
  sections: Record<string, any>[],
  parentId: string,
  { createNodeId, createContentDigest }: CreateNodeArgs,
) => NodeInput[]

export const deriveSectionNodes: DeriveSectionsFn = (sections, ...args) => {
  return sections.reduce((derivedSections: NodeInput[], section) => {
    const derivedSection = deriveSectionNode(section, ...args)
    if (derivedSection) {
      derivedSections.push(derivedSection)
    }
    return derivedSections
  }, [])
}

type DeriveSectionFn = (
  section: Record<string, any>,
  parentId: string,
  { createNodeId, createContentDigest }: CreateNodeArgs,
) => NodeInput | null

export const deriveSectionNode: DeriveSectionFn = (...args) => {
  const section = args[0]
  const { reporter } = args[2]
  const sectionType = getStringProperty(section, 'template')

  switch (sectionType) {
    case 'section-grid':
      return deriveGridSectionNode(...args)

    default:
      reporter.warn(`Unkown Content Block type: "${sectionType}"`)
      return null
  }
}

export const deriveGridSectionNode: DeriveSectionFn = (
  section,
  parentId,
  args,
) => {
  const { createNodeId, createContentDigest } = args

  const blocksData = getArrayProperty(section, 'contentBlocks')
  const blocks = deriveBlockNodes(blocksData, parentId, args)

  const meta = getObjectProperty(section, 'metadata')
  const margin = deriveGridSectionMargin(getStringProperty(meta, 'margins'))
  const layout = deriveGridSectionLayout(
    getStringProperty(meta, 'colOrRowBound'),
  )
  const order = deriveGridSectionOrder(getStringProperty(meta, 'order'))

  let rows = meta.numRows ? getNumberProperty(meta, 'numRows') : 1
  if (rows <= 0) {
    rows = 1
  }

  let cols = meta.numCols ? getNumberProperty(meta, 'numCols') : 1
  if (cols <= 0) {
    cols = 1
  }

  return {
    // node data
    blocks,
    options: {
      rows,
      cols,
      margin,
      layout,
      order,
    },

    // Gatsby Fields
    id: createNodeId(`DASectionGrid - ${JSON.stringify(blocks)}`),
    parent: parentId,
    children: [],
    internal: {
      type: 'DASectionGrid',
      contentDigest: createContentDigest(JSON.stringify(blocks)),
    },
  }
}

const deriveGridSectionMargin = (margin: string) => {
  switch (margin) {
    case 'Margined':
      return Margin.MARGIN
    case 'Banner':
      return Margin.BANNER
    default:
      return Margin.BANNER
  }
}

const deriveGridSectionLayout = (layout: string) => {
  switch (layout) {
    case 'Row-Bound':
      return Layout.ROW
    case 'Column-Bound':
      return Layout.COL
    default:
      return Layout.ROW
  }
}

const deriveGridSectionOrder = (order: string) => {
  switch (order) {
    case 'left-to-right':
      return Order.HORIZONTAL
    case 'top-to-bottom':
      return Order.VERTICAL
    case 'random':
      return Order.RANDOM
    default:
      return Order.HORIZONTAL
  }
}
