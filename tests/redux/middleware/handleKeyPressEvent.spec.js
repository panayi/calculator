/* eslint-disable no-unused-expressions */
import configureStore from 'redux-mock-store'
import R from 'ramda'
import { actionTypes } from 'redux/modules/events'
import handleKeyPressEventMiddleware from 'redux/middleware/handleKeyPressEvent'

describe('(Redux Middleware) handleKeyPressEvent', () => {
  const BKeycode = 66
  const QKeycode = 81
  const initialState = {
    keys: [
      { keyCode: BKeycode, display: 'B' },
    ]
  }
  const otherAction = {
    type: 'FOO_BAR'
  }
  const createKeyPressEvent = function (keycode) {
    return R.merge(
      $.Event('keydown', { which: keycode }),
      { preventDefault: sinon.spy() }
    )
  }
  let action
  let event
  let expectedActions
  let mockStore
  let store

  beforeEach(() => {
    mockStore = configureStore([handleKeyPressEventMiddleware])
  })

  it('should stop KEY_PRESSED actions for invalid keys', function () {
    event = createKeyPressEvent(QKeycode)
    action = {
      type: actionTypes.KEY_PRESSED,
      payload: event
    }
    expectedActions = [otherAction]
    store = mockStore(initialState, expectedActions)

    store.dispatch(action)
    store.dispatch(otherAction)
    event.preventDefault.should.have.been.called
  })

  it('should pass-through KEY_PRESSED actions for valid keys', () => {
    event = createKeyPressEvent(BKeycode)
    action = {
      type: actionTypes.KEY_PRESSED,
      payload: event
    }
    expectedActions = [action]
    store = mockStore(initialState, expectedActions)

    store.dispatch(action)
    event.preventDefault.should.have.not.been.called
  })
})
