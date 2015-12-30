/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { App } from 'containers/App'
import Flex from 'containers/Flex'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<App {...props} />)
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<App {...props} />)
}

describe('(Container) App', function () {
  let component
  let rendered
  let props
  let main
  let sidebar

  beforeEach(function () {
    main = <article className="main">Main Component</article>
    sidebar = <aside className="sidebar">Sidebar Component</aside>
    props = {
      main,
      sidebar
    }

    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('Should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('Should render {main}.', function () {
    const mainComponent = TestUtils.findRenderedDOMComponentWithTag(rendered, 'article')
    expect(mainComponent).to.exist
  })

  it('Should render {sidebar}.', function () {
    const sidebarComponent = TestUtils.findRenderedDOMComponentWithTag(rendered, 'aside')
    expect(sidebarComponent).to.exist
  })
})
