import { FC } from 'react'

import {
  BlockNode,
  BlockTextNode,
  BlockTitleNode,
} from '../../types/generic-page.d'

import { BlockText } from './blocks/BlockText'
import { BlockTitle } from './blocks/BlockTitle'

type BlocksProps = {
  blocks: BlockNode[]
}

export const Blocks: FC<BlocksProps> = ({ blocks }) => {
  const blockElems = blocks.map((block, i) => <Block key={i} block={block} />)

  return <>{blockElems}</>
}

type BlockProps = {
  block: BlockNode
}

export const Block: FC<BlockProps> = ({ block }) => {
  switch (block.internal.type) {
    case 'DABlockTitle':
      return <BlockTitle block={block as BlockTitleNode} />
    case 'DABlockText':
      return <BlockText block={block as BlockTextNode} />

    // wishlist
    case 'DABlockYoutube':
      return null
    case 'DABlockTimeline':
      return null
    case 'DABlockImage':
      return null
    case 'DABlockCard':
      return null

    default:
      throw new Error(
        `Could not render block of unknown type "${block.internal.type}".  Recommended fix: 1) stub it out here and return null, 2) define the component and include it here as a case to render, or 3) exclude the block data from being added in the "deriveBlockNode" function in "/gatsby/generic-page/blocks"`,
      )
  }
}
