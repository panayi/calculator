import { handleActions } from 'redux-actions'
import R from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  DIGITS: '0,1,2,3,4,5,6,7,8,9',
  OPERATIONS: '+,-,*,/',
  SPACE: '#32',
  BACKSPACE: '#8',
  ENTER: '#13'
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
  [actionTypes.DIGITS]: (state, { payload }) => {
    return state + payload
  },

  [actionTypes.OPERATIONS]: (state, { payload }) => {
    return state + payload
  },

  [actionTypes.SPACE]: (state, { payload }) => {
    return state + payload
  },

  [actionTypes.BACKSPACE]: (state) => {
    return R.compose(R.join(''), R.dropLast(1), R.split(''))(state)
  },

  [actionTypes.ENTER]: (state) => {
    // remove all spaces
    return R.compose(R.join(''), R.split(' '))(state)
  }
}, '')
