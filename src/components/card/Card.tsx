import SmartLink from '@components/link/SmartLink'
import { Action } from 'types/card-types'
import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
  header?: ReactNode // will be either a StaticImage or GatsbyImage
  title?: string
  subtitle?: string
  additionalHeaderContent?: ReactNode | ReactNode[]
  body?: ReactNode
  actions?: Action | Action[]
  transparentBorder?: boolean
  transparentBody?: boolean
}

const Card: FC<Props> = (props) => {
  const {
    children,
    header,
    title,
    subtitle,
    additionalHeaderContent,
    body,
    actions,
    transparentBorder = false,
    transparentBody = false,
  } = props

  // creates the SmartLink component/s for action/s
  const createActionLinks = (
    actions: Action | Action[],
  ): JSX.Element | JSX.Element[] => {
    const createAction = (action: Action) => (
      <SmartLink
        className="inline-block bg-navy-700 hover:bg-navy-800 rounded text-white px-6 py-3 mb-1 font-medium tracking-wide"
        href={action.url}
      >
        {action.label}
      </SmartLink>
    )

    if (Array.isArray(actions)) {
      const actionLinks = actions.map((action) => createAction(action))
      return actionLinks
    } else {
      const actionLink = createAction(actions)
      return actionLink
    }
  }

  return (
    <article
      className={`border flex flex-col 
      ${transparentBorder ? 'border-transparent' : null}
      ${transparentBody ? 'bg-transparent' : 'bg-white'}`}
    >
      {header ? header : null}
      <div className="m-3 flex flex-col flex-1">
        {title ? <h2 className="text-xl font-semibold mb-1">{title}</h2> : null}
        {subtitle ? <p className="text-gray-600 mb-6">{subtitle}</p> : null}
        {additionalHeaderContent ? <>{additionalHeaderContent}</> : null}
        {actions ? (
          <div className="self-center p-4">{createActionLinks(actions)}</div>
        ) : null}
        {body ? <div>{body}</div> : null}
      </div>
      {children ? <>{children}</> : null}
    </article>
  )
}

export default Card
