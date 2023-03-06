import { FC } from 'react'
import { BlockLinksList as BlockLinksListType } from '../../../types/generic-page.d'
import LinksList from '../../list/LinksList'
import { BlockTitle } from './BlockTitle'

type BlockTextProps = {
  block: BlockLinksListType
  className?: string | undefined
}

export const BlockLinksList: FC<BlockTextProps> = ({ block, className }) => {
  return (
    <>
      {block.title && (
        <BlockTitle className={className} block={{ text: block.title }} />
      )}
      <div className={`${className}`}>
        {/* NOTE: we're intentionally dropping the title so it doesn't get repeated */}
        <LinksList list={{ links: block.links }} />
      </div>
    </>
  )
}
