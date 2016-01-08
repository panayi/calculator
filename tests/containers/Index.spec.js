/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { Index } from 'containers/Index'
import baseThemeVariables from 'themes/_base/variables'
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
  let props
  let rendered
  let spies

  beforeEach(() => {
    const calculations = [
      {
        input: 'gibberish input string expression',
        output: 293840391
      },
      {
        input: 'another gibberish input',
        output: 8953094759
      }
    ]
    const input = 'enter something'
    spies = {}
    props = {
      calculations,
      input,
      theme: baseThemeVariables,
      ...bindActionCreators({
        calculate: (spies.calculate = sinon.spy()),
        keyPressed: (spies.keyPressed = sinon.spy()),
        setInput: (spies.setInput = sinon.spy())
      }, spies.dispatch = sinon.spy())
    }
    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('Should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('Should render an instance of Calculations.', function () {
    const calculationsList = TestUtils.findRenderedComponentWithType(
      rendered,
      CalculationsList
    )

    expect(calculationsList).to.exist
  })

  it('Should render an instance of CalculationInput.', function () {
    const calculationInput = TestUtils.findRenderedComponentWithType(
      rendered,
      CalculationInput
    )

    expect(calculationInput).to.exist
  })

  describe('Calculator input', function () {
    let inputComponent

    beforeEach(() => {
      inputComponent = TestUtils.findRenderedDOMComponentWithClass(
        renderWithProps({ ...props }), 'calculator-input'
      )
    })

    it('should be rendered', function () {
      expect(inputComponent).to.exist
    })

    it('should dispatch "keyPressed" action on keyPress', function () {
      spies.keyPressed.should.have.not.been.called
      TestUtils.Simulate.keyPress(
        inputComponent,
        { key: 'r', keyCode: 82, which: 82 }
      )
      spies.keyPressed.should.have.been.called
    })
  })
})
