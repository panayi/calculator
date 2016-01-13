import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import { propsOrStylesChanged } from 'helpers/pureFunctions'

export const _getStyles = function (theme) {
  return {
    base: {
      fontSize: '37px',
      width: '56.5px',
      margin: '0 6px 6px 0',
      padding: '1px 0',
      textAlign: 'center',
      display: 'inline-block',
      cursor: 'pointer',
      userSelect: 'none',
      borderBottom: `5px solid ${theme.colors.canvasDarker}`
    },
    inactive: {
      backgroundColor: theme.colors.canvasDark
    },
    active: {
      color: theme.colors.accent,
      backgroundColor: theme.colors.canvasDarker
    }
  }
}

class Button extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    getStyles: PropTypes.func,
    onClick: PropTypes.func,
    theme: PropTypes.object.isRequired
  };

  static defaultProps = {
    getStyles: _getStyles
  };

  shouldComponentUpdate(nextProps) {
    return propsOrStylesChanged(['active', 'children'], this.props.getStyles,
      this.props, nextProps)
  }

  render() {
    const {
      active,
      children,
      getStyles,
      onClick,
      theme
    } = this.props
    const stateStyles = active ? 'active' : 'inactive'
    const styles = getStyles(theme)

    return (
      <span
        ref="clickTarget"
        onClick={onClick}
        style={[styles.base, styles[stateStyles]]}
      >
        {children}
      </span>
    )
  }
}

export default Radium(Button)
