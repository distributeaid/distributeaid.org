import { FC } from 'react'
import {
  BlockLinksList as BlockLinksListType,
  BlockNode,
  BlockText as BlockTextType,
  BlockTitle as BlockTitleType,
  BlockUpdatesList as BlockUpdatesListType,
  BlockYoutube as BlockYoutubeType,
} from '../../types/generic-page.d'
import { BlockLinksList } from './blocks/BlockLinksList'
import { BlockText } from './blocks/BlockText'
import { BlockTitle } from './blocks/BlockTitle'
import { BlockUpdatesList } from './blocks/BlockUpdatesList'
import { BlockYouTube } from './blocks/BlockYouTube'

type BlocksProps = {
  blocks: BlockNode[]
}

export const Blocks: FC<BlocksProps> = ({ blocks }) => {
  const blockElems = blocks.map((block, i) => (
    <Block
      className="mb-8 last:mb-0 border-l-2 pl-4 border-navy-400"
      key={i}
      block={block}
    />
  ))

  return <>{blockElems}</>
}

type BlockProps = {
  block: BlockNode
  className?: string | undefined
}

export const Block: FC<BlockProps> = ({ block, className }) => {
  switch (block.internal.type) {
    case 'DABlockTitle':
      return (
        <BlockTitle block={block as BlockTitleType} className={className} />
      )
    case 'DABlockText':
      return <BlockText block={block as BlockTextType} className={className} />
    case 'DABlockLinksList':
      return (
        <BlockLinksList
          block={block as BlockLinksListType}
          className={className}
        />
      )
    case 'DABlockUpdatesList':
      return (
        <BlockUpdatesList
          block={block as BlockUpdatesListType}
          className={className}
        />
      )
    case 'DABlockYoutube':
      return (
        <BlockYouTube block={block as BlockYoutubeType} className={className} />
      )

    // wishlist
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
