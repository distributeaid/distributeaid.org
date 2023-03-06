import { FC } from 'react'
import { BlockTitle as BlockTitleType } from '../../../types/generic-page.d'

type BlockTitleProps = {
  block: BlockTitleType
  className?: string | undefined
}

export const BlockTitle: FC<BlockTitleProps> = ({ block, className }) => {
  return (
    <h2 className={`${className} pl-4 border-l-2 border-navy-600`}>
      {block.text}
    </h2>
  )
}
