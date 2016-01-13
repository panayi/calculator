/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import R from 'ramda'
import Calculation from 'components/Calculation'
import baseThemeVariables from 'themes/_base/variables'
import Flex from 'components/Flex'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<Calculation {...props} />)
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<Calculation {...props} />)
}

describe('(Component) Calculation', function () {
  const calculation = {
    input: '12+12',
    output: 24
  }
  const getStyles = (theme) => {
    return {
      color: theme.dark
    }
  }
  const onPointerClick = sinon.spy()
  const theme = baseThemeVariables
  let component
  let nextProps
  let pointer
  let props
  let rendered

  beforeEach(function () {
    props = { calculation, getStyles, onPointerClick, theme }
    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)

    pointer = TestUtils.findRenderedDOMComponentWithTag(
      rendered,
      'span'
    )
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render calculation.input and calculation.output', function () {
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'div')
    const inputDiv = R.find(
      (div) => div.textContent.indexOf(calculation.input) > -1,
      divs
    )
    const outputDiv = R.find(
      (div) => div.textContent.indexOf(calculation.output) > -1,
      divs
    )

    expect(inputDiv).to.exist
    expect(outputDiv).to.exist
  })

  it('should render pointer', function () {
    expect(pointer).to.exist
  })

  it('should dispatch onPointerClick on clicking pointer', function () {
    onPointerClick.should.not.have.been.called
    TestUtils.Simulate.click(pointer)
    onPointerClick.should.have.been.called
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if calculation and theme are the same', function () {
      nextProps = { calculation, theme }
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
    })

    it('should update if calculation changes', function () {
      nextProps = R.merge(props, {
        calculation: {
          input: '12+120',
          output: 132,
          isError: false
        },
        theme
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should not update if theme changes but styles stay the same',
      function () {
        nextProps = R.merge(props, {
          calculation,
          theme: R.merge(theme, { light: '#EEE' })
        })
        expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
      }
    )

    it('should update if styles change', function () {
      nextProps = R.merge(props, {
        calculation,
        theme: R.merge(theme, { dark: '#444' })
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })
  })
})
