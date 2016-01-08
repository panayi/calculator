/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import R from 'ramda'
import Calculation from 'components/Calculation'
import baseThemeVariables from 'themes/_base/variables'

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
  let calculation
  let component
  let rendered

  beforeEach(function () {
    calculation = {
      input: 'gibberish input expression',
      output: 293840391
    }
    const theme = baseThemeVariables
    const props = { calculation, theme }

    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('should render as a <div>.', function () {
    expect(component.type).to.equal('div')
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
})
