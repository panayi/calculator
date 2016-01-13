/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import baseThemeVariables from 'themes/_base/variables'
import Button, { _getStyles } from 'components/Button'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

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
    component = shallowRender(Button, props)
    rendered = render(Button, props)
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
    rendered = render(Button, R.merge(props, { active: true }))
    button = TestUtils.findRenderedDOMComponentWithTag(
      rendered,
      'span'
    )
    expect(button.props.style).to.deep.equal(expectedStyles)
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if active, children and theme are the same',
      function () {
        const nextProps = { active, children, theme }
        shouldIgnoreOtherProps(rendered, nextProps)
      }
    )

    it('should update if active changes', function () {
      const newActive = R.not(active)
      shouldUpdate(rendered, { active: newActive }).is.true
    })

    it('should update if children change', function () {
      const newChildren = <b>A new button!</b>
      shouldUpdate(rendered, { children: newChildren }).is.true
    })

    it('should not update if theme changes but styles stay the same',
      function () {
        const newTheme = R.merge(theme, { green: '#4EF64A' })
        shouldUpdate(rendered, { theme: newTheme }).is.true
      }
    )

    it('should update if styles change', function () {
      const newTheme = R.merge(theme, { blue: '#14BCF6' })
      shouldUpdate(rendered, { theme: newTheme }).is.true
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
