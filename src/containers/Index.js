import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  currentCalculationSelector,
  previousCalculationsSelector,
  settingsSelector
} from 'redux/selectors'
import { keyPressed as _keyPressed } from 'redux/modules/events'
import {
  deleteCalculation as _deleteCalculation,
  updateCalculation as _updateCalculation
} from 'redux/modules/calculations'
import { propsChanged } from 'helpers/pureFunctions'
import Author from 'components/Author'
import Calculate from 'components/Calculate'
import CalculationsList from 'components/CalculationsList'
import Flex from 'components/Flex'

export class Index extends Component {
  static propTypes = {
    currentCalculation: PropTypes.object.isRequired,
    deleteCalculation: PropTypes.func.isRequired,
    keyPressed: PropTypes.func.isRequired,
    previousCalculations: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
    updateCalculation: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged([
      'currentCalculation',
      'previousCalculations',
      'settings',
    ], this.props, nextProps)
  }

  render() {
    const {
      currentCalculation,
      deleteCalculation,
      keyPressed,
      previousCalculations,
      updateCalculation,
      settings,
    } = this.props

    return (
      <Flex preset="box" vertical innerMargin gutterRight nowrap>
        <div className="index__margin" />
        <Flex className="index__calculate-wrapper" preset="box" fullWidth nogrow
          justifyContent="flex-end"
        >
          <Flex className="index__calculate" preset="content" gutter nogrow>
            <Calculate
              calculation={currentCalculation}
              onChange={updateCalculation}
              onKeyPress={keyPressed}
              onPaste={function (event) { event.preventDefault() }}
            />
          </Flex>
        </Flex>
        <Flex className="index__calculations" preset="box" fullWidth>
          <CalculationsList
            calculations={previousCalculations}
            deleteCalculation={deleteCalculation}
          />
          <div className="index__author">
            <Author settings={settings} />
          </div>
        </Flex>
      </Flex>
    )
  }
}

const selector = createStructuredSelector({
  currentCalculation: currentCalculationSelector,
  previousCalculations: previousCalculationsSelector,
  settings: settingsSelector
})
const actions = {
  deleteCalculation: _deleteCalculation,
  keyPressed: _keyPressed,
  updateCalculation: _updateCalculation
}
export default connect(selector, actions)(Index)
