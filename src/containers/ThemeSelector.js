import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { setTheme as _setTheme } from 'redux/modules/theme'

export class ThemeSelector extends Component {
  static propTypes = {
    children: PropTypes.node,
    setTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  }

  shouldComponentUpdate = shouldPureComponentUpdate

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
)(ThemeSelector)
