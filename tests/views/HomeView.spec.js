/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { HomeView } from 'views/HomeView'
import CalculationInput from 'components/CalculationInput'
import Calculations from 'components/Calculations'
import Flex from 'containers/Flex'


function shallowRender(component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />)
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<HomeView {...props} />)
}

describe('(View) Home', () => {
  let _component
  let _rendered
  let _props
  let _spies

  beforeEach(() => {
    _spies = {}
    _props = {
      ...bindActionCreators({
        handleKeyDown: (_spies.handleKeyDown = sinon.spy()),
        handleKeyPress: (_spies.handleKeyPress = sinon.spy()),
        calculate: (_spies.calculate = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _component = shallowRenderWithProps(_props)
    _rendered = renderWithProps(_props)
  })

  it('Should render as a <Flex>.', () => {
    expect(_component.type).to.equal(Flex)
  })

  it('Should include an instance of Calculations.', () => {
    const calculations = TestUtils.findRenderedComponentWithType(_rendered, Calculations)

    expect(calculations).to.exist
  })

  it('Should include an instance of CalculationInput.', () => {
    const calculationInput = TestUtils.findRenderedComponentWithType(_rendered, CalculationInput)

    expect(calculationInput).to.exist
  })

  describe('Calculator input', () => {
    let input

    beforeEach(() => {
      input = TestUtils.findRenderedDOMComponentWithClass(
        renderWithProps({ ..._props }), 'calculator'
      )
    })

    it('should be rendered', () => {
      expect(input).to.exist
    })

    it('should dispatch an action on keyDown', () => {
      _spies.handleKeyDown.should.have.not.been.called
      TestUtils.Simulate.keyDown(input, { key: 'r', keyCode: 82, which: 82 })
      _spies.handleKeyDown.should.have.been.called
    })

    it('should dispatch an action on keyPress', () => {
      _spies.handleKeyPress.should.have.not.been.called
      TestUtils.Simulate.keyPress(input, { key: 'r', keyCode: 82, which: 82 })
      _spies.handleKeyPress.should.have.been.called
    })
  })

  describe('Calculator submit', () => {
    let form

    beforeEach(() => {
      form = TestUtils.findRenderedDOMComponentWithTag(
        renderWithProps({ ..._props }), 'form'
      )
    })

    it('should be rendered', () => {
      expect(form).to.exist
    })

    it('should dispatch an action on submit', () => {
      _spies.calculate.should.have.not.been.called
      TestUtils.Simulate.submit(form)
      _spies.calculate.should.have.been.called
    })
  })
})
