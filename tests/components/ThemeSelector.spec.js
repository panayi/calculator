/* eslint-disable no-unused-expressions */
import TestUtils from 'react-addons-test-utils'
import ThemeSelector from 'components/ThemeSelector'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Component) ThemeSelector', function () {
  const onClick = sinon.spy()
  const themeName = 'dark'
  let component
  let props
  let rendered

  beforeEach(function () {
    props = {
      onClick,
      themeName
    }
    component = shallowRender(ThemeSelector, props)
    rendered = render(ThemeSelector, props)
  })

  it('should render as a <span>.', function () {
    expect(component.type).to.equal('span')
  })

  it('should dispatch onClick', function () {
    const clickTarget = rendered.refs.themeButton.refs.clickTarget
    onClick.should.not.have.been.called
    TestUtils.Simulate.click(clickTarget)
    onClick.should.have.been.called
    expect(onClick.getCall(0).args[0]).to.deep.equal(themeName)
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if themeName is the same',
      function () {
        const nextProps = { themeName }
        shouldIgnoreOtherProps(rendered, nextProps)
      }
    )

    it('should update if themeName changes', function () {
      const newThemeName = 'light'
      shouldUpdate(rendered, { themeName: newThemeName }).is.true
    })
  })
})
