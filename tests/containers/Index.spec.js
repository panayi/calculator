/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { Index } from 'containers/Index'
import CalculationInput from 'components/CalculationInput'
import CalculationsList from 'components/CalculationsList'
import Flex from 'containers/Flex'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<Index {...props} />)
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<Index {...props} />)
}

describe('(Container) Index', function () {
  let component
  let rendered
  let props
  let spies

  beforeEach(() => {
    spies = {}
    props = {
      ...bindActionCreators({
        handleKeyDown: (spies.handleKeyDown = sinon.spy()),
        handleKeyPress: (spies.handleKeyPress = sinon.spy()),
        calculate: (spies.calculate = sinon.spy())
      }, spies.dispatch = sinon.spy())
    }
    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('Should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('Should include an instance of Calculations.', function () {
    const calculations = TestUtils.findRenderedComponentWithType(rendered, CalculationsList)
    expect(calculations).to.exist
  })

  it('Should include an instance of CalculationInput.', function () {
    const calculationInput = TestUtils.findRenderedComponentWithType(rendered, CalculationInput)
    expect(calculationInput).to.exist
  })

  describe('Calculator input', function () {
    let input

    beforeEach(() => {
      input = TestUtils.findRenderedDOMComponentWithClass(
        renderWithProps({ ...props }), 'calculator'
      )
    })

    it('should be rendered', function () {
      expect(input).to.exist
    })

    it('should dispatch an action on keyDown', function () {
      spies.handleKeyDown.should.have.not.been.called
      TestUtils.Simulate.keyDown(input, { key: 'r', keyCode: 82, which: 82 })
      spies.handleKeyDown.should.have.been.called
    })

    it('should dispatch an action on keyPress', function () {
      spies.handleKeyPress.should.have.not.been.called
      TestUtils.Simulate.keyPress(input, { key: 'r', keyCode: 82, which: 82 })
      spies.handleKeyPress.should.have.been.called
    })
  })

  describe('Calculator submit', function () {
    let form

    beforeEach(() => {
      form = TestUtils.findRenderedDOMComponentWithTag(
        renderWithProps({ ...props }), 'form'
      )
    })

    it('should be rendered', function () {
      expect(form).to.exist
    })

    it('should dispatch an action on submit', function () {
      spies.calculate.should.have.not.been.called
      TestUtils.Simulate.submit(form)
      spies.calculate.should.have.been.called
    })
  })
})
