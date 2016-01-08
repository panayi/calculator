import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setTheme as _setTheme } from 'redux/modules/theme'
import pureRender from 'helpers/pureRender'

export class ThemeSelector extends Component {
  static propTypes = {
    children: PropTypes.node,
    setTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  }

  render() {
    const { children, theme, setTheme } = this.props

    return (
      <div onClick={() => setTheme(theme)}>
        {children}
      </div>
    )
  }
}

export default connect(
  null,
  { setTheme: _setTheme }
)(pureRender(ThemeSelector))
