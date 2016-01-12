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

class CalculatorButton extends Component {
  static propTypes = {
    theKey: PropTypes.shape({
      active: PropTypes.bool,
      display: PropTypes.string.isRequired,
      keyCode: PropTypes.number.isRequired
    }).isRequired,
    getStyles: PropTypes.func,
    theme: PropTypes.object,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    getStyles: _getStyles
  }

  shouldComponentUpdate(nextProps) {
    return propsOrStylesChanged(['theKey'], this.props.getStyles,
      this.props, nextProps)
  }

  render() {
    const {
      getStyles,
      onClick,
      theKey,
      theKey: { active, display },
      theme
    } = this.props
    const stateStyles = active ? 'active' : 'inactive'
    const styles = getStyles(theme)

    return (
      <span onClick={() => onClick(theKey)}
        style={[styles.base, styles[stateStyles]]}
      >
        {display}
      </span>
    )
  }
}

export default Radium(CalculatorButton)
