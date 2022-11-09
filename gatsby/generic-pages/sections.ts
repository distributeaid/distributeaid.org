import { CreateNodeArgs } from 'gatsby'

import {
  SectionGridOptionLayout,
  SectionGridOptionMargin,
  SectionGridOptionOrder,
  SectionNodeInput,
} from '../../src/types/generic-page.d'

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
  createNodeArgs: CreateNodeArgs,
) => SectionNodeInput[]

export const deriveSectionNodes: DeriveSectionsFn = (
  sections,
  parentId,
  createNodeArgs,
) => {
  return sections.reduce((derivedSections: SectionNodeInput[], section, i) => {
    const { reporter } = createNodeArgs
    const derivedSection = deriveSectionNode(section, parentId, createNodeArgs)
    if (derivedSection && derivedSection.blocks.length === 0) {
      reporter.warn(`Dropping empty section: #${i}`)
    } else if (derivedSection) {
      derivedSections.push(derivedSection)
    }
    return derivedSections
  }, [])
}

type DeriveSectionFn = (
  section: Record<string, any>,
  parentId: string,
  createNodeArgs: CreateNodeArgs,
) => SectionNodeInput | null

export const deriveSectionNode: DeriveSectionFn = (
  section,
  parentId,
  createNodeArgs,
) => {
  const { reporter } = createNodeArgs
  const sectionType = getStringProperty(section, 'template')

  switch (sectionType) {
    case 'section-grid':
      return deriveGridSectionNode(section, parentId, createNodeArgs)

    default:
      reporter.warn(`Dropping unkown section: type="${sectionType}"`)
      return null
  }
}

export const deriveGridSectionNode: DeriveSectionFn = (
  section,
  parentId,
  createNodeArgs,
) => {
  const { createNodeId, createContentDigest } = createNodeArgs

  const blocksData = getArrayProperty(section, 'contentBlocks')
  const blocks = deriveBlockNodes(blocksData, parentId, createNodeArgs)

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
      return SectionGridOptionMargin.MARGIN
    case 'Banner':
      return SectionGridOptionMargin.BANNER
    default:
      return SectionGridOptionMargin.BANNER
  }
}

const deriveGridSectionLayout = (layout: string) => {
  switch (layout) {
    case 'Row-Bound':
      return SectionGridOptionLayout.ROW
    case 'Column-Bound':
      return SectionGridOptionLayout.COL
    default:
      return SectionGridOptionLayout.ROW
  }
}

const deriveGridSectionOrder = (order: string) => {
  switch (order) {
    case 'left-to-right':
      return SectionGridOptionOrder.HORIZONTAL
    case 'top-to-bottom':
      return SectionGridOptionOrder.VERTICAL
    case 'random':
      return SectionGridOptionOrder.RANDOM
    default:
      return SectionGridOptionOrder.HORIZONTAL
  }
}
