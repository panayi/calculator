import configureStore from 'redux-mock-store'
import R from 'ramda'
import { actionTypes as eventsActionTypes } from 'redux/modules/events'
import { actionTypes as calculationsActionTypes } from 'redux/modules/calculations'
import calculateMiddleware from 'redux/middleware/calculate'

describe('(Redux Middleware) calculate', () => {
  const enterKeyCode = 13
  let input = '958*4493'
  const output = 4304294 // = 958*4493
  const addCalculationAction = {
    type: calculationsActionTypes.ADD_CALCULATION,
    payload: {
      input,
      output
    }
  }
  let action
  let store
  let mockStore
  let expectedActions

  beforeEach(() => {
    mockStore = configureStore([calculateMiddleware])
  })

  it('should dispatch ADD_CALCULATION on KEY_PRESSED(ENTER) action',
    function () {
      action = {
        type: eventsActionTypes.KEY_PRESSED,
        payload: $.Event('keypress', { which: enterKeyCode })
      }
      expectedActions = [addCalculationAction, action]
      store = mockStore({ input }, expectedActions)

      store.dispatch(action)
    }
  )

  it('should dispatch ADD_CALCULATION on BUTTON_CLICKED(ENTER) action',
    function () {
      action = {
        type: eventsActionTypes.BUTTON_CLICKED,
        payload: { keyCode: enterKeyCode, display: '=' }
      }
      expectedActions = [addCalculationAction, action]
      store = mockStore({ input }, expectedActions)

      store.dispatch(action)
    }
  )

  describe('ADD_CALCULATION with error', function () {
    let spy

    beforeEach(function () {
      spy = sinon.spy()
      const spyMiddleware = R.curry((_store, next, _action) => {
        spy(_action)
      })
      mockStore = configureStore([calculateMiddleware, spyMiddleware])
    })

    it('should dispatch ADD_CALCULATION with error when input is invalid',
      function () {
        input = '958*4493+'
        action = {
          type: eventsActionTypes.KEY_PRESSED,
          payload: $.Event('keypress', { which: enterKeyCode })
        }
        store = mockStore({ input }, [])

        store.dispatch(action)
        expect(spy.getCall(0).args[0].payload.constructor).to.equal(SyntaxError)
      }
    )
  })
})
