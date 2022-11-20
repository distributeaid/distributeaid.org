import SmartLink from '@components/link/SmartLink'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { Action, DynamicCardImage } from 'types/card-types'

export enum ImageVariant {
  square,
  circle,
}

/**
 * creates a single SmartLink component
 */
const createAction = (action: Action) => (
  <SmartLink
    key={action.label}
    className="inline-block bg-navy-700 hover:bg-navy-800 rounded text-white px-6 py-3 mt-4 font-medium tracking-wide"
    href={action.url}
  >
    {action.label}
  </SmartLink>
)
export const Card: FC<
  PropsWithChildren<{
    header?: ReactNode // Can be either a StaticImage or anything you want to display in the header
    dynamicCardImage?: DynamicCardImage
    imageVariant?: ImageVariant
    title?: ReactNode
    subtitle?: string
    additionalHeaderContent?: ReactNode | ReactNode[]
    body?: ReactNode
    actions?: Action[]
    transparentBorder?: boolean
    transparentBody?: boolean
    bodyColor?: string
  }>
> = ({
  children,
  header,
  dynamicCardImage,
  imageVariant,
  title,
  subtitle,
  additionalHeaderContent,
  body,
  actions,
  transparentBorder = false,
  transparentBody = false,
  bodyColor,
}) => (
  <section
    className={classNames(
      'border',
      {
        'border-transparent': transparentBorder,
        'bg-transparent': transparentBody,
        'bg-white': !transparentBody,
      },
      bodyColor,
    )}
    data-testid="card"
  >
    {header && header}
    {dynamicCardImage && (
      <div className={imageVariant === ImageVariant.circle ? `p-2` : ''}>
        <GatsbyImage
          data-testid="card-gatsby-image"
          image={dynamicCardImage.image}
          alt={dynamicCardImage.alt}
          className="w-full"
          imgClassName={
            imageVariant === ImageVariant.circle ? `rounded-full` : ''
          }
        ></GatsbyImage>
      </div>
    )}
    <div className="mx-4 my-4">
      <div className="text-center">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
        {additionalHeaderContent && <>{additionalHeaderContent}</>}
        {actions && <>{actions.map(createAction)}</>}
      </div>
      {body && <div className="mt-4">{body}</div>}
    </div>
    {children && <>{children}</>}
  </section>
)
