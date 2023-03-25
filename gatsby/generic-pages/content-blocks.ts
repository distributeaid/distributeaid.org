import { CreateNodeArgs } from 'gatsby'
import { getArrayProperty } from '../utils/untypedAccess/getArrayProperty'
import { getDateProperty } from '../utils/untypedAccess/getDateProperty'
import { getStringProperty } from '../utils/untypedAccess/getStringProperty'

import { BlockNodeInput } from '../../src/types/generic-page.d'

export const schema = `
  union DABlockTypes =
    DABlockTitle |
    DABlockText |
    DABlockImage |
    DABlockYoutube |
    DABlockTimeline

  type DABlockTitle implements Node {
    text: String!
  }

  type DABlockText implements Node {
    text: String!
  }

  type DABlockImage implements Node {
    asset: String!
    caption: String
    attribution: String!
    dateUploaded: Date
    date: Date
    altText: String!
    tags: [String!]!

    alignmentPhoto: String
    alignmentCaption: String
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
    desc: String
  }
`

type DeriveBlocksFn = (
  blocks: Record<string, any>[],
  parentId: string,
  createNodeArgs: CreateNodeArgs,
) => BlockNodeInput[]

export const deriveBlockNodes: DeriveBlocksFn = (
  blocks,
  parentId,
  createNodeArts,
) => {
  return blocks.reduce((derivedBlocks: BlockNodeInput[], block) => {
    const derivedBlock = deriveBlockNode(block, parentId, createNodeArts)
    if (derivedBlock) {
      derivedBlocks.push(derivedBlock)
    }
    return derivedBlocks
  }, [])
}

type DeriveBlockFn = (
  block: Record<string, any>,
  parentId: string,
  createNodeArgs: CreateNodeArgs,
) => BlockNodeInput | null

export const deriveBlockNode: DeriveBlockFn = (
  block,
  parentId,
  createNodeArgs,
) => {
  const { reporter } = createNodeArgs
  const blockType = getStringProperty(block, 'template')

  switch (blockType) {
    case 'block-title':
      return deriveTitleBlockNode(block, parentId, createNodeArgs)

    case 'block-text':
      return deriveTextBlockNode(block, parentId, createNodeArgs)

    case 'block-image-with-caption':
      return deriveImageBlockNode(block, parentId, createNodeArgs)

    case 'block-youtube-embed':
      return deriveYoutubeBlockNode(block, parentId, createNodeArgs)

    case 'block-timeline':
      return deriveTimelineBlockNode(block, parentId, createNodeArgs)

    default:
      reporter.warn(`Dropping unknown content block: type="${blockType}"`)
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

export const deriveImageBlockNode: DeriveBlockFn = (
  block,
  parentId,
  { createNodeId, createContentDigest },
) => {
  const altText = getStringProperty(block, 'altText')
  return {
    asset: getStringProperty(block, 'asset'),
    caption: getStringProperty(block, 'caption'),
    attribution: getStringProperty(block, 'attribution'),
    dateUploaded: getDateProperty(block, 'dateUploaded'),
    date: block?.date ? getDateProperty(block, 'date') : undefined,
    altText: altText,
    tags: getArrayProperty(block, 'tags'),

    alignmentPhoto: getStringProperty(block, 'alignmentPhoto'),
    alignmentCaption: getStringProperty(block, 'alignmentCaption'),

    // Gatsby Fields
    id: createNodeId(`DABlockImage - ${altText}`),
    parent: parentId,
    children: [],
    internal: {
      type: 'DABlockImage',
      contentDigest: createContentDigest(JSON.stringify(block)),
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
  const entries = getArrayProperty(block, 'timelineItems').map((entry) => {
    return {
      ...entry,
      desc: entry.description,
    }
  })
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
