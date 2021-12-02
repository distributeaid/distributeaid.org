import { ReactNode } from '@reach/router/node_modules/@types/react'
import React, { FC } from 'react'
import SmartLink from '../link/SmartLink'

type Props = {
  title: ReactNode
  subtitle: ReactNode
  ctaLabel: ReactNode
  ctaUrl: string
  imageSrc: string
}

const RouteCard: FC<Props> = ({
  children,
  title,
  subtitle,
  ctaLabel,
  ctaUrl,
  imageSrc,
}) => (
  <article className="border">
    <img
      src={imageSrc}
      alt=""
      className="mb-4 object-cover w-full"
      style={{ height: 200 }}
    />
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
