/* eslint-disable no-unused-expressions */

import React from 'react'
import TestUtils from 'react-addons-test-utils'
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
    _spies = {
      dispatch: sinon.spy()
    }
    _props = _spies

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

  describe('Expression input', () => {
    let input

    beforeEach(() => {
      input = TestUtils.findRenderedDOMComponentWithTag(
        renderWithProps({ ..._props }), 'input'
      )
    })

    it('should be rendered', () => {
      expect(input).to.exist
    })

    it('should dispatch an action when the pressed key is found in handlers', () => {
      _spies.dispatch.should.have.not.been.called
      TestUtils.Simulate.keyPress(input, { key: '0', keyCode: 48, which: 48 })
      _spies.dispatch.should.have.been.called
    })
  })
})
