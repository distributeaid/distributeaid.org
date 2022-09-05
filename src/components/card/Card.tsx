import SmartLink from '@components/link/SmartLink'
import { Action } from 'types/card-types'
import { FC, PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'

/**
 * creates a single SmartLink component
 */
const createAction = (action: Action) => (
  <SmartLink
    key={action.label}
    className="inline-block bg-navy-700 hover:bg-navy-800 rounded text-white px-6 py-3 mb-1 font-medium tracking-wide"
    href={action.url}
  >
    {action.label}
  </SmartLink>
)
export const Card: FC<
  PropsWithChildren<{
    header?: ReactNode // will be either a StaticImage or GatsbyImage
    title?: string
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
      'border flex flex-col',
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
    <div className="m-3 flex flex-col flex-1">
      <div className="text-center">
        {title && <h2 className="text-xl font-semibold mb-1">{title}</h2>}
        {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
        {additionalHeaderContent && <>{additionalHeaderContent}</>}
        {actions && <>{actions.map(createAction)}</>}
      </div>
      {body && <div className="mt-6 p-2 space-y-2">{body}</div>}
    </div>
    {children && <>{children}</>}
  </section>
)
