import { render } from '@testing-library/react'
import {
  SectionGridNode,
  SectionGridOptionLayout,
  SectionGridOptionMargin,
  SectionGridOptionOrder,
} from '../../../types/generic-page.d'
import { getClasses, SectionGrid } from './SectionGrid'

let section: SectionGridNode

describe('SectionGrid', () => {
  beforeEach(() => {
    section = {
      options: {
        rows: 1,
        cols: 1,
        margin: SectionGridOptionMargin.MARGIN,
        layout: SectionGridOptionLayout.COL,
        order: SectionGridOptionOrder.RANDOM,
      },
    } as SectionGridNode
  })

  it('renders the section with content blocks', () => {
    const { getByText } = render(
      <SectionGrid section={section}>
        <>
          <h2>My Title</h2>
          <p>My text.</p>
        </>
      </SectionGrid>,
    )

    const title = getByText('My Title')
    expect(title).toBeTruthy()

    const text = getByText('My text.')
    expect(text).toBeTruthy()
  })

  it('provides different margins', () => {
    let classes: string

    section.options.margin = SectionGridOptionMargin.MARGIN
    classes = getClasses(section.options)
    expect(classes).not.toContain('max-w-none')

    section.options.margin = SectionGridOptionMargin.BANNER
    classes = getClasses(section.options)
    expect(classes).toContain('max-w-none')
  })

  it('provides different layouts', () => {
    let classes: string

    section.options.layout = SectionGridOptionLayout.ROW
    classes = getClasses(section.options)
    expect(classes).toContain('flex-row')

    section.options.layout = SectionGridOptionLayout.COL
    classes = getClasses(section.options)
    expect(classes).toContain('flex-col')
  })

  test.todo('provides different orders')

  it('includes custom classes', () => {
    section.options.layout = SectionGridOptionLayout.ROW
    const classes = getClasses(section.options, 'custom-class another-one')
    expect(classes).toContain('custom-class')
    expect(classes).toContain('another-one')
  })
})
