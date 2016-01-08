/* eslint-disable no-unused-expressions */
import configureStore from 'redux-mock-store'
import { character, dispatch, invokeLater, isActionOfType, state } from 'redux/helpers/pureFunctions'

describe('(Helpers) pureFunctions', function () {
  const actionType = 'FOO_BAR'
  let action

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

  it('should return the character of a given key event', function () {
    const tildeKeyPressEvent = $.Event('keypress', { which: 126 })
    expect(character(tildeKeyPressEvent)).to.equal('~')
  })

  describe('Redux helpers', function () {
    let mockStore
    let store

    beforeEach(function () {
      mockStore = configureStore()
    })

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

  describe('invokeLater helper', function () {
    let callback
    let withinCurriedFunction
    let param

    beforeEach(function (done) {
      param = 'wait_for_me'
      callback = sinon.spy()
      withinCurriedFunction = sinon.spy()

      invokeLater(1, 1, function (arg) {
        callback(arg)
        done()
      })(param)

      invokeLater(1, 1, function (arg) {
        withinCurriedFunction(arg)
      })
    })

    it('should invoke the passed method when arity is 0', function () {
      callback.should.have.been.called
      expect(callback.getCall(0).args[0]).to.equal(param)
    })

    it('should not invoke the passed method when arity is 0', function () {
      withinCurriedFunction.should.not.have.been.called
    })
  })
})
