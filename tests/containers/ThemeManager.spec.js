/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import { ThemeManager } from 'containers/ThemeManager'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<ThemeManager {...props} />)
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<ThemeManager {...props} />)
}

describe('(Container) ThemeManager', function () {
  const children = <h1 className="child">Header</h1>
  const styles = {
    html: {
      height: '100%'
    }
  }
  const styleContent = 'html{height: 100%;}'
  let component
  let nextProps
  let props
  let rendered

  beforeEach(function () {
    props = {
      children,
      styles
    }

    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('Should render as a div.', function () {
    expect(component.type).to.equal('div')
  })

  it('should render children', function () {
    const child = TestUtils.findRenderedDOMComponentWithClass(
      rendered,
      'child'
    )
    expect(child).to.exist
  })

  it('should render a <style> tag with "styles"', function () {
    const style = TestUtils.findRenderedDOMComponentWithTag(
      rendered,
      'style'
    )
    expect(style).to.exist
    expect(style.textContent).to.equal(styleContent)
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if children and styles are the same',
      function () {
        nextProps = { children, styles }
        expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
      }
    )

    it('should update if children change', function () {
      nextProps = R.merge(props, {
        children: <a>a link</a>,
        styles
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should update if styles change', function () {
      nextProps = R.merge(props, {
        children,
        styles: R.merge(styles, { body: { height: '100%' } })
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

  })
})
