/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import R from 'ramda'
import Calculation from 'components/Calculation'
import CalculationsList from 'components/CalculationsList'
import baseThemeVariables from 'themes/_base/variables'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<CalculationsList {...props} />)
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<CalculationsList {...props} />)
}

describe('(Component) Calculation', function () {
  let calculations
  let component
  let props
  let rendered
  let theme

  beforeEach(function () {
    calculations = [
      {
        input: 'gibberish input string expression',
        output: 293840391
      },
      {
        input: 'another gibberish input',
        output: 8953094759
      }
    ]
    theme = baseThemeVariables
    props = {
      calculations,
      theme
    }

    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('should render as a <div>.', function () {
    expect(component.type).to.equal('div')
  })

  it('should render the right number of <Calculation>', function () {
    const calculationComponents = TestUtils.scryRenderedComponentsWithType(rendered, Calculation)

    expect(calculationComponents.length).to.equal(2)
  })
})
