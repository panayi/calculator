/* eslint-disable no-unused-expressions */
import TestUtils from 'react-addons-test-utils'
import R from 'ramda'
import Calculation from 'components/Calculation'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import createCalculation from '../test-helpers/createCalculation'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Component) Calculation', function () {
  const calculation = createCalculation('1+1', 2)

  const deleteCalculation = sinon.spy()
  const index = 4
  let component
  let pointer
  let props
  let rendered

  beforeEach(function () {
    props = { calculation, deleteCalculation, index }
    component = shallowRender(Calculation, props)
    rendered = render(Calculation, props)

    pointer = TestUtils.findRenderedDOMComponentWithTag(
      rendered,
      'span'
    )
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render calculation.input and calculation.output', function () {
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'div')
    const inputDiv = R.find(
      (div) => div.textContent.indexOf(calculation.input) > -1,
      divs
    )
    const outputDiv = R.find(
      (div) => div.textContent.indexOf(calculation.output) > -1,
      divs
    )

    expect(inputDiv).to.exist
    expect(outputDiv).to.exist
  })

  it('should render pointer', function () {
    expect(pointer).to.exist
  })

  it('should dispatch deleteCalculation on clicking pointer', function () {
    deleteCalculation.should.not.have.been.called
    TestUtils.Simulate.click(pointer)
    deleteCalculation.should.have.been.called
    expect(deleteCalculation.getCall(0).args[0]).to.equal(index)
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if calculation and index are the same', function () {
      const nextProps = { calculation, index }
      shouldIgnoreOtherProps(rendered, nextProps)
    })

    it('should update if calculation changes', function () {
      const newCalculation = createCalculation('12+120', 132)
      shouldUpdate(rendered, { calculation: newCalculation }).is.true
    })

    it('should update if index changes', function () {
      const newIndex = 5
      shouldUpdate(rendered, { index: newIndex }).is.true
    })
  })
})
