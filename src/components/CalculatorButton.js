import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import tinycolor from 'tinycolor2'
import R from 'ramda'
import pureRender from 'helpers/pureRender'

const _styles = (theme, active) => {
  return R.merge(
    {
      fontSize: '3.3vw',
      width: '3.0vw',
      textAlign: 'center',
      // padding: '0 0.6vw',
      backgroundColor: theme.colors.canvasDark,
      display: 'inline-block',
      margin: '0.5px',
      textDecoration: 'none',
      cursor: 'pointer',
      userSelect: 'none',
      ':hover': {
        color: theme.colors.primary
      }
    },
    (active ? {
      color: theme.colors.accent,
      backgroundColor: tinycolor(theme.colors.canvasDark).darken(12).desaturate(5).setAlpha(0.7).toString(),
      ':hover': {
        color: theme.colors.accent
      }
    } : {})
  )
}

class CalculatorButton extends Component {
  static propTypes = {
    theKey: PropTypes.shape({
      keyCode: PropTypes.number.isRequired,
      display: PropTypes.string.isRequired
    }).isRequired,
    theme: PropTypes.object,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const { theKey, onClick, theme } = this.props
    const { active, display } = theKey
    const styles = _styles(theme, active)

    return (
      <a onClick={() => onClick(theKey)} style={styles}>{display}</a>
    )
  }
}

export default Radium(pureRender(CalculatorButton))
