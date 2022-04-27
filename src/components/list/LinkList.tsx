import React, { FC } from 'react'

import { LinkList as LinkListType } from '@components/list/ListTypes'

import SmartLink from '@components/link/SmartLink'

type Props = {
  list: LinkListType
}

const LinkList: FC<Props> = ({ list: { title, links } }) => {
  return (
    <div>
      <h2>{title}</h2>
      <dl>
        {links.map(({ label, url, description }) => (
          <>
            <dd>
              <SmartLink className="link" href={url}>
                {label}
              </SmartLink>
            </dd>
            <dt>{description}</dt>
          </>
        ))}
      </dl>
    </div>
  )
}

export default LinkList
