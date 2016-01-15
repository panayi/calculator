/* eslint-disable no-unused-expressions */
import configureStore from 'redux-mock-store'
import R from 'ramda'
import { actionTypes as calculationsActionTypes }
  from 'redux/modules/calculations'
import { actionTypes as eventsActionTypes } from 'redux/modules/events'
import handleEventsMiddleware from 'redux/middleware/handleEvents'

describe('(Redux Middleware) handleEvents', function () {
  const BKeycode = 66
  const QKeycode = 81
  const enterKeyCode = 13
  const enterKey = { keyCode: enterKeyCode, display: '=' }
  const initialState = {
    keys: [
      { keyCode: BKeycode, display: 'B' },
      enterKey
    ]
  }
  const otherAction = {
    type: 'FOO_BAR'
  }
  const createKeyPressEvent = function (keycode) {
    return R.merge(
      $.Event('keypress', { which: keycode }),
      { preventDefault: sinon.spy() }
    )
  }
  let action
  let event
  let expectedActions
  let mockStore
  let store

  beforeEach(function () {
    mockStore = configureStore([handleEventsMiddleware])
  })

  it('should dispatch DONE_CALCULATION on KEY_PRESSED(ENTER) action',
    function () {
      event = createKeyPressEvent(enterKeyCode)
      action = {
        type: eventsActionTypes.KEY_PRESSED,
        payload: event
      }
      const doneCalculationAction = {
        type: calculationsActionTypes.DONE_CALCULATION,
        payload: undefined
      }
      expectedActions = [doneCalculationAction, action]
      store = mockStore(initialState, expectedActions)

      store.dispatch(action)
    }
  )

  it('should dispatch DONE_CALCULATION on KEY_CLICKED(ENTER) action',
    function () {
      event = createKeyPressEvent(enterKeyCode)
      action = {
        type: eventsActionTypes.KEY_CLICKED,
        payload: enterKey
      }
      const doneCalculationAction = {
        type: calculationsActionTypes.DONE_CALCULATION,
        payload: undefined
      }
      expectedActions = [doneCalculationAction, action]
      store = mockStore(initialState, expectedActions)

      store.dispatch(action)
    }
  )

  it('should stop KEY_PRESSED actions for invalid keys', function () {
    event = createKeyPressEvent(QKeycode)
    action = {
      type: eventsActionTypes.KEY_PRESSED,
      payload: event
    }
    expectedActions = [otherAction]
    store = mockStore(initialState, expectedActions)

    store.dispatch(action)
    store.dispatch(otherAction)
    event.preventDefault.should.have.been.called
  })

  it('should pass-through KEY_PRESSED actions for valid keys', function () {
    event = createKeyPressEvent(BKeycode)
    action = {
      type: eventsActionTypes.KEY_PRESSED,
      payload: event
    }
    expectedActions = [action]
    store = mockStore(initialState, expectedActions)

    store.dispatch(action)
    event.preventDefault.should.have.not.been.called
  })
})
