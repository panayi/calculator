import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  CALCULATE: 'CALCULATE',
}

// ------------------------------------
// Actions
// ------------------------------------
const calculate = createAction(actionTypes.CALCULATE)

export const actions = {
  calculate
}

// ------------------------------------
// Reducer
// ------------------------------------

// No reducer for this module.
// The above action is handled internally in 'redux/middlewares/calculate'.
