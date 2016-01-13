/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import { App } from 'containers/App'
import baseThemeVariables from 'themes/_base/variables'
import Flex from 'components/Flex'

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
  const theme = baseThemeVariables
  let component
  let main
  let nextProps
  let props
  let rendered
  let sidebar

  beforeEach(function () {
    main = <article className={mainClassName}>Main Component</article>
    sidebar = <aside className={sidebarClassName}>Sidebar Component</aside>
    props = {
      main,
      sidebar,
      theme
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

  describe('shouldComponentUpdate', function () {
    it('should not update if main, sidebar and theme is the same',
      function () {
        nextProps = { main, sidebar, theme }
        expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
      }
    )

    it('should update if main changes', function () {
      nextProps = R.merge(props, {
        main: <div></div>,
        sidebar,
        theme
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should update if sidebar changes', function () {
      nextProps = R.merge(props, {
        main,
        sidebar: <div></div>,
        theme
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should update if theme changes', function () {
      nextProps = R.merge(props, {
        main,
        sidebar,
        theme: R.merge(theme, { foo: 'bar' })
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })
  })
})
