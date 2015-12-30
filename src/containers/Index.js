import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { actions as calculateActions } from 'redux/modules/calculate'
import { actions as keyEventsActions } from 'redux/modules/keyEvents'
import { Theme, connect } from 'helpers/connectAndTheme'
import CalculationInput from 'components/CalculationInput'
import Calculations from 'components/Calculations'
import calculationsSelector from 'redux/selectors/calculations'
import Flex from 'containers/Flex'
import inputSelector from 'redux/selectors/input'

const _styles = (theme) => {
  return {
    resultsWrapper: {
      overflow: 'auto',
      backgroundColor: theme.colors.canvasDark,
    },
    inputWrapper: {
      backgroundColor: theme.colors.canvasDark,
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

class Index extends Component {
  static propTypes = {
    calculate: PropTypes.func,
    calculations: PropTypes.array,
    handleKeyDown: PropTypes.func,
    handleKeyPress: PropTypes.func,
    input: PropTypes.string,
    theme: PropTypes.object
  }

  handleSubmit(event) {
    const { calculate, input } = this.props
    event.preventDefault()
    calculate(input)
  }

  render() {
    const {
      calculations,
      handleKeyDown,
      handleKeyPress,
      input,
      theme
    } = this.props
    const styles = _styles(theme)

    return (
      <Flex preset="box" theme={theme} vertical inner gutterRight nowrap>
        <Flex preset="box" theme={theme} fullWidth gutter style={styles.resultsWrapper}>
          <Flex preset="content" theme={theme} inner nogrow style={styles.margin} />
          <Flex preset="content" theme={theme} gutter inner style={styles.resultsBox}>
            <Calculations
              calculations={calculations}
              theme={theme}
            />
          </Flex>
        </Flex>
        <Flex preset="box" theme={theme} fullWidth gutterLeft nogrow style={styles.inputWrapper}>
          <Flex preset="content" theme={theme} nogrow style={styles.margin} />
          <Flex preset="content" theme={theme} gutter style={styles.inputBox}>
            <CalculationInput
              input={input}
              onKeyDown={handleKeyDown}
              onKeyPress={handleKeyPress}
              onSubmit={this.handleSubmit.bind(this)}
              theme={theme}
            />
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

Index = Theme(Index)

const selectors = {
  calculations: calculationsSelector,
  input: inputSelector
}
const actions = R.merge(calculateActions, keyEventsActions)

export default connect(selectors, actions)(Index)

export {
  Index
}
