import { FC } from 'react'

import { UpdatesList as UpdatesListType } from '../../types/list.d'

import { MarkdownContent } from '@components/markdown/MarkdownContent'

type Props = {
  list: UpdatesListType
}

const LinksList: FC<Props> = ({ list: { title, visibleCount, updates } }) => {
  // todo: sort by update data & pinned
  // todo: limit by visibleCount

  return (
    <div>
      <h2 className="text-center text-3xl text-navy-700 mt-2">{title}</h2>
      <ol className="p-4">
        {updates.map(({ title, date, content }, i) => (
          <li className="p-7" key={i}>
            <h3 className="text-center text-2xl">{title}</h3>
            <p className="py-4 text-center">{new Date(date).toUTCString()}</p>
            <div className="w-full">
              <article className="prose mx-auto mb-4 max-w-xl py-2 text-center text-gray-800 sm:text-lg">
                <MarkdownContent content={content} />
              </article>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default LinksList
