import { createAction, handleActions } from 'redux-actions'
import R from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  ADD_CALCULATION: 'ADD_CALCULATION'
}

// ------------------------------------
// Actions
// ------------------------------------
export const addCalculation = createAction(actionTypes.ADD_CALCULATION)


// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.ADD_CALCULATION]: (state, { error, payload }) => {
    const calculation = error ? { error: payload.toString() } : payload
    return R.append(calculation, state)
  }
}, [])
