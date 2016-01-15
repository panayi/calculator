/* eslint-disable no-unused-expressions */
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import { IndexSidebar } from 'containers/IndexSidebar'
import Button from 'components/Button'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Container) IndexSidebar', function () {
  const enterKey = { keyCode: 13, display: '=' }
  const nextThemeName = 'dark'
  const oneKey = { keyCode: 49, display: '1' }
  const spies = {}
  const keys = [oneKey, enterKey]
  let component
  let props
  let rendered

  beforeEach(function () {
    props = {
      activateTheme: (spies.activateTheme = sinon.spy()),
      keyClicked: (spies.keyClicked = sinon.spy()),
      keys,
      nextThemeName
    }
    component = shallowRender(IndexSidebar, props)
    rendered = render(IndexSidebar, props)
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render the logo.', function () {
    const h1Logo = TestUtils.findRenderedDOMComponentWithTag(rendered, 'h1')
    expect(h1Logo).to.exist
  })

  it('should render the buttons', function () {
    const keyButtons = TestUtils.scryRenderedComponentsWithType(
      rendered, Button
    )
    expect(keyButtons.length).to.equal(3)
  })

  it('should dispatch keyClicked on keyButton click', function () {
    const clickTarget = rendered.refs.keyButton_49.refs.clickTarget
    spies.keyClicked.should.not.have.been.called
    TestUtils.Simulate.click(clickTarget)
    spies.keyClicked.should.have.been.called
    expect(spies.keyClicked.getCall(0).args[0]).to.deep.equal(oneKey)
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if keys and nextThemeName are the same',
      function () {
        const nextProps = { keys, nextThemeName }
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
  })
})
