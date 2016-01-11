/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import baseThemeVariables from 'themes/_base/variables'
import Calculation from 'components/Calculation'
import CalculationsList from 'components/CalculationsList'
import Flex from 'containers/Flex'

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

describe('(Component) CalculationList', function () {
  const calculation = (input = '1+1', output = 2) => {
    return {
      input,
      output,
      isError: false
    }
  }
  const calculations = [calculation(), calculation()]
  const deleteCalculation = sinon.spy()
  const theme = baseThemeVariables
  let calculationComponents
  let component
  let nextProps
  let props
  let rendered

  beforeEach(function () {
    props = { calculations, deleteCalculation, theme }
    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)

    calculationComponents = TestUtils.scryRenderedComponentsWithType(
      rendered, Calculation
    )
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render a list of <Calculation>', function () {
    expect(calculationComponents.length).to.equal(2)
  })

  it('should dispatch deleteCalculation with index of clicked calculation',
    function () {
      const index = 1
      const pointer = TestUtils.findRenderedDOMComponentWithTag(
        calculationComponents[index],
        'span'
      )

      deleteCalculation.should.not.have.been.called
      TestUtils.Simulate.click(pointer)
      deleteCalculation.should.have.been.called
      expect(deleteCalculation.getCall(0).args[0]).to.equal(index)
    }
  )

  describe('shouldComponentUpdate', function () {
    it('should not update if calculations and theme are the same', function () {
      nextProps = { calculations, theme }
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
    })

    it('should update if calculations change', function () {
      nextProps = R.merge(props, {
        calculations: R.tail(calculations),
        theme
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should update if theme changes', function () {
      nextProps = R.merge(props, {
        calculations,
        theme: R.merge(theme, { foo: 'bar' })
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })
  })
})
