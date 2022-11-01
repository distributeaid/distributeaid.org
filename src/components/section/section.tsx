import { FC } from 'react'

import {
  Section as SectionType,
  SectionGrid as SectionGridType,
} from '../../types/generic-page.d'
import { Blocks } from './content-block'

type SectionsProps = {
  sections: SectionType[]
}

export const Sections: FC<SectionsProps> = ({ sections }) => {
  const sectionElems = sections.map((section, i) => (
    <Section key={i} section={section} />
  ))

  return <>{sectionElems}</>
}

type SectionProps = {
  section: SectionType
}

export const Section: FC<SectionProps> = ({ section }) => {
  switch (section.internal.type) {
    case 'DASectionGrid':
      return <SectionGrid section={section as SectionGridType} />
    default:
      throw new Error(
        `Could not render section of unkown type "${section.internal.type}".  Recommended fix: 1) stub it out here and return null, 2) define the component and include it here as a case to render, or 3) exclude the section data from being added in the "deriveSectionNode" function in "/gatsby/generic-page/sections"`,
      )
  }
}

type SectionGridProps = {
  section: SectionGridType
}

export const SectionGrid: FC<SectionGridProps> = ({ section }) => {
  return (
    <section>
      <h2>Section</h2>
      <Blocks blocks={section.blocks} />
    </section>
  )
}
