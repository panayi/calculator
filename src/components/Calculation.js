import React, { Component, PropTypes } from 'react'
import { propsChanged } from 'helpers/pureFunctions'
import Flex from 'components/Flex'

export default class Calculation extends Component {
  static propTypes = {
    calculation: PropTypes.shape({
      input: PropTypes.string,
      output: PropTypes.number
    }).isRequired,
    onPointerClick: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['calculation'], this.props, nextProps)
  }

  render() {
    const { calculation, onPointerClick } = this.props

    return (
      <Flex preset="box" inner="small" nowrap>
        <Flex className="calculation__pointer" preset="content" gutter="small"
          inner="small" nogrow
        >
          <span onClick={onPointerClick}>—</span>
        </Flex>
        <Flex preset="content" gutter>
          <div>
            <div className="calculation__output">{calculation.output}</div>
            <div className="calculation__input">= {calculation.input}</div>
          </div>
        </Flex>
      </Flex>
    )
  }
}
