/* eslint-disable no-unused-expressions */
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import baseThemeVariables from 'themes/_base/variables'
import Author from 'components/Author'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Component) Author', function () {
  const getStyles = (theme) => {
    return {
      color: theme.dark
    }
  }
  const settings = {
    authorName: 'John Doe',
    authorUrl: 'https://john-doe.com',
    repoUrl: 'https://github.com/foo/bar',
    tweetText: 'Lorem ipsum dolor sit amet',
    tweetVia: 'johndoe'
  }
  const theme = baseThemeVariables
  let component
  let props
  let rendered

  beforeEach(function () {
    props = { getStyles, settings, theme }
    component = shallowRender(Author, props)
    rendered = render(Author, props)
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render the author', function () {
    const authorAnchor = TestUtils.findRenderedDOMComponentWithClass(
      rendered, 'AuthorName'
    )
    expect(authorAnchor).to.exist
  })

  it('should render a link to the repo', function () {
    const repoAnchor = TestUtils.findRenderedDOMComponentWithClass(
      rendered, 'Github'
    )
    expect(repoAnchor).to.exist
  })

  it('should render a tweet button', function () {
    const tweetAnchor = TestUtils.findRenderedDOMComponentWithClass(
      rendered, 'twitter-share-button'
    )
    expect(tweetAnchor).to.exist
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if theme and settings are the same', function () {
      shouldIgnoreOtherProps(rendered, { theme, settings })
    })

    it('should update if settings change', function () {
      const newSettings = R.merge(settings, { foo: 'bar' })
      shouldUpdate(rendered, { settings: newSettings }).is.true
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
