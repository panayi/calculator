import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import { propsChanged } from 'helpers/pureFunctions'

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
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['calculation'], this.props, nextProps)
  }

  componentDidUpdate() {
    this.refs.input.focus()
  }

  render() {
    const { calculation, onChange, onKeyPress, onPaste } = this.props
    const renderedOutput = R.cond([
      [R.prop('isError'), R.always('Ans = ERROR')],
      [R.compose(R.isEmpty, R.defaultTo(''), R.prop('output')), R.always('')],
      [R.T, R.compose(R.concat('Ans = '), R.prop('output'))]
    ])(calculation)

    return (
      <div className="calculate">
        <span className="calculate__output">{renderedOutput}</span>
        <input
          type="text"
          className="calculate__input"
          ref="input"
          value={calculation.input}
          onKeyPress={onKeyPress}
          onChange={(event) => { onChange(event.target.value) }}
          onPaste={onPaste}
          placeholder="Enter an expression to calculate"
        />
      </div>
    )
  }
}
