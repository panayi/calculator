import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import shouldPureComponentUpdate from 'react-pure-render/function'

const _styles = (theme) => {
  return {
    input: {
      background: 'none',
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      fontSize: '20px',
      padding: '16px 0 11px 0',
      width: '100%',
      color: theme.colors.accent
    },
    output: {
      position: 'absolute',
      fontSize: theme.fontSizes.small
    },
    wrapper: {
      position: 'relative'
    }
  }
}

export default class Calculate extends Component {
  static propTypes = {
    calculation: PropTypes.shape({
      input: PropTypes.string,
      output: PropTypes.number,
      isError: PropTypes.boolean
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onPaste: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  render() {
    const { calculation, onChange, onKeyPress, onPaste, theme } = this.props
    const styles = _styles(theme)
    const renderedOutput = R.cond([
      [R.prop('isError'), R.always('Ans = ERROR')],
      [R.compose(R.isEmpty, R.defaultTo(''), R.prop('output')), R.always('')],
      [R.T, R.compose(R.concat('Ans = '), R.prop('output'))]
    ])(calculation)

    return (
      <div style={styles.wrapper}>
        <span style={styles.output}>{renderedOutput}</span>
        <input
          type="text"
          className="calculator-input"
          value={calculation.input}
          onKeyPress={onKeyPress}
          onChange={(event) => { onChange(event.target.value) }}
          onPaste={onPaste}
          placeholder="Enter an expression to calculate"
          style={styles.input}
        />
      </div>
    )
  }
}
