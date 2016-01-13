import React from 'react'
import TestUtils from 'react-addons-test-utils'

function _shallowRender(component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}

export function render(Component, props = {}) {
  return TestUtils.renderIntoDocument(<Component {...props} />)
}

export function shallowRender(Component, props = {}) {
  return _shallowRender(<Component {...props} />)
}
