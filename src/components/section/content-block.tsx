import { FC } from 'react'

import {
  Block as BlockType,
  BlockText as BlockTextType,
  BlockTitle as BlockTitleType,
} from '../../types/generic-page.d'

type BlocksProps = {
  blocks: BlockType[]
}

export const Blocks: FC<BlocksProps> = ({ blocks }) => {
  const blockElems = blocks.map((block, i) => <Block key={i} block={block} />)

  return <>{blockElems}</>
}

type BlockProps = {
  block: BlockType
}

export const Block: FC<BlockProps> = ({ block }) => {
  switch (block.internal.type) {
    case 'DABlockTitle':
      return <BlockTitle block={block as BlockTitleType} />
    case 'DABlockText':
      return <BlockText block={block as BlockTextType} />

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
        `Could not render block of unkown type "${block.internal.type}".  Recommended fix: 1) stub it out here and return null, 2) define the component and include it here as a case to render, or 3) exclude the block data from being added in the "deriveBlockNode" function in "/gatsby/generic-page/blocks"`,
      )
  }
}

type BlockTitleProps = {
  block: BlockTitleType
}

export const BlockTitle: FC<BlockTitleProps> = ({ block }) => {
  return <h3>Block Title - {block.text}</h3>
}

type BlockTextProps = {
  block: BlockTextType
}

export const BlockText: FC<BlockTextProps> = ({ block }) => {
  console.log(block)
  return <p>Block Text - {block.text}</p>
}
