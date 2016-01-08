/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import baseThemeVariables from 'themes/_base/variables'
import CalculationInput from 'components/CalculationInput'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<CalculationInput {...props} />)
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<CalculationInput {...props} />)
}

describe('(Component) CalculationInput', function () {
  let component
  let input
  let rendered
  let spies

  beforeEach(function () {
    spies = {}
    const props = {
      input: 'enter something',
      onChange: (spies.onChange = sinon.spy()),
      onKeyPress: (spies.onKeyPress = sinon.spy()),
      onPaste: (spies.onPaste = sinon.spy()),
      onSubmit: (spies.onSubmit = sinon.spy()),
      theme: baseThemeVariables
    }

    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)

    input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'calculator-input')
  })

  it('should render as a <form>.', function () {
    expect(component.type).to.equal('div')
  })

  it('should dispatch onChange when input has changed', function () {
    TestUtils.Simulate.change(input)
    spies.onChange.should.have.been.called
  })

  it('should dispatch onPaste on input paste', function () {
    TestUtils.Simulate.paste(input)
    spies.onPaste.should.have.been.called
  })
})
