import { FC, PropsWithChildren } from 'react'

import {
  Section as SectionType,
  SectionGrid as SectionGridType,
} from '../../types/generic-page.d'

import { getBackgroundColor } from '../../utils/site-theme'

import { Blocks } from './content-block'
import { SectionGrid } from './sections/section-grid'

type SectionsProps = PropsWithChildren<{
  sections: SectionType[]
}>

export const Sections: FC<SectionsProps> = ({ sections }) => {
  const sectionElems = sections.map((section, i) => {
    return (
      <Section
        key={i}
        section={section}
        style={{
          backgroundColor: getBackgroundColor(),
        }}
      />
    )
  })

  return <>{sectionElems}</>
}

type SectionProps = {
  section: SectionType
  [key: string]: any
}

export const Section: FC<SectionProps> = ({ section, ...props }) => {
  const blocks = <Blocks blocks={section.blocks} />

  switch (section.internal.type) {
    case 'DASectionGrid':
      return (
        <SectionGrid
          section={section as SectionGridType}
          children={blocks}
          {...props}
        />
      )
    default:
      throw new Error(
        `Could not render section of unkown type "${section.internal.type}".  Recommended fix: 1) stub it out here and return null, 2) define the component and include it here as a case to render, or 3) exclude the section data from being added in the "deriveSectionNode" function in "/gatsby/generic-page/sections"`,
      )
  }
}
