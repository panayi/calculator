import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import tinycolor from 'tinycolor2'
import { mapIndexed } from 'helpers/pureFunctions'
import Calculation from 'components/Calculation'

const _styles = (theme) => {
  return {
    overlay: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      fontSize: '6vw',
      width: '29%',
      height: '29%',
      margin: 'auto',
      textAlign: 'center',
      color: tinycolor(theme.colors.canvas).setAlpha(0.7).toString(),
    }
  }
}

export default class CalculationsList extends Component {
  static propTypes = {
    calculations: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired
  }

  static defaultProps = {
    calculations: []
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  render() {
    const { calculations, theme } = this.props
    const styles = _styles(theme)
    const results = mapIndexed((calculation, index) =>
      <Calculation key={index} calculation={calculation} theme={theme} />
    , calculations)

    return (
      <div>
        <h1 style={styles.overlay}>calculator</h1>
        {results}
      </div>
    )
  }
}
