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
      {/* TODO: replace w/ <BlockTitle> once that no longer needs a full Node */}
      {block.title && <BlockTitle block={{ text: block.title }} />}
      <div className={`${className} border-l-2 pl-4 border-navy-400`}>
        {/* NOTE: we're intentionally dropping the title so it doesn't get repeated */}
        <LinksList list={{ links: block.links }} />
      </div>
    </>
  )
}
