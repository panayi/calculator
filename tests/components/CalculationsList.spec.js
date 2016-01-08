/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import baseThemeVariables from 'themes/_base/variables'
import Calculation from 'components/Calculation'
import CalculationsList from 'components/CalculationsList'

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
  let component
  let rendered

  beforeEach(function () {
    const calculations = [
      {
        input: 'gibberish input string expression',
        output: 293840391
      },
      {
        input: 'another gibberish input',
        output: 8953094759
      }
    ]
    const theme = baseThemeVariables
    const props = { calculations, theme }

    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('should render as a <div>.', function () {
    expect(component.type).to.equal('div')
  })

  it('should render a list of <Calculation>', function () {
    const calculationComponents = TestUtils.scryRenderedComponentsWithType(rendered, Calculation)

    expect(calculationComponents.length).to.equal(2)
  })
})
