import { FC } from 'react'

import { BlockTitle as BlockTitleType } from '../../../types/generic-page.d'

type BlockTitleProps = {
  block: BlockTitleType
}

export const BlockTitle: FC<BlockTitleProps> = ({ block }) => {
  return <h2 className="border-l-2 pl-4 border-navy-600">{block.text}</h2>
}
