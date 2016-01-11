/* eslint-disable no-unused-expressions */
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { IndexSidebar } from 'containers/IndexSidebar'
import baseThemeVariables from 'themes/_base/variables'
import CalculatorButton from 'components/CalculatorButton'
import Flex from 'containers/Flex'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<IndexSidebar {...props} />)
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<IndexSidebar {...props} />)
}

describe('(Container) IndexSidebar', function () {
  let component
  let rendered
  const keys = [
    { keyCode: 49, display: '1' },
    { keyCode: 13, display: '=' }
  ]
  const settings = {
    authorName: 'John Doe',
    authorUrl: 'https://john-doe.com',
    repoUrl: 'https://github.com/foo/bar',
    tweetText: 'Lorem ipsum dolor sit amet',
    tweetVia: 'johndoe'
  }

  beforeEach(function () {
    const props = {
      buttonClicked: () => {},
      keys,
      settings,
      theme: baseThemeVariables
    }
    component = shallowRenderWithProps(props)
    rendered = renderWithProps(props)
  })

  it('should render as a <Flex>.', function () {
    expect(component.type).to.equal(Flex)
  })

  it('should render the buttons', function () {
    const buttons = TestUtils.scryRenderedComponentsWithType(
      rendered, CalculatorButton
    )

    expect(buttons.length).to.equal(2)
  })

  it('should render the logo.', function () {
    const h1Logo = TestUtils.findRenderedDOMComponentWithTag(rendered, 'h1')
    expect(h1Logo).to.exist
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
})
