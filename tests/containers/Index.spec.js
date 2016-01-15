/* eslint-disable no-unused-expressions */
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { Index } from 'containers/Index'
import Author from 'components/Author'
import Calculate from 'components/Calculate'
import CalculationsList from 'components/CalculationsList'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import createCalculation from '../test-helpers/createCalculation'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Container) Index', function () {
  const currentCalculation = createCalculation('1+1', 2)
  const previousCalculations = [
    createCalculation('1+2', 3),
    createCalculation('1+3', 4)
  ]
  const settings = {}
  let component
  let props
  let rendered
  let spies

  beforeEach(function () {
    spies = {}
    props = {
      currentCalculation,
      previousCalculations,
      settings,
      ...bindActionCreators({
        keyPressed: (spies.keyPressed = sinon.spy()),
        deleteCalculation: (spies.deleteCalculation = sinon.spy()),
        updateCalculation: (spies.updateCalculation = sinon.spy())
      }, spies.dispatch = sinon.spy())
    }
    component = shallowRender(Index, props)
    rendered = render(Index, props)
  })

  it('Should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('Should render an instance of Calculations.', function () {
    const calculationsList = TestUtils.findRenderedComponentWithType(
      rendered,
      CalculationsList
    )
    expect(calculationsList).to.exist
  })

  it('Should render an instance of Calculate.', function () {
    const calculationInput = TestUtils.findRenderedComponentWithType(
      rendered,
      Calculate
    )
    expect(calculationInput).to.exist
  })

  it('Should render an instance of Author.', function () {
    const author = TestUtils.findRenderedComponentWithType(
      rendered,
      Author
    )
    expect(author).to.exist
  })

  describe('Calculator input', function () {
    let inputComponent

    beforeEach(function () {
      inputComponent = TestUtils.findRenderedDOMComponentWithClass(
        render(Index, { ...props }), 'calculate__input'
      )
    })

    it('should be rendered', function () {
      expect(inputComponent).to.exist
    })

    it('should dispatch "keyPressed" action on keyPress', function () {
      spies.keyPressed.should.have.not.been.called
      TestUtils.Simulate.keyPress(
        inputComponent,
        { key: 'r', keyCode: 82, which: 82 }
      )
      spies.keyPressed.should.have.been.called
    })

    it('should prevent paste in calculate input', function () {
      const spy = sinon.spy()
      TestUtils.Simulate.paste(inputComponent, { preventDefault: spy })
      spy.should.have.been.called
    })
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if props are the same',
      function () {
        const nextProps = { currentCalculation, previousCalculations, settings }
        shouldIgnoreOtherProps(rendered, nextProps)
      }
    )

    it('should update if currentCalculation changes', function () {
      const newCalculation = createCalculation('1+2', 3)
      shouldUpdate(rendered, { currentCalculation: newCalculation }).is.true
    })

    it('should update if previousCalculations change', function () {
      const newCalculations = R.append(
        createCalculation('1+10', 11),
        previousCalculations
      )
      shouldUpdate(rendered, { previousCalculations: newCalculations }).is.true
    })

    it('should update if settings change', function () {
      const newSettings = R.merge(settings, { foo: 'bar' })
      shouldUpdate(rendered, { settings: newSettings }).is.true
    })
  })
})
