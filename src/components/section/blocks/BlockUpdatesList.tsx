import { FC } from 'react'
import { BlockUpdatesList as BlockUpdatesListType } from '../../../types/generic-page.d'
import UpdatesList from '../../list/UpdatesList'
import { BlockTitle } from './BlockTitle'

type BlockTextProps = {
  block: BlockUpdatesListType
}

// TODO: eventually just show this using the timeline component...
export const BlockUpdatesList: FC<BlockTextProps> = ({ block }) => {
  return (
    <>
      {/* TODO: replace w/ <BlockTitle> once that no longer needs a full Node */}
      {block.title && <BlockTitle block={{ text: block.title }} />}
      <div className="border-l-2 pl-4 border-navy-400">
        {/* NOTE: we're intentionally dropping the title so it doesn't get repeated */}
        <UpdatesList list={{ visibleCount: 10, updates: block.updates }} />
      </div>
    </>
  )
}
