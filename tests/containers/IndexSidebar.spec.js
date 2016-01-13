/* eslint-disable no-unused-expressions */
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import { IndexSidebar } from 'containers/IndexSidebar'
import baseThemeVariables from 'themes/_base/variables'
import Button from 'components/Button'
import darkThemeVariables from 'themes/dark/variables'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Container) IndexSidebar', function () {
  const enterKey = { keyCode: 13, display: '=' }
  const nextThemeName = 'dark'
  const nextThemeVariables = R.merge(baseThemeVariables, darkThemeVariables)
  const oneKey = { keyCode: 49, display: '1' }
  const spies = {}
  const theme = baseThemeVariables
  const keys = [oneKey, enterKey]
  let buttons
  let component
  let props
  let rendered

  beforeEach(function () {
    props = {
      activateTheme: (spies.activateTheme = sinon.spy()),
      buttonClicked: (spies.buttonClicked = sinon.spy()),
      keys,
      nextThemeName,
      nextThemeVariables,
      theme
    }
    component = shallowRender(IndexSidebar, props)
    rendered = render(IndexSidebar, props)
    buttons = TestUtils.scryRenderedComponentsWithType(
      rendered, Button
    )
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render the logo.', function () {
    const h1Logo = TestUtils.findRenderedDOMComponentWithTag(rendered, 'h1')
    expect(h1Logo).to.exist
  })

  it('should render the buttons', function () {
    expect(buttons.length).to.equal(3)
  })

  it('should dispatch buttonClicked on key button click', function () {
    const clickTarget = rendered.refs.keyButton_49.refs.clickTarget
    spies.buttonClicked.should.not.have.been.called
    TestUtils.Simulate.click(clickTarget)
    spies.buttonClicked.should.have.been.called
    expect(spies.buttonClicked.getCall(0).args[0]).to.deep.equal(oneKey)
  })

  it('should dispatch activateTheme on theme button click', function () {
    const clickTarget = rendered.refs.themeButton.refs.clickTarget
    spies.activateTheme.should.not.have.been.called
    TestUtils.Simulate.click(clickTarget)
    spies.activateTheme.should.have.been.called
    expect(spies.activateTheme.getCall(0).args[0]).to.equal(nextThemeName)
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if keys, theme and nextThemeName are the same',
      function () {
        const nextProps = { keys, nextThemeName, theme }
        shouldIgnoreOtherProps(rendered, nextProps)
      }
    )

    it('should update if keys changes', function () {
      const newKeys = R.tail(keys)
      shouldUpdate(rendered, { keys: newKeys }).is.true
    })

    it('should update if nextTheme changes', function () {
      const newNextThemeName = 'light'
      shouldUpdate(rendered, { nextThemeName: newNextThemeName }).is.true
    })

    it('should update if theme changes', function () {
      const newTheme = R.merge(theme, { foo: 'bar' })
      shouldUpdate(rendered, { theme: newTheme }).is.true
    })
  })
})
