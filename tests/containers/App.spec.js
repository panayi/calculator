/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import { App } from 'containers/App'
import baseThemeVariables from 'themes/_base/variables'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Container) App', function () {
  const mainClassName = 'main-component'
  const sidebarClassName = 'sidebar-component'
  const theme = baseThemeVariables
  let component
  let main
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

    component = shallowRender(App, props)
    rendered = render(App, props)
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
    it('should not update if main, sidebar and theme are the same',
      function () {
        const nextProps = { main, sidebar, theme }
        shouldIgnoreOtherProps(rendered, nextProps)
      }
    )

    it('should update if main changes', function () {
      const newMain = <div></div>
      shouldUpdate(rendered, { main: newMain }).is.true
    })

    it('should update if sidebar changes', function () {
      const newSidebar = <div></div>
      shouldUpdate(rendered, { sidebar: newSidebar }).is.true
    })

    it('should update if theme changes', function () {
      const newTheme = R.merge(theme, { foo: 'bar' })
      shouldUpdate(rendered, { theme: newTheme }).is.true
    })
  })
})
