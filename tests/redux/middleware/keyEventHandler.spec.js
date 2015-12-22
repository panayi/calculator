import { createStore, applyMiddleware } from 'redux'
import { handleActions } from 'redux-actions'
import { actionTypes } from 'redux/modules'
import keyEventHandler, { actionType } from 'redux/middleware/keyEventHandler'
import { character } from 'redux/helpers/key'

const shiftKeyCode = 16
const zeroCharKeyCode = 48

describe('(Redux Middleware) keyEventHandler', () => {
  const DIGITS = '0,1,2,3,4,5,6,7,8,9'
  const SHIFT = `#${shiftKeyCode}`
  let store

  beforeEach(() => {
    const createStoreWithMiddleware = applyMiddleware(keyEventHandler)(createStore)
    const initialState = { name: 'jane smith', loggedIn: false }
    const reducer = handleActions({
      [DIGITS]: (state, { payload }) => {
        return state + payload
      },

      [SHIFT]: (state, { payload }) => {
        return state
      }
    }, '')
    store = createStoreWithMiddleware(reducer, initialState)
  })

  it('should dispatch a from:KEY_DOWN action when character is nonPrintable', () => {
    const event = $.Event('keydown', {
      which: shiftKeyCode
    })

    const inputAction = {
      type: actionTypes.KEY_DOWN,
      payload: event
    }

    const expectedAction = {
      type: actionType(event),
      payload: character(event),
      meta: {
        from: actionTypes.KEY_DOWN
      }
    }

    expect(store.dispatch(inputAction)).to.deep.equal(expectedAction)
  })

  it('should dispatch a from:KEY_PRESS action when character is printable', () => {
    const event = $.Event('keydown', {
      which: zeroCharKeyCode
    })

    const inputAction = {
      type: actionTypes.KEY_PRESS,
      payload: event
    }

    const expectedAction = {
      type: actionType(event),
      payload: character(event),
      meta: {
        from: actionTypes.KEY_PRESS
      }
    }

    expect(store.dispatch(inputAction)).to.deep.equal(expectedAction)
  })
})
