import React, { FC } from 'react'

import { UpdateList as UpdateListType } from '@components/list/ListTypes'

import SmartLink from '@components/link/SmartLink'
import { MarkdownContent } from '@components/markdown/MarkdownContent'

type Props = {
  list: UpdateListType
}

const LinkList: FC<Props> = ({ list: { title, visibleCount, updates } }) => {
  // todo: sort by update data & pinned
  // todo: limit by visibleCount

  return (
    <div>
      <h2 className="text-center text-3xl text-navy-700 mt-2">{title}</h2>
      <ol className="p-4">
        {updates.map(({ title, date, content }) => (
          <li className="p-7">
            <h3 className="text-center text-2xl">{title}</h3>
            <p className="py-4 text-center">{date}</p>
            <div className="w-full">
              <article className="prose mx-auto mb-4 max-w-xl py-2 text-center  text-gray-800 sm:text-lg">
                <MarkdownContent content={content} />
              </article>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default LinkList
