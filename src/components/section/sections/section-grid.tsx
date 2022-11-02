import { FC } from 'react'

import {
  Layout,
  Margin,
  SectionGrid as SectionGridType,
  SectionGridOptions,
} from '../../../types/generic-page.d'

type SectionGridProps = {
  section: SectionGridType
  children: JSX.Element
  [key: string]: any
}

export const SectionGrid: FC<SectionGridProps> = ({
  section: { options },
  children,
  ...props
}) => {
  if (!children || children.props.blocks < 1) {
    return null
  }

  const classes: string[] = ['prose']
  classes.push(getMarginClasses(options))
  classes.push(getLayoutClasses(options))

  return (
    <section {...props}>
      <div className={classes.join(' ')}>{children}</div>
    </section>
  )
}

const getMarginClasses = (options: SectionGridOptions): string => {
  switch (options.margin) {
    case Margin.BANNER:
      return 'max-w-none py-16'
    case Margin.MARGIN:
      return 'mx-auto py-16'
    default:
      return 'mx-auto py-16'
  }
}

const getLayoutClasses = (options: SectionGridOptions): string => {
  switch (options.layout) {
    case Layout.ROW:
      return 'flex flex-row'
    case Layout.COL:
      return 'flex flex-col'
    default:
      return 'flex flex-row'
  }
}
