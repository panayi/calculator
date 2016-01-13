/* eslint-disable no-unused-expressions */
import configureStore from 'redux-mock-store'
import {
  character,
  dispatch,
  invokeLater,
  isActionOfType,
  propsChanged,
  state
} from 'helpers/pureFunctions'

describe('(Helpers) pureFunctions', function () {
  describe('general helpers', function () {
    it('should return the character of a given key event', function () {
      const tildeKeyPressEvent = $.Event('keypress', { which: 126 })
      expect(character(tildeKeyPressEvent)).to.equal('~')
    })

    it('should return false when picked props are equal', function () {
      expect(
        propsChanged(
          ['a'],
          { a: 1, b: 2 },
          { a: 1, b: 3 }
        )
      ).to.be.false
    })

    it('should return true when picked props are not equal', function () {
      expect(
        propsChanged(
          ['b'],
          { a: 1, b: 2 },
          { a: 1, b: 3 }
        )
      ).to.be.true
    })
  })

  describe('Redux helpers', function () {
    const actionType = 'FOO_BAR'
    let action
    let mockStore
    let store

    beforeEach(function () {
      mockStore = configureStore()
    })

    it('should be true when passed actionType matches the action.type',
      function () {
        action = {
          type: actionType,
          payload: 1
        }
        expect(isActionOfType(actionType, action)).to.equal(true)
      }
    )

    it('should be false when passed actionType does not match action.type',
      function () {
        action = {
          type: 'SOME_OTHER_TYPE',
          payload: 1
        }
        expect(isActionOfType(actionType, action)).to.equal(false)
      }
    )

    it('should return the selected state of the passed selector', function () {
      const stateObj = { foo: 'bar' }
      store = mockStore(stateObj, [])
      const selector = _state => _state.foo
      expect(state(selector, store)).to.equal(selector(stateObj))
    })

    it('should dispatch the given action', function () {
      action = {
        type: actionType,
        payload: 1
      }
      store = mockStore({}, [action])
      dispatch(action, store)
    })
  })

  describe('invokeLater with arity=0', function () {
    const callback = sinon.spy()

    before(function (done) {
      invokeLater(0, 1, function (arg) {
        callback(arg)
        done()
      })
    })

    it('should invoke', function () {
      callback.should.have.been.called
    })
  })

  describe('invokeLater with arity > 0', function () {
    const callback = sinon.spy()
    const withinCurried = sinon.spy()
    const param = 'foo'

    before(function (done) {
      invokeLater(1, 1, function (arg) {
        callback(arg)
        done()
      })(param)
      invokeLater(1, 1, function (arg) {
        withinCurried(arg)
        done()
      })
    })

    it('should invoke when arity is met', function () {
      callback.should.have.been.called
      expect(callback.getCall(0).args[0]).to.equal(param)
    })

    it('should not invoke when arity is not met', function () {
      withinCurried.should.not.have.been.called
    })
  })

})
