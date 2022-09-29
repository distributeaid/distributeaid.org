import React, { FC } from 'react'

import { LinkList as LinkListType } from '@components/list/ListTypes'

import SmartLink from '@components/link/SmartLink'

type Props = {
  list: LinkListType
}

const LinkList: FC<Props> = ({ list: { title, links } }) => {
  return (
    <div>
      <h2 className="text-center text-3xl text-navy-700 mt-2">{title}</h2>
      <dl className="p-4">
        {links.map(({ label, url, description }) => (
          <div className="p-7">
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

export default LinkList
