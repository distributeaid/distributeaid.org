import { FC } from 'react'
import { BlockText as BlockTextType } from '../../../types/generic-page.d'
import { MarkdownContent } from '../../markdown/MarkdownContent'

type BlockTextProps = {
  block: BlockTextType
  className?: string | undefined
}

export const BlockText: FC<BlockTextProps> = ({ block, className }) => {
  return (
    <div className={`${className}`}>
      <MarkdownContent content={block.text} />
    </div>
  )
}
