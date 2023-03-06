import { FC } from 'react'
import { BlockUpdatesList as BlockUpdatesListType } from '../../../types/generic-page.d'
import UpdatesList from '../../list/UpdatesList'
import { BlockTitle } from './BlockTitle'

type BlockTextProps = {
  block: BlockUpdatesListType
  className?: string | undefined
}

// TODO: eventually just show this using the timeline component...
export const BlockUpdatesList: FC<BlockTextProps> = ({ block, className }) => {
  return (
    <>
      {block.title && (
        <BlockTitle className={className} block={{ text: block.title }} />
      )}
      <div className={`${className}`}>
        {/* NOTE: we're intentionally dropping the title so it doesn't get repeated */}
        <UpdatesList list={{ visibleCount: 10, updates: block.updates }} />
      </div>
    </>
  )
}
