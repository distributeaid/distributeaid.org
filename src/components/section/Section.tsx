import { FC, PropsWithChildren } from 'react'
import {
  SectionGrid as SectionGridType,
  SectionNode,
} from '../../types/generic-page.d'
import { getBackgroundColor } from '../../utils/site-theme'
import { Blocks } from './ContentBlock'
import { SectionGrid } from './sections/SectionGrid'

type SectionsProps = PropsWithChildren<{
  sections: SectionNode[]
}>

export const Sections: FC<SectionsProps> = ({ sections }) => {
  return (
    <div className="flex flex-wrap">
      {sections.map((section, i) => {
        return (
          <div
            key={i}
            className="grow lg:w-1/2"
            style={{
              backgroundColor: getBackgroundColor(),
            }}
          >
            <Section key={i} section={section} className="prose mx-auto" />
          </div>
        )
      })}
    </div>
  )
}

type SectionProps = {
  section: SectionNode
  [key: string]: any
}

export const Section: FC<SectionProps> = ({ section, ...props }) => {
  const blockElems = <Blocks blocks={section.blocks} />
  if (blockElems.props.blocks.length === 0) {
    return null
  }

  switch (section.internal.type) {
    case 'DASectionGrid':
      return (
        <SectionGrid section={section as SectionGridType} {...props}>
          {blockElems}
        </SectionGrid>
      )
    default:
      throw new Error(
        `Could not render section of unkown type "${section.internal.type}".  Recommended fix: 1) stub it out here and return null, 2) define the component and include it here as a case to render, or 3) exclude the section data from being added in the "deriveSectionNode" function in "/gatsby/generic-page/sections"`,
      )
  }
}
