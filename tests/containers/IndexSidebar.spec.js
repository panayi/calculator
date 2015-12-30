/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { IndexSidebar } from 'containers/IndexSidebar'
import Flex from 'containers/Flex'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<IndexSidebar {...props} />)
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<IndexSidebar {...props} />)
}

describe('(Container) IndexSidebar', function () {
  let component
  let rendered
  let props

  beforeEach(() => {
    props = {}
    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('Should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('Should render the logo.', function () {
    const h1Logo = TestUtils.findRenderedDOMComponentWithTag(rendered, 'h1')
    expect(h1Logo).to.exist
    expect(h1Logo.textContent).to.match(/3R/)
  })

  // TODO: extract config into a passing prop (from redux or some other way)
  it('Should render a link to the author')
  it('Should render a link to the repo')
  it('Should render a tweet button')
})
