import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import tinycolor from 'tinycolor2'

const _styles = (themeVariables) => {
  return {
    result: {
      paddingTop: themeVariables.gutter * 0.65,
      paddingBottom: themeVariables.gutter * 0.65
    },
    resultOutput: {
      fontSize: themeVariables.fontSizes.xlarge,
    },
    resultInput: {
      fontSize: themeVariables.fontSizes.small,
      color: themeVariables.colors.accent,
      marginTop: '-2px'
    },
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
      color: tinycolor(themeVariables.colors.canvas).setAlpha(0.7).toString(),
    }
  }
}

export default class Calculations extends Component {
  static propTypes = {
    calculations: PropTypes.array,
    themeVariables: PropTypes.object
  }

  static defaultProps = {
    calculations: []
  }

  render() {
    const { calculations, themeVariables } = this.props
    const styles = _styles(themeVariables)

    const mapIndexed = R.addIndex(R.map)
    const results = mapIndexed((calculation, index) => {
      return (
        <div key={index} style={styles.result}>
          <div style={styles.resultOutput}>{calculation.output}</div>
          <div style={styles.resultInput}>= {calculation.input}</div>
        </div>
      )
    }, calculations)

    return (
      <div>
        <h1 style={styles.overlay}>calculator</h1>
        {results}
      </div>
    )
  }
}
