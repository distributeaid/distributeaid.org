import { FC } from 'react'
import { BlockTextNode } from '../../../types/generic-page.d'
import { MarkdownContent } from '../../markdown/MarkdownContent'

type BlockTextProps = {
  block: BlockTextNode
}

export const BlockText: FC<BlockTextProps> = ({ block }) => {
  return (
    <div className="border-l-2 pl-6 border-navy-400">
      <MarkdownContent content={block.text} />
    </div>
  )
}
