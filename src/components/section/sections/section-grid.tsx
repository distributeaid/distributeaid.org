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
  const classes: string[] = []
  classes.push(getMarginClasses(options))
  classes.push(getLayoutClasses(options))
  if (props.className) {
    classes.push(props.className)
  }

  return (
    <section {...props}>
      <div className={classes.join(' ')}>{children}</div>
    </section>
  )
}

const getMarginClasses = (options: SectionGridOptions): string => {
  switch (options.margin) {
    case Margin.BANNER:
      return 'mx-8 my-12 max-w-none'
    case Margin.MARGIN:
      return 'mx-8 my-12'
    default:
      return 'mx-8 my-12'
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
