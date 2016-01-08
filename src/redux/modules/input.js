import { createAction, handleActions } from 'redux-actions'
import R from 'ramda'
import { actionTypes as calculationsActionTypes } from './calculations'
import { actionTypes as eventsActionTypes } from './events'
import { characterFromKeyCode } from 'redux/helpers/pureFunctions'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  SET_INPUT: 'SET_INPUT'
}

// ------------------------------------
// Actions
// ------------------------------------
export const addCharacter = createAction(actionTypes.ADD_CHARACTER)
export const setInput = createAction(actionTypes.SET_INPUT)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.SET_INPUT]: (state, { payload }) => {
    return payload
  },

  [calculationsActionTypes.ADD_CALCULATION]: (state, { error }) => {
    return error ? state : ''
  },

  [eventsActionTypes.BUTTON_CLICKED]:
    R.useWith(R.concat, [
      R.identity,
      R.compose(
        R.defaultTo(''),
        characterFromKeyCode,
        R.prop('keyCode'),
        R.prop('payload')
      )
    ])
}, '')
