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
    <div className="prose">
      {/*
        NOTE: depreciating titles here
              preferred way is to use '/src/components/section/blocks/BlockLinksList.tsx'
              which will render the title as a title block
      */}
      {title && (
        <h2 className="text-center text-3xl text-navy-700 mt-2">{title}</h2>
      )}
      {updates.map(({ title, date, content }, i) => (
        <article key={i} className="mb-6 last:mb-0">
          <header className="flex justify-between items-start">
            <h4 className="my-0">{title}</h4>
            <p className="mb-0 italic text-gray-600">
              {new Date(date).toLocaleDateString()}
            </p>
          </header>
          <MarkdownContent content={content} />
        </article>
      ))}
    </div>
  )
}

export default LinksList
