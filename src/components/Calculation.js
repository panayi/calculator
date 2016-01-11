import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

const _styles = (theme) => {
  return {
    result: {
      paddingTop: theme.gutters.small,
      paddingBottom: theme.gutters.small
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

export default class Calculation extends Component {
  static propTypes = {
    calculation: PropTypes.shape({
      input: PropTypes.string,
      output: PropTypes.number
    }).isRequired,
    theme: PropTypes.object.isRequired
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  render() {
    const { calculation, theme } = this.props
    const styles = _styles(theme)

    return (
      <div style={styles.result}>
        <div style={styles.resultOutput}>{calculation.output}</div>
        <div style={styles.resultInput}>= {calculation.input}</div>
      </div>
    )
  }
}
