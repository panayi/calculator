import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import tinycolor from 'tinycolor2'

const _styles = (theme) => {
  return {
    result: {
      paddingTop: theme.gutter * 0.65,
      paddingBottom: theme.gutter * 0.65
    },
    resultOutput: {
      fontSize: theme.fontSizes.xlarge,
    },
    resultInput: {
      fontSize: theme.fontSizes.small,
      color: theme.colors.accent,
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
      color: tinycolor(theme.colors.canvas).setAlpha(0.7).toString(),
    }
  }
}

export default class Calculations extends Component {
  static propTypes = {
    calculations: PropTypes.array,
    theme: PropTypes.object
  }

  static defaultProps = {
    calculations: []
  }

  render() {
    const { calculations, theme } = this.props
    const styles = _styles(theme)

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
