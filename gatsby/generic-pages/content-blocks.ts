import { CreateNodeArgs, NodeInput } from 'gatsby'
import { getArrayProperty } from '../utils/untypedAccess/getArrayProperty'
import { getStringProperty } from '../utils/untypedAccess/getStringProperty'

export const schema = `
  union DABlockTypes =
    DABlockTitle |
    DABlockText |
    DABlockYoutube |
    DABlockTimeline

  type DABlockTitle implements Node {
    text: String!
  }

  type DABlockText implements Node {
    text: String!
  }

  type DABlockYoutube implements Node {
    title: String
    embedUrl: String!
  }

  type DABlockTimeline implements Node {
    entries: [DABlockTimelineEntry!]!
  }

  type DABlockTimelineEntry implements Node {
    period: String
    description: String
  }
`

type DeriveBlocksFn = (
  blocks: Record<string, any>[],
  parentId: string,
  { createNodeId, createContentDigest }: CreateNodeArgs,
) => NodeInput[]

export const deriveBlockNodes: DeriveBlocksFn = (blocks, ...args) => {
  return blocks.reduce((derivedBlocks: NodeInput[], block) => {
    const derivedBlock = deriveBlockNode(block, ...args)
    if (derivedBlock) {
      derivedBlocks.push(derivedBlock)
    }
    return derivedBlocks
  }, [])
}

type DeriveBlockFn = (
  block: Record<string, any>,
  parentId: string,
  { createNodeId, createContentDigest }: CreateNodeArgs,
) => NodeInput | null

export const deriveBlockNode: DeriveBlockFn = (...args) => {
  const block = args[0]
  const { reporter } = args[2]
  const blockType = getStringProperty(block, 'template')

  switch (blockType) {
    case 'block-title':
      return deriveTitleBlockNode(...args)

    case 'block-text':
      return deriveTextBlockNode(...args)

    case 'block-youtube':
      return deriveYoutubeBlockNode(...args)

    case 'block-timeline':
      return deriveTimelineBlockNode(...args)

    case 'block-image-with-caption':
      reporter.warn('Content Block "Image with Caption" not implemented yet.')
      return null

    default:
      reporter.warn(`Unkown Content Block type: "${blockType}"`)
      return null
  }
}

export const deriveTitleBlockNode: DeriveBlockFn = (
  block,
  parentId,
  { createNodeId, createContentDigest },
) => {
  const text = getStringProperty(block, 'text')
  return {
    // node data
    text,

    // Gatsby Fields
    id: createNodeId(`DABlockTitle - ${text}`),
    parent: parentId,
    children: [],
    internal: {
      type: 'DABlockTitle',
      contentDigest: createContentDigest(text),
    },
  }
}

export const deriveTextBlockNode: DeriveBlockFn = (
  block,
  parentId,
  { createNodeId, createContentDigest },
) => {
  const text = getStringProperty(block, 'text')
  return {
    // node data
    text,

    // Gatsby Fields
    id: createNodeId(`DABlockText - ${text}`),
    parent: parentId,
    children: [],
    internal: {
      type: 'DABlockText',
      contentDigest: createContentDigest(text),
    },
  }
}

export const deriveYoutubeBlockNode: DeriveBlockFn = (
  block,
  parentId,
  { createNodeId, createContentDigest },
) => {
  const embedUrl = getStringProperty(block, 'embed')
  return {
    // node data
    title: getStringProperty(block, 'title'),
    embedUrl,

    // Gatsby Fields
    id: createNodeId(`DABlockYoutube - ${embedUrl}`),
    parent: parentId,
    children: [],
    internal: {
      type: 'DABlockYoutube',
      contentDigest: createContentDigest(embedUrl),
    },
  }
}

export const deriveTimelineBlockNode: DeriveBlockFn = (
  block,
  parentId,
  { createNodeId, createContentDigest },
) => {
  const entries = getArrayProperty(block, 'timelineItems')
  return {
    // node data
    entries,

    // Gatsby Fields
    id: createNodeId(`DABlockTimeline - ${JSON.stringify(entries)}`),
    parent: parentId,
    children: [],
    internal: {
      type: 'DABlockTimeline',
      contentDigest: createContentDigest(JSON.stringify(entries)),
    },
  }
}
