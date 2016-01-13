/* eslint-disable no-unused-expressions */
import TestUtils from 'react-addons-test-utils'
import R from 'ramda'
import Calculation from 'components/Calculation'
import baseThemeVariables from 'themes/_base/variables'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import createCalculation from '../test-helpers/createCalculation'

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
  let nextProps
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
      nextProps = { calculation, theme }
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
    })

    it('should update if calculation changes', function () {
      nextProps = R.merge(props, {
        calculation: createCalculation('12+120', 132),
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
