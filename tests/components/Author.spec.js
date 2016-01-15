/* eslint-disable no-unused-expressions */
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import Author from 'components/Author'
import Flex from 'components/Flex'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Component) Author', function () {
  const settings = {
    authorName: 'John Doe',
    authorUrl: 'https://john-doe.com',
    repoUrl: 'https://github.com/foo/bar',
    tweetText: 'Lorem ipsum dolor sit amet',
    tweetVia: 'johndoe'
  }
  let component
  let props
  let rendered

  beforeEach(function () {
    props = { settings }
    component = shallowRender(Author, props)
    rendered = render(Author, props)
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render the author', function () {
    const authorAnchor = TestUtils.findRenderedDOMComponentWithClass(
      rendered, 'author__name'
    )
    expect(authorAnchor).to.exist
  })

  it('should render a link to the repo', function () {
    const repoAnchor = TestUtils.findRenderedDOMComponentWithClass(
      rendered, 'author__github'
    )
    expect(repoAnchor).to.exist
  })

  it('should render a tweet button', function () {
    const tweetAnchor = TestUtils.findRenderedDOMComponentWithClass(
      rendered, 'author__tweet'
    )
    expect(tweetAnchor).to.exist
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if settings are the same', function () {
      shouldIgnoreOtherProps(rendered, { settings })
    })

    it('should update if settings change', function () {
      const newSettings = R.merge(settings, { foo: 'bar' })
      shouldUpdate(rendered, { settings: newSettings }).is.true
    })
  })
})
