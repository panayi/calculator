/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import baseThemeVariables from 'themes/_base/variables'
import CalculatorButton, { _getStyles } from 'components/CalculatorButton'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<CalculatorButton {...props} />)
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<CalculatorButton {...props} />)
}

describe('(Component) CalculatorButton', function () {
  const getStyles = function (theme) {
    return {
      base: {
        paddingBottom: '10px'
      },
      inactive: {
        color: 'blue'
      },
      active: {
        color: 'red'
      }
    }
  }
  const theKey = {
    keyCode: 13,
    display: '='
  }
  const theme = baseThemeVariables
  let button
  let component
  let nextProps
  let props
  let rendered
  let spies

  beforeEach(function () {
    spies = {}
    props = {
      getStyles,
      onClick: (spies.onClick = sinon.spy()),
      theKey,
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

  it('should render "display"', function () {
    expect(button.textContent).to.equal(theKey.display)
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

  it('should use inactive styles when "active" is false', function () {
    const styles = getStyles(theme)
    const expectedStyles = R.merge(styles.base, styles.active)
    const activeKey = R.merge(theKey, { active: true })
    rendered = renderWithProps(R.merge(props, { theKey: activeKey }))
    button = TestUtils.findRenderedDOMComponentWithTag(
      rendered,
      'span'
    )
    expect(button.props.style).to.deep.equal(expectedStyles)
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if theKey and theme are the same', function () {
      nextProps = { theKey, theme }
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
    })

    it('should update if theKey changes', function () {
      nextProps = R.merge(props, {
        theKey: {
          keyCode: 48,
          display: '0'
        },
        theme
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should update if theme changes', function () {
      nextProps = R.merge(props, {
        theKey,
        theme: R.merge(theme, { foo: 'bar' })
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
