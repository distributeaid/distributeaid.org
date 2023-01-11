import { FC, PropsWithChildren } from 'react'
import {
  SectionGrid as SectionGridType,
  SectionGridOptionLayout,
  SectionGridOptionMargin,
  SectionGridOptions,
} from '../../../types/generic-page.d'

type SectionGridProps = {
  section: SectionGridType
  className?: string
  [key: string]: any
}

export const SectionGrid: FC<PropsWithChildren<SectionGridProps>> = ({
  section: { options, blocks },
  children,
  className,
  ...props
}) => {
  const classes = getClasses(options, className)

  return (
    <section {...props}>
      <div className={classes}>{children}</div>
    </section>
  )
}

export const getClasses = (options: SectionGridOptions, className?: string) => {
  const classes: string[] = []
  classes.push(getMarginClasses(options))
  classes.push(getLayoutClasses(options))
  if (className) {
    classes.push(className)
  }
  return classes.join(' ')
}

const getMarginClasses = (options: SectionGridOptions): string => {
  switch (options.margin) {
    case SectionGridOptionMargin.BANNER:
      return 'mx-8 my-12 max-w-none'
    case SectionGridOptionMargin.MARGIN:
      return 'mx-8 my-12'
    default:
      return 'mx-8 my-12'
  }
}

const getLayoutClasses = (options: SectionGridOptions): string => {
  switch (options.layout) {
    case SectionGridOptionLayout.ROW:
      return 'flex flex-row'
    case SectionGridOptionLayout.COL:
      return 'flex flex-col'
    default:
      return 'flex flex-row'
  }
}
