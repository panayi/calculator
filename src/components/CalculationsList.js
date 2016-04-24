import React, { Component, PropTypes } from 'react'
import { mapIndexed, propsChanged } from 'helpers/pureFunctions'
import Calculation from 'components/Calculation'
import Flex from 'components/Flex'

export default class CalculationsList extends Component {
  static propTypes = {
    calculations: PropTypes.array.isRequired,
    deleteCalculation: PropTypes.func.isRequired,
  };

  static defaultProps = {
    calculations: []
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['calculations'], this.props, nextProps)
  }

  componentDidUpdate() {
    const wrapperNode = this.refs.wrapper
    wrapperNode.scrollTop = 0
  }

  render() {
    const { calculations, deleteCalculation } = this.props
    const results = mapIndexed((calculation, index) =>
      <Calculation
        calculation={calculation}
        deleteCalculation={deleteCalculation}
        index={index}
        key={index}
      />
    , calculations)

    return (
      <Flex preset="box" vertical inner>
        <div className="calculations-list__content" ref="wrapper">
          <h2 className="calculations-list__overlay">
            <span className="calculations-list__3r">3R </span>calculator
          </h2>
          {results}
        </div>
      </Flex>
    )
  }
}
