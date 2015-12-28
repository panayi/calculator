import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions as calculateActions } from 'redux/modules/calculate'
import { actions as keyEventsActions } from 'redux/modules/keyEvents'
import baseThemeVariables from 'themes/_base/variables'
import CalculationInput from 'components/CalculationInput'
import Calculations from 'components/Calculations'
import calculationsSelector from 'redux/selectors/calculations'
import Flex from 'containers/Flex'
import inputSelector from 'redux/selectors/input'
import themeVariablesSelector from 'redux/selectors/themeVariables'

const _styles = (themeVariables) => {
  return {
    resultsBox: {
      overflow: 'auto',
      backgroundColor: themeVariables.colors.canvasDark
    },
    inputBox: {
      backgroundColor: themeVariables.colors.canvasDark,
      borderTop: `1px solid ${themeVariables.colors.border}`
    }
  }
}

export class HomeView extends Component {
  static propTypes = {
    calculate: PropTypes.func,
    calculations: PropTypes.array,
    handleKeyDown: PropTypes.func,
    handleKeyPress: PropTypes.func,
    input: PropTypes.string,
    themeVariables: PropTypes.object
  }

  static defaultProps = {
    themeVariables: baseThemeVariables
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
      themeVariables
    } = this.props
    const styles = _styles(themeVariables)

    return (
      <Flex preset="box" theme={themeVariables} vertical inner gutter nowrap>
        <Flex preset="content" theme={themeVariables} fullWidth gutter inner style={styles.resultsBox}>
          <Calculations
            calculations={calculations}
            themeVariables={themeVariables}
          />
        </Flex>
        <Flex preset="box" theme={themeVariables} fullWidth gutter nogrow style={styles.inputBox}>
          <CalculationInput
            input={input}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            onSubmit={this.handleSubmit.bind(this)}
            themeVariables={themeVariables}
          />
        </Flex>
      </Flex>
    )
  }
}

const selector = createStructuredSelector({
  calculations: calculationsSelector,
  input: inputSelector,
  themeVariables: themeVariablesSelector
})
const actions = R.merge(calculateActions, keyEventsActions)

export default connect(selector, actions)(HomeView)
