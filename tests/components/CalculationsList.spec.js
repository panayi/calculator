/* eslint-disable no-unused-expressions */
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import Calculation from 'components/Calculation'
import CalculationsList from 'components/CalculationsList'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import createCalculation from '../test-helpers/createCalculation'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Component) CalculationsList', function () {
  const calculations = [
    createCalculation('1+1', 2),
    createCalculation('1+2', 3)
  ]
  const deleteCalculation = sinon.spy()
  let calculationComponents
  let component
  let props
  let rendered

  beforeEach(function () {
    props = { calculations, deleteCalculation }
    component = shallowRender(CalculationsList, props)
    rendered = render(CalculationsList, props)

    calculationComponents = TestUtils.scryRenderedComponentsWithType(
      rendered, Calculation
    )
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render a list of <Calculation>', function () {
    expect(calculationComponents.length).to.equal(2)
  })

  it('should dispatch deleteCalculation with index of clicked calculation',
    function () {
      const index = 1
      const pointer = TestUtils.findRenderedDOMComponentWithTag(
        calculationComponents[index],
        'span'
      )

      deleteCalculation.should.not.have.been.called
      TestUtils.Simulate.click(pointer)
      deleteCalculation.should.have.been.called
      expect(deleteCalculation.getCall(0).args[0]).to.equal(index)
    }
  )

  it('should scroll to bottom on componentDidUpdate')

  describe('shouldComponentUpdate', function () {
    it('should not update if calculations are the same', function () {
      const nextProps = { calculations }
      shouldIgnoreOtherProps(rendered, nextProps)
    })

    it('should update if calculations change', function () {
      const newCalculations = R.tail(calculations)
      shouldUpdate(rendered, { calculations: newCalculations }).is.true
    })
  })
})
