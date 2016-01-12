/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import { IndexSidebar } from 'containers/IndexSidebar'
import baseThemeVariables from 'themes/_base/variables'
import CalculatorButton from 'components/CalculatorButton'
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
  const keys = [
    { keyCode: 49, display: '1' },
    { keyCode: 13, display: '=' }
  ]
  const theme = baseThemeVariables
  let component
  let nextProps
  let props
  let rendered

  beforeEach(function () {
    props = {
      buttonClicked: () => {},
      keys,
      theme
    }
    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render the buttons', function () {
    const buttons = TestUtils.scryRenderedComponentsWithType(
      rendered, CalculatorButton
    )

    expect(buttons.length).to.equal(2)
  })

  it('should render the logo.', function () {
    const h1Logo = TestUtils.findRenderedDOMComponentWithTag(rendered, 'h1')
    expect(h1Logo).to.exist
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if keys and theme is the same',
      function () {
        nextProps = { keys, theme }
        expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
      }
    )

    it('should update if keys changes', function () {
      nextProps = R.merge(props, {
        keys: R.tail(keys),
        theme
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should update if theme change', function () {
      nextProps = R.merge(props, {
        keys,
        theme: R.merge(theme, { foo: 'bar' })
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })
  })
})
