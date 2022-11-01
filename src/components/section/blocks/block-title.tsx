import { FC } from 'react'

import { BlockTitle as BlockTitleType } from '../../../types/generic-page.d'

type BlockTitleProps = {
  block: BlockTitleType
}

export const BlockTitle: FC<BlockTitleProps> = ({ block }) => {
  return <h2>{block.text}</h2>
}
