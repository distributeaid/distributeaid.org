import React, { FC } from 'react'

import { UpdateList as UpdateListType } from '@components/list/ListTypes'

import SmartLink from '@components/link/SmartLink'
import MarkdownContent from '@components/markdown/MarkdownContent'

type Props = {
  list: UpdateListType
}

const LinkList: FC<Props> = ({ list: { title, visibleCount, updates } }) => {
  // todo: sort by update data & pinned
  // todo: limit by visibleCount

  return (
    <div>
      <h2>{title}</h2>
      <ol>
        {updates.map(({ title, date, content }) => (
          <li>
            <h3>{title}</h3>
            <p>{date}</p>
            <MarkdownContent content={content} />
          </li>
        ))}
      </ol>
    </div>
  )
}

export default LinkList
