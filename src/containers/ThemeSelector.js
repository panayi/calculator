import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { propsChanged } from 'helpers/pureFunctions'
import { setTheme as _setTheme } from 'redux/modules/theme'

export class ThemeSelector extends Component {
  static propTypes = {
    children: PropTypes.node,
    setTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['children', 'theme'], this.props, nextProps)
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
)(ThemeSelector)
