import { handleActions, createAction } from 'redux-actions'
import R from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  ACTIVATE_THEME: 'ACTIVATE_THEME'
}

// ------------------------------------
// Actions
// ------------------------------------

// activateTheme :: String -> Action
export const activateTheme = createAction(actionTypes.ACTIVATE_THEME)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.ACTIVATE_THEME]: (state, { payload }) => R.map(
    R.converge(R.set(R.lensProp('active')), [
      R.compose(R.equals(payload), R.prop('name')),
      R.identity
    ]),
    state
  )
}, [])
