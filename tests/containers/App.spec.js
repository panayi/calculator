/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { App } from 'containers/App'
import baseThemeVariables from 'themes/_base/variables'
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
  const mainClassName = 'main-component'
  const sidebarClassName = 'sidebar-component'
  let component
  let rendered

  beforeEach(function () {
    const main = <article className={mainClassName}>Main Component</article>
    const sidebar = <aside className={sidebarClassName}>Sidebar Component</aside>
    const props = {
      main,
      sidebar,
      theme: baseThemeVariables
    }

    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('Should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('Should render main component.', function () {
    const mainComponent = TestUtils.findRenderedDOMComponentWithClass(
      rendered,
      mainClassName
    )

    expect(mainComponent).to.exist
  })

  it('Should render sidebar component.', function () {
    const sidebarComponent = TestUtils.findRenderedDOMComponentWithClass(
      rendered,
      sidebarClassName
    )

    expect(sidebarComponent).to.exist
  })
})
