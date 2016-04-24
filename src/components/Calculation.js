import React, { Component, PropTypes } from 'react'
import { propsChanged } from 'helpers/pureFunctions'
import Flex from 'components/Flex'

export default class Calculation extends Component {
  static propTypes = {
    calculation: PropTypes.shape({
      input: PropTypes.string,
      output: PropTypes.number
    }).isRequired,
    deleteCalculation: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['calculation', 'index'], this.props, nextProps)
  }

  handleClick() {
    const { deleteCalculation, index } = this.props
    deleteCalculation(index)
  }

  render() {
    const { calculation } = this.props

    return (
      <Flex preset="box" inner="small" nowrap>
        <Flex className="calculation__pointer" preset="content" gutter="xsmall"
          inner="xsmall" nogrow
        >
          <span onClick={this.handleClick}>—</span>
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
