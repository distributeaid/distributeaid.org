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
  return (
    <div className="flex flex-row flex-wrap justify-items-stretch">
      {sections.map((section, i) => {
        const blockElems = <Blocks blocks={section.blocks} />
        if (blockElems.props.blocks < 1) {
          return null
        }

        return (
          <div
            className="grow basis-1/2"
            style={{
              backgroundColor: getBackgroundColor(),
            }}
          >
            <Section key={i} section={section} className="flex justify-center">
              {blockElems}
            </Section>
          </div>
        )
      })}
    </div>
  )
}

type SectionProps = {
  section: SectionType
  [key: string]: any
}

export const Section: FC<SectionProps> = ({ section, children, ...props }) => {
  switch (section.internal.type) {
    case 'DASectionGrid':
      return (
        <SectionGrid section={section as SectionGridType} {...props}>
          {children}
        </SectionGrid>
      )
    default:
      throw new Error(
        `Could not render section of unkown type "${section.internal.type}".  Recommended fix: 1) stub it out here and return null, 2) define the component and include it here as a case to render, or 3) exclude the section data from being added in the "deriveSectionNode" function in "/gatsby/generic-page/sections"`,
      )
  }
}
