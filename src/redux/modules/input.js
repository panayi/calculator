import R from 'ramda'
import { handleActions } from 'redux-actions'
import { actionTypes as calculationsActionTypes } from './calculations'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  // keyCode = 32 is SPACE
  PRINTABLE: '0,1,2,3,4,5,6,7,8,9,+,-,*,/,#32',
  BACKSPACE: '#8'
}

// ------------------------------------
// Actions
// ------------------------------------

// No actions are defined in this module.
// Actions for this module are dispatched internally
// in '../middlewares/keyHandler'.

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.PRINTABLE]: (state, { payload }) => {
    return state + payload
  },

  [actionTypes.BACKSPACE]: (state) => {
    return R.compose(R.join(''), R.dropLast(1), R.split(''))(state)
  },

  [calculationsActionTypes.ADD_CALCULATION]: (state, { error }) => {
    return error ? state : ''
  }
}, '')
