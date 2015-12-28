import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as themeActions } from 'redux/modules/theme'

export class ThemeSelector extends Component {
  static propTypes = {
    children: PropTypes.node,
    setTheme: PropTypes.func,
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

export default connect(null, themeActions)(ThemeSelector)
