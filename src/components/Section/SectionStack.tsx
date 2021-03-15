import React from 'react'

class SectionStack extends React.Component {
  render() {
    const { section, children } = this.props

    return (
      <section id={section.slug} className={section.flavor}>
        <h2>{section.title}</h2>
        {children}
      </section>
    )
  }
}

export default SectionStack
