/* eslint-disable no-unused-expressions */
import TestUtils from 'react-addons-test-utils'
import R from 'ramda'
import Calculation from 'components/Calculation'
import baseThemeVariables from 'themes/_base/variables'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import createCalculation from '../test-helpers/createCalculation'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Component) Calculation', function () {
  const calculation = createCalculation('1+1', 2)
  const getStyles = (theme) => {
    return {
      color: theme.dark
    }
  }
  const onPointerClick = sinon.spy()
  const theme = baseThemeVariables
  let component
  let pointer
  let props
  let rendered

  beforeEach(function () {
    props = { calculation, getStyles, onPointerClick, theme }
    component = shallowRender(Calculation, props)
    rendered = render(Calculation, props)

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
      const nextProps = { calculation, theme }
      shouldIgnoreOtherProps(rendered, nextProps)
    })

    it('should update if calculation changes', function () {
      const newCalculation = createCalculation('12+120', 132)
      shouldUpdate(rendered, { calculation: newCalculation }).is.true
    })

    it('should not update if theme changes but styles stay the same',
      function () {
        const newTheme = R.merge(theme, { light: '#EEE' })
        shouldUpdate(rendered, { theme: newTheme }).is.false
      }
    )

    it('should update if styles change', function () {
      const newTheme = R.merge(theme, { dark: '#444' })
      shouldUpdate(rendered, { theme: newTheme }).is.true
    })
  })
})
