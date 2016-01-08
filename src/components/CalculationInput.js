import React, { Component, PropTypes } from 'react'

const _styles = (theme) => {
  return {
    input: {
      background: 'none',
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      fontSize: '20px',
      padding: '16px 15px 16px 0',
      width: '100%',
      color: theme.colors.accent
    }
  }
}

export default class CalculationInput extends Component {
  static propTypes = {
    input: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onPaste: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  }

  render() {
    const { input, onChange, onKeyPress, onPaste, theme } = this.props
    const styles = _styles(theme)

    return (
      <div>
        <input
          type="text"
          className="calculator-input"
          value={input}
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
