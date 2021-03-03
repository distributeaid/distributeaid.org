import React from 'react'

import 'stylesheets/index.css'

import NavMain from 'components/NavMain'

class DefaultLayout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <NavMain />
        {children}
      </div>
    )
  }
}

export default DefaultLayout
