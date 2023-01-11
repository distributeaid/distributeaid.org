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
      <dl>
        {links.map(({ label, url, description }, i) => (
          <div className="mb-6 last:mb-0" key={i}>
            <dt>
              <SmartLink className="link" href={url}>
                {label}
              </SmartLink>
            </dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default LinksList
