/* eslint-disable no-unused-expressions */
import configureStore from 'redux-mock-store'
import toggleButttonMiddleware from 'redux/middleware/toggleButton'
import { actionTypes as eventsActionTypes } from 'redux/modules/events'
import { actionTypes as keysActionTypes } from 'redux/modules/keys'

describe('(Redux Middleware) toggleButton', function () {
  const BKeycode = 66
  const BKey = { keyCode: BKeycode, display: 'B' }
  const initialState = {
    keys: [BKey]
  }
  const activateKeyAction = {
    type: keysActionTypes.ACTIVATE_KEY,
    payload: BKeycode
  }
  const deactivateKeyAction = {
    type: keysActionTypes.DEACTIVATE_KEY,
    payload: BKeycode
  }
  let action
  let expectedActions
  let mockStore
  let store

  beforeEach(function () {
    mockStore = configureStore([toggleButttonMiddleware])
  })

  it('should dispatch ACTIVATE_KEY and then DEACTIVATE_KEY on KEY_CLICKED',
    function (done) {
      action = {
        type: eventsActionTypes.KEY_CLICKED,
        payload: BKey
      }
      expectedActions = [activateKeyAction, action, deactivateKeyAction]
      store = mockStore(initialState, expectedActions, done)
      store.dispatch(action)
    }
  )

  it('should dispatch ACTIVATE_KEY and then DEACTIVATE_KEY on KEY_PRESSED',
    function (done) {
      action = {
        type: eventsActionTypes.KEY_PRESSED,
        payload: $.Event('keypress', { keyCode: BKeycode })
      }
      expectedActions = [activateKeyAction, action, deactivateKeyAction]
      store = mockStore(initialState, expectedActions, done)
      store.dispatch(action)
    }
  )
})
