/* eslint-disable no-unused-expressions */
import { Style } from 'radium'
import TestUtils from 'react-addons-test-utils'
import { ThemeManager } from 'containers/ThemeManager'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Container) ThemeManager', function () {
  const activeThemeName = 'dark'
  let component
  let props
  let rendered

  beforeEach(function () {
    props = {
      activeThemeName
    }

    component = shallowRender(ThemeManager, props)
    rendered = render(ThemeManager, props)
  })

  it('Should render as a <Style>.', function () {
    expect(component.type).to.equal(Style)
  })

  it('should render a <style> tag with "styles"', function () {
    const style = TestUtils.findRenderedDOMComponentWithTag(
      rendered,
      'style'
    )
    expect(style).to.exist
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if activeThemeName is the same',
      function () {
        const nextProps = { activeThemeName }
        shouldIgnoreOtherProps(rendered, nextProps)
      }
    )

    it('should update if activeThemeName change', function () {
      const newActiveThemeName = 'light'
      shouldUpdate(rendered, { activeThemeName: newActiveThemeName }).is.true
    })
  })
})
