import { FC } from 'react'

import { LinksList as LinksListType } from '../../types/list.d'

import SmartLink from '@components/link/SmartLink'

type Props = {
  list: LinksListType
}

const LinksList: FC<Props> = ({ list: { title, links } }) => {
  return (
    <div>
      {/*
        NOTE: depreciating titles here
              preferred way is to use '/src/components/section/blocks/BlockLinksList.tsx'
              which will render the title as a title block
      */}
      {title && (
        <h2 className="text-center text-3xl text-navy-700 mt-2">{title}</h2>
      )}
      <dl className="p-4">
        {links.map(({ label, url, description }, i) => (
          <div className="p-7" key={i}>
            <dt className="text-center text-2xl">
              <SmartLink className="link" href={url}>
                {label}
              </SmartLink>
            </dt>
            <dd className="prose mx-auto mb-4 max-w-xl py-2 text-center">
              {description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default LinksList
