import { handleActions, createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  SET_THEME: 'SET_THEME'
}

// ------------------------------------
// Actions
// ------------------------------------
export const setTheme = createAction(actionTypes.SET_THEME)

export const actions = {
  setTheme
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.SET_THEME]: (state, { payload }) => {
    return payload
  }
}, 'dark')
