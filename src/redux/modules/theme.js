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

// setTheme :: String -> Action
export const setTheme = createAction(actionTypes.SET_THEME)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.SET_THEME]: (state, { payload }) => {
    return payload
  }
}, '')
