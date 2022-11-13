import { FC } from 'react'
import { BlockTitleNode } from '../../../types/generic-page.d'

type BlockTitleProps = {
  block: BlockTitleNode
}

export const BlockTitle: FC<BlockTitleProps> = ({ block }) => {
  return <h2 className="pl-4 border-l-2 border-navy-600">{block.text}</h2>
}
