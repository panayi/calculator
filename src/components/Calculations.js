import React, { Component, PropTypes } from 'react'
import R from 'ramda'

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
        {results}
      </div>
    )
  }
}
