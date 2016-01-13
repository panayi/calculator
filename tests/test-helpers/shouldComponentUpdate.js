/* eslint-disable no-unused-expressions */
import R from 'ramda'

const assert = function (result) {
  return {
    is: {
      true() {
        expect(result).to.be.true
      },

      false() {
        expect(result).to.be.false
      }
    }
  }
}

export function shouldUpdate(component, changedProps) {
  const nextProps = R.merge(component.props, changedProps)
  return assert(component.shouldComponentUpdate(nextProps))
}

export function shouldIgnoreOtherProps(component, nextProps) {
  expect(component.shouldComponentUpdate(nextProps)).to.be.false
}
