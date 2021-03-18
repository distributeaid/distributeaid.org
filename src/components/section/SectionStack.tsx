import { FunctionComponent } from 'react'

interface Props {
  section: {
    title: string
    slug: string
    flavor: string
  }
  children: any
}

const SectionStack: FunctionComponent<Props> = ({ section, children }) => {
  return (
    <section id={section.slug} className={section.flavor}>
      <h2>{section.title}</h2>
      {children}
    </section>
  )
}

export default SectionStack
