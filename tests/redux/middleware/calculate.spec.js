import { createStore, applyMiddleware } from 'redux'
import { createAction, handleActions } from 'redux-actions'
import calculate from 'redux/middleware/calculate'

describe('(Redux Middleware) calculate', () => {
  const actionTypes = {
    CALCULATE: 'CALCULATE',
    ADD_CALCULATION: 'ADD_CALCULATION'
  }
  const addCalculation = createAction(actionTypes.ADD_CALCULATION)
  const calculateMiddleware = calculate({
    calculateActionType: actionTypes.CALCULATE,
    addCalculation
  })
  let store

  beforeEach(() => {
    const createStoreWithMiddleware = applyMiddleware(calculateMiddleware)(createStore)
    const reducer = handleActions({}, '')
    store = createStoreWithMiddleware(reducer, {})
  })

  it('should dispatch ADD_CALCULATION when receiving a CALCULATE action', () => {
    const input = '958*4493'
    const output = 4304294 // = 958*4493

    const inputAction = {
      type: actionTypes.CALCULATE,
      payload: input
    }

    const expectedAction = {
      type: actionTypes.ADD_CALCULATION,
      payload: {
        input,
        output
      }
    }

    expect(store.dispatch(inputAction)).to.deep.equal(expectedAction)
  })

  it('should dispatch ADD_CALCULATION with error when input is invalid', () => {
    const input = '958*4493+'

    const inputAction = {
      type: actionTypes.CALCULATE,
      payload: input
    }

    expect(store.dispatch(inputAction).payload.constructor).to.equal(SyntaxError)
  })
})
