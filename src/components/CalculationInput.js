import React, { Component, PropTypes } from 'react'

const _styles = (theme) => {
  return {
    form: {
      width: '100%'
    },
    input: {
      background: 'none',
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      fontSize: '18px',
      padding: '8px 15px 8px 0',
      width: '100%'
    }
  }
}

export default class CalculationInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    input: PropTypes.string,
    themeVariables: PropTypes.object
  }

  render() {
    const { input, onKeyDown, onKeyPress, onSubmit, themeVariables } = this.props
    const styles = _styles(themeVariables)

    return (
      <form onSubmit={onSubmit} style={styles.form}>
        <input
          type="text"
          className="calculator"
          value={input}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onChange={() => { /* silence React warning */ }}
          placeholder="Enter an expression to calculate"
          style={styles.input}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}
