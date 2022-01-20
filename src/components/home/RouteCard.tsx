import { ReactNode } from '@reach/router/node_modules/@types/react'
import React, { FC } from 'react'
import SmartLink from '../link/SmartLink'

type Props = {
  title: ReactNode
  subtitle: ReactNode
  ctaLabel: ReactNode
  ctaUrl: string
  image: ReactNode
}

const RouteCard: FC<Props> = ({
  children,
  title,
  subtitle,
  ctaLabel,
  ctaUrl,
  image,
}) => (
  <article className="border">
    {image}
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-gray-600 mb-6">{subtitle}</p>
      <SmartLink
        className="inline-block bg-navy-700 hover:bg-navy-800 rounded text-white px-6 py-3 font-medium tracking-wide"
        href={ctaUrl}
      >
        {ctaLabel}
      </SmartLink>
    </div>
    <div className="p-4 mt-6 space-y-2">{children}</div>
  </article>
)

export default RouteCard
