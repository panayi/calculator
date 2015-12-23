/* eslint-disable no-unused-expressions */

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { HomeView } from 'views/HomeView'

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

  it('Should render as a <div>.', () => {
    expect(_component.type).to.equal('div')
  })

  it('Should include an <h1> with welcome text.', () => {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1')

    expect(h1).to.exist
    expect(h1.textContent).to.match(/Welcome to \*the calculator\*/)
  })

  it('Should render with an <h2> that includes Sample Counter text.', () => {
    const h2 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h2')

    expect(h2).to.exist
    expect(h2.textContent).to.match(/Enter an expression to calculate/)
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
