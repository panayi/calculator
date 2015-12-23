import { createStore, applyMiddleware } from 'redux'
import { handleActions } from 'redux-actions'
import handleKeyEvents from 'redux/middleware/handleKeyEvents'
import { character } from 'redux/helpers/key'

describe('(Redux Middleware) handleKeyEvents', () => {
  const shiftKeyCode = 16
  const zeroCharKeyCode = 48
  const actionTypes = {
    KEY_DOWN: 'KEY_DOWN',
    KEY_PRESS: 'KEY_PRESS',
    DIGITS: '0,1,2,3,4,5,6,7,8,9',
    SHIFT: `#${shiftKeyCode}`
  }
  let store

  beforeEach(() => {
    const createStoreWithMiddleware = applyMiddleware(handleKeyEvents(actionTypes))(createStore)
    const reducer = handleActions({
      [actionTypes.DIGITS]: (state, { payload }) => {
        return state + payload
      },

      [actionTypes.SHIFT]: (state, { payload }) => {
        return state
      }
    }, '')

    store = createStoreWithMiddleware(reducer, {})
  })

  it('should dispatch a surrogate action when character isControl and event is KEY_DOWN', () => {
    const event = $.Event('keydown', {
      which: shiftKeyCode
    })

    const inputAction = {
      type: actionTypes.KEY_DOWN,
      payload: event
    }

    const expectedAction = {
      type: actionTypes.SHIFT,
      payload: character(event),
      meta: {
        from: actionTypes.KEY_DOWN
      }
    }

    expect(store.dispatch(inputAction)).to.deep.equal(expectedAction)
  })

  it('should dispatch a surrogate action when character !isControl and event is KEY_PRESS', () => {
    const event = $.Event('keydown', {
      which: zeroCharKeyCode
    })

    const inputAction = {
      type: actionTypes.KEY_PRESS,
      payload: event
    }

    const expectedAction = {
      type: actionTypes.DIGITS,
      payload: character(event),
      meta: {
        from: actionTypes.KEY_PRESS
      }
    }

    expect(store.dispatch(inputAction)).to.deep.equal(expectedAction)
  })

  it('should not dispatch a surrogate action when character !isControl and event is KEY_DOWN', () => {
    const event = $.Event('keydown', {
      which: zeroCharKeyCode
    })

    const inputAction = {
      type: actionTypes.KEY_DOWN,
      payload: event
    }

    expect(store.dispatch(inputAction)).to.deep.equal(inputAction)
  })

  it('should not dispatch a surrogate action when the key is not found in actionTypes', () => {
    const qCharKeyCode = 81
    const event = $.Event('keydown', {
      which: qCharKeyCode
    })

    const inputAction = {
      type: actionTypes.KEY_PRESS,
      payload: event
    }

    expect(store.dispatch(inputAction)).to.deep.equal(inputAction)
  })
})
