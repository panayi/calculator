/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import { ThemeManager } from 'containers/ThemeManager'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Container) ThemeManager', function () {
  const children = <h1 className="child">Header</h1>
  const styles = {
    html: {
      height: '100%'
    }
  }
  const styleContent = 'html{height: 100%;}'
  let component
  let props
  let rendered

  beforeEach(function () {
    props = {
      children,
      styles
    }

    component = shallowRender(ThemeManager, props)
    rendered = render(ThemeManager, props)
  })

  it('Should render as a div.', function () {
    expect(component.type).to.equal('div')
  })

  it('should render children', function () {
    const child = TestUtils.findRenderedDOMComponentWithClass(rendered, 'child')
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
        const nextProps = { children, styles }
        shouldIgnoreOtherProps(rendered, nextProps)
      }
    )

    it('should update if children change', function () {
      const newChildren = <a>a link</a>
      shouldUpdate(rendered, { children: newChildren }).is.true
    })

    it('should update if styles change', function () {
      const newStyles = R.merge(styles, { body: { height: '100%' } })
      shouldUpdate(rendered, { styles: newStyles }).is.true
    })

  })
})
