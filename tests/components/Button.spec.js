/* eslint-disable no-unused-expressions */
import React from 'react'
import R from 'ramda'
import TestUtils from 'react-addons-test-utils'
import Button from 'components/Button'
import { render, shallowRender } from '../test-helpers/render'
import { shouldIgnoreOtherProps, shouldUpdate }
  from '../test-helpers/shouldComponentUpdate'

describe('(Component) Button', function () {
  const active = false
  const children = <b className="child">a button</b>
  let button
  let component
  let props
  let rendered
  let spies

  beforeEach(function () {
    spies = {}
    props = {
      active,
      children,
      onClick: (spies.onClick = sinon.spy()),
    }
    component = shallowRender(Button, props)
    rendered = render(Button, props)
    button = TestUtils.findRenderedDOMComponentWithTag(
      rendered,
      'span'
    )
  })

  it('should render as a <span>.', function () {
    expect(component.type).to.equal('span')
  })

  it('should render children', function () {
    const child = TestUtils.findRenderedDOMComponentWithClass(
      rendered,
      'child'
    )
    expect(child).to.exist
  })

  it('should dispatch onClick', function () {
    TestUtils.Simulate.click(button)
    spies.onClick.should.have.been.called
  })

  describe('shouldComponentUpdate', function () {
    it('should not update if active and children are the same',
      function () {
        const nextProps = { active, children }
        shouldIgnoreOtherProps(rendered, nextProps)
      }
    )

    it('should update if active changes', function () {
      const newActive = R.not(active)
      shouldUpdate(rendered, { active: newActive }).is.true
    })

    it('should update if children change', function () {
      const newChildren = <b>A new button!</b>
      shouldUpdate(rendered, { children: newChildren }).is.true
    })
  })
})
