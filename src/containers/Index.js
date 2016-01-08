import React, { Component, PropTypes } from 'react'
import { setInput as _setInput } from 'redux/modules/input'
import { keyPressed as _keyPressed } from 'redux/modules/events'
import connect from 'helpers/connectAndTheme'
import CalculationInput from 'components/CalculationInput'
import CalculationsList from 'components/CalculationsList'
import { calculationsSelector, inputSelector } from 'redux/selectors'
import Flex from 'containers/Flex'
import pureRender from 'helpers/pureRender'

const _styles = (theme) => {
  return {
    resultsWrapper: {
      overflow: 'auto',
      backgroundColor: theme.colors.canvasDark,
      borderRadius: '2px 2px 0 0'
    },
    inputWrapper: {
      backgroundColor: theme.colors.canvasDark,
      borderRadius: '0 0 2px 2px'
    },
    margin: {
      borderRight: `1px solid ${theme.colors.border}`,
      width: '40px',
      minWidth: '40px'
    },
    inputBox: {
      borderTop: `1px solid ${theme.colors.lightBorder}`
    }
  }
}

export class Index extends Component {
  static propTypes = {
    calculations: PropTypes.array.isRequired,
    input: PropTypes.string.isRequired,
    keyPressed: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  }

  render() {
    const {
      calculations,
      keyPressed,
      input,
      setInput,
      theme
    } = this.props
    const styles = _styles(theme)

    return (
      <Flex preset="box" theme={theme} vertical inner gutterRight nowrap>
        <Flex preset="box" theme={theme} fullWidth gutter style={styles.resultsWrapper}>
          <Flex preset="content" theme={theme} inner nogrow style={styles.margin} />
          <Flex preset="content" theme={theme} gutter inner style={styles.resultsBox}>
            <CalculationsList calculations={calculations} theme={theme} />
          </Flex>
        </Flex>
        <Flex preset="box" theme={theme} fullWidth gutterLeft nogrow style={styles.inputWrapper}>
          <Flex preset="content" theme={theme} nogrow style={styles.margin} />
          <Flex preset="content" theme={theme} gutter style={styles.inputBox}>
            <CalculationInput
              input={input}
              onChange={setInput}
              onKeyPress={keyPressed}
              onPaste={(event) => event.preventDefault()}
              theme={theme}
            />
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

const selectors = {
  calculations: calculationsSelector,
  input: inputSelector
}

export default connect(
  selectors,
  { keyPressed: _keyPressed, setInput: _setInput }
)(pureRender(Index))
