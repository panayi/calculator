/* eslint-disable no-unused-expressions */
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import baseThemeVariables from 'themes/_base/variables'
import Author from 'components/Author'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'

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
  let nextProps
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
      rendered, 'author-name'
    )
    expect(authorAnchor).to.exist
  })

  it('should render a link to the repo', function () {
    const repoAnchor = TestUtils.findRenderedDOMComponentWithClass(
      rendered, 'repo-url'
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
      nextProps = { theme, settings }
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
    })

    it('should update if settings change', function () {
      nextProps = R.merge(props, {
        settings: R.merge(settings, { foo: 'bar' }),
        theme
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })

    it('should not update if theme changes but styles stay the same',
      function () {
        nextProps = R.merge(props, {
          settings,
          theme: R.merge(theme, { light: '#EEE' })
        })
        expect(rendered.shouldComponentUpdate(nextProps)).to.be.false
      }
    )

    it('should update if styles change', function () {
      nextProps = R.merge(props, {
        settings,
        theme: R.merge(theme, { dark: '#444' })
      })
      expect(rendered.shouldComponentUpdate(nextProps)).to.be.true
    })
  })
})
