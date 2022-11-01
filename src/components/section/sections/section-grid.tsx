import { FC, ReactNode } from 'react'

import {
  Layout,
  Margin,
  SectionGrid as SectionGridType,
  SectionGridOptions,
} from '../../../types/generic-page.d'

type SectionGridProps = {
  section: SectionGridType
  children: ReactNode
}

export const SectionGrid: FC<SectionGridProps> = ({
  section: { options },
  children,
}) => {
  let classes: string[] = ['prose']
  classes = classes.concat(getMarginClasses(options))
  classes = classes.concat(getLayoutClasses(options))

  return <section className={classes.join(' ')}>{children}</section>
}

const getMarginClasses = (options: SectionGridOptions): string[] => {
  switch (options.margin) {
    case Margin.BANNER:
      return ['no-max-w']
    case Margin.MARGIN:
      return ['mx-auto']
    default:
      return ['mx-auto']
  }
}

const getLayoutClasses = (options: SectionGridOptions) => {
  switch (options.layout) {
    case Layout.ROW:
      return ['flex flex-row']
    case Layout.COL:
      return ['flex flex-col']
    default:
      return ['flex flex-row']
  }
}
