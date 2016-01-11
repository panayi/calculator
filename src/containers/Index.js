import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import {
  currentCalculationSelector,
  previousCalculationsSelector
} from 'redux/selectors'
import { keyPressed as _keyPressed } from 'redux/modules/events'
import {
  deleteCalculation as _deleteCalculation,
  updateCalculation as _updateCalculation
} from 'redux/modules/calculations'
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
      borderTop: `1px solid ${theme.colors.lightBorder}`,
      borderRadius: '0 0 2px 2px'
    },
    inputBox: {
      width: `calc(100% - ${theme.gutters.xlarge}px)`
    },
    margin: {
      position: 'absolute',
      left: theme.gutters.xlarge,
      height: '100%',
      zIndex: 1,
      borderRight: `1px solid ${theme.colors.border}`
    }
  }
}

export class Index extends Component {
  static propTypes = {
    currentCalculation: PropTypes.object.isRequired,
    deleteCalculation: PropTypes.func.isRequired,
    keyPressed: PropTypes.func.isRequired,
    previousCalculations: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    updateCalculation: PropTypes.func.isRequired
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  render() {
    const {
      currentCalculation,
      deleteCalculation,
      keyPressed,
      previousCalculations,
      updateCalculation,
      theme
    } = this.props
    const styles = _styles(theme)

    return (
      <Flex preset="box" theme={theme} vertical innerMargin gutterRight nowrap>
        <div style={styles.margin} />
        <Flex preset="box" theme={theme} fullWidth style={styles.resultsWrapper}>
          <CalculationsList
            calculations={previousCalculations}
            deleteCalculation={deleteCalculation}
            theme={theme}
          />
        </Flex>
        <Flex preset="box" theme={theme} fullWidth justifyContent="flex-end" nogrow style={styles.inputWrapper}>
          <Flex preset="content" theme={theme} gutter nogrow style={styles.inputBox}>
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
  deleteCalculation: _deleteCalculation,
  keyPressed: _keyPressed,
  updateCalculation: _updateCalculation
}
export default connect(selectors, actions)(Index)
