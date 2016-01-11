import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import {
  currentCalculationSelector,
  previousCalculationsSelector
} from 'redux/selectors'
import { keyPressed as _keyPressed } from 'redux/modules/events'
import { updateCalculation as _updateCalculation } from 'redux/modules/calculations'
import Calculate from 'components/Calculate'
import CalculationsList from 'components/CalculationsList'
import connect from 'helpers/connectAndTheme'
import Flex from 'containers/Flex'

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
    currentCalculation: PropTypes.object.isRequired,
    keyPressed: PropTypes.func.isRequired,
    previousCalculations: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    updateCalculation: PropTypes.func.isRequired
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  render() {
    const {
      previousCalculations,
      keyPressed,
      currentCalculation,
      updateCalculation,
      theme
    } = this.props
    const styles = _styles(theme)

    return (
      <Flex preset="box" theme={theme} vertical inner gutterRight nowrap>
        <Flex preset="box" theme={theme} fullWidth gutter style={styles.resultsWrapper}>
          <Flex preset="content" theme={theme} inner nogrow style={styles.margin} />
          <Flex preset="content" theme={theme} gutter inner style={styles.resultsBox}>
            <CalculationsList calculations={previousCalculations} theme={theme} />
          </Flex>
        </Flex>
        <Flex preset="box" theme={theme} fullWidth gutterLeft nogrow style={styles.inputWrapper}>
          <Flex preset="content" theme={theme} nogrow style={styles.margin} />
          <Flex preset="content" theme={theme} gutter style={styles.inputBox}>
            <Calculate
              calculation={currentCalculation}
              onChange={updateCalculation}
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
  currentCalculation: currentCalculationSelector,
  previousCalculations: previousCalculationsSelector
}
const actions = {
  keyPressed: _keyPressed,
  updateCalculation: _updateCalculation
}
export default connect(selectors, actions)(Index)
