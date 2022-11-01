import { FC } from 'react'

import { BlockText as BlockTextType } from '../../../types/generic-page.d'

import { MarkdownContent } from '../../markdown/MarkdownContent'

type BlockTextProps = {
  block: BlockTextType
}

export const BlockText: FC<BlockTextProps> = ({ block }) => {
  return <MarkdownContent content={block.text} />
}
