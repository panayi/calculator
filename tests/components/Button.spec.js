/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import baseThemeVariables from 'themes/_base/variables'
import Button, { _getStyles } from 'components/Button'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<Button {...props} />)
}

function renderWithProps(props = {}, children) {
  return TestUtils.renderIntoDocument(
    <Button {...props} />
  )
}

describe('(Component) Button', function () {
  const active = false
  const children = <b className="child">a button</b>
  const getStyles = function (theme) {
    return {
      base: {
        paddingBottom: '10px'
      },
      inactive: {
        color: theme.blue
      },
      active: {
        color: theme.red
      }
    }
  }
  const theme = R.merge(baseThemeVariables, {
    blue: 'blue',
    red: 'red'
  })
  let button
  let component
  let nextProps
  let props
  let rendered
  let spies

  beforeEach(function () {
    spies = {}
    props = {
      active,
      children,
      getStyles,
      onClick: (spies.onClick = sinon.spy()),
      theme
    }
    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
    button = TestUtils.findRenderedDOMComponentWithTag(
      rendered,
      'span'
    )
  })

  it('should render as a <span>.', function () {
    expect(component.type).to.equal('span')
  })

  it('should render children', function () {
    const child = TestUtils.findRenderedDOMComponentWithClass(
      rendered,
      'child'
    )
    expect(child).to.exist
  })

  it('should dispatch onClick', function () {
    TestUtils.Simulate.click(button)
    spies.onClick.should.have.been.called
  })

  it('should use inactive styles when "active" is false', function () {
    const styles = getStyles(theme)
    const expectedStyles = R.merge(styles.base, styles.inactive)
    expect(button.props.style).to.deep.equal(expectedStyles)
  })

  it('should use active styles when "active" is true', function () {
    const styles = getStyles(theme)
    const expectedStyles = R.merge(styles.base, styles.active)
    rendered = renderWithProps(R.merge(props, { active: true }))
    button = TestUtils.findRenderedDOMComponentWithTag(
      rendered,
      'span'
    )
    expect(button.props.style).to.deep.equal(expectedStyles)
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if active, children and theme are the same',
      function () {
        nextProps = { active, children, theme }
        expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
      }
    )

    it('should update if active changes', function () {
      nextProps = R.merge(props, {
        active: R.not(active),
        children,
        theme
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should update if children change', function () {
      nextProps = R.merge(props, {
        active,
        children: <b>A new button!</b>,
        theme
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should not update if theme changes but styles stay the same',
      function () {
        nextProps = R.merge(props, {
          active,
          children,
          theme: R.merge(theme, { green: '#4EF64A' })
        })
        expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
      }
    )

    it('should update if styles change', function () {
      nextProps = R.merge(props, {
        active,
        children,
        theme: R.merge(theme, { blue: '#14BCF6' })
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })
  })

  describe('_getStyles', function () {
    it('should return a valid object', function () {
      const styles = _getStyles(theme)
      expect(styles.base).to.be.an('object')
      expect(styles.inactive).to.be.an('object')
      expect(styles.active).to.be.an('object')
    })
  })
})
