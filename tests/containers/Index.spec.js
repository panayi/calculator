/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { Index } from 'containers/Index'
import CalculationInput from 'components/CalculationInput'
import Calculations from 'components/Calculations'
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

describe('(Container) Index', () => {
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

  it('Should render as a <Flex>.', () => {
    expect(component.type).to.equal(Flex)
  })

  it('Should include an instance of Calculations.', () => {
    const calculations = TestUtils.findRenderedComponentWithType(rendered, Calculations)
    expect(calculations).to.exist
  })

  it('Should include an instance of CalculationInput.', () => {
    const calculationInput = TestUtils.findRenderedComponentWithType(rendered, CalculationInput)
    expect(calculationInput).to.exist
  })

  describe('Calculator input', () => {
    let input

    beforeEach(() => {
      input = TestUtils.findRenderedDOMComponentWithClass(
        renderWithProps({ ...props }), 'calculator'
      )
    })

    it('should be rendered', () => {
      expect(input).to.exist
    })

    it('should dispatch an action on keyDown', () => {
      spies.handleKeyDown.should.have.not.been.called
      TestUtils.Simulate.keyDown(input, { key: 'r', keyCode: 82, which: 82 })
      spies.handleKeyDown.should.have.been.called
    })

    it('should dispatch an action on keyPress', () => {
      spies.handleKeyPress.should.have.not.been.called
      TestUtils.Simulate.keyPress(input, { key: 'r', keyCode: 82, which: 82 })
      spies.handleKeyPress.should.have.been.called
    })
  })

  describe('Calculator submit', () => {
    let form

    beforeEach(() => {
      form = TestUtils.findRenderedDOMComponentWithTag(
        renderWithProps({ ...props }), 'form'
      )
    })

    it('should be rendered', () => {
      expect(form).to.exist
    })

    it('should dispatch an action on submit', () => {
      spies.calculate.should.have.not.been.called
      TestUtils.Simulate.submit(form)
      spies.calculate.should.have.been.called
    })
  })
})
