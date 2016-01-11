/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import baseThemeVariables from 'themes/_base/variables'
import Calculate from 'components/Calculate'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<Calculate {...props} />)
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<Calculate {...props} />)
}

describe('(Component) Calculate', function () {
  const theme = baseThemeVariables
  let calculation = {
    input: '1+1',
    output: 2,
    isError: false
  }
  let component
  let input
  let nextProps
  let props
  let rendered
  let spies

  beforeEach(function () {
    spies = {}
    props = {
      calculation,
      onChange: (spies.onChange = sinon.spy()),
      onKeyPress: (spies.onKeyPress = sinon.spy()),
      onPaste: (spies.onPaste = sinon.spy()),
      onSubmit: (spies.onSubmit = sinon.spy()),
      theme
    }
    component = shallowRenderWithProps(props)
  })

  it('should render as a <div>.', function () {
    expect(component.type).to.equal('div')
  })

  it('should render calculation input', function () {
    rendered = renderWithProps(props)
    input = TestUtils.findRenderedDOMComponentWithClass(
      rendered,
      'calculator-input'
    )
    expect(input.value).to.equal(calculation.input)
  })

  it('should not display output when "input" is empty', function () {
    calculation = { input: '' }
    rendered = renderWithProps(R.merge(props, { calculation }))
    const span = TestUtils.findRenderedDOMComponentWithTag(rendered, 'span')
    expect(span.textContent).to.equal('')
  })

  it('should display ERROR when "isError"', function () {
    calculation = { input: '5+', isError: true }
    rendered = renderWithProps(R.merge(props, { calculation }))
    const span = TestUtils.findRenderedDOMComponentWithTag(rendered, 'span')
    expect(span.textContent).to.equal('Ans = ERROR')
  })

  it('should display "output" when "input" is not empty and not "isError"',
    function () {
      const output = 10
      calculation = { input: '5+5', output }
      rendered = renderWithProps(R.merge(props, { calculation }))
      const span = TestUtils.findRenderedDOMComponentWithTag(rendered, 'span')
      expect(span.textContent).to.equal(`Ans = ${output}`)
    }
  )

  it('should dispatch onChange when input has changed', function () {
    rendered = renderWithProps(props)
    input = TestUtils.findRenderedDOMComponentWithClass(
      rendered,
      'calculator-input'
    )
    TestUtils.Simulate.change(input)
    spies.onChange.should.have.been.called
  })

  it('should dispatch onPaste on input paste', function () {
    rendered = renderWithProps(props)
    input = TestUtils.findRenderedDOMComponentWithClass(
      rendered,
      'calculator-input'
    )
    TestUtils.Simulate.paste(input)
    spies.onPaste.should.have.been.called
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if calculation and theme are the same', function () {
      nextProps = { calculation, theme }
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
    })

    it('should update if calculation changes', function () {
      nextProps = R.merge(props, { calculation: {
        input: '1+12',
        output: 13,
        isError: false
      }, theme })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should update if theme changes', function () {
      nextProps = R.merge(props, {
        calculation,
        theme: R.merge(theme, { foo: 'bar' })
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })
  })
})
