import { handleActions, createAction } from 'redux-actions'
import R from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  ACTIVATE_KEY: 'ACTIVATE_KEY',
  DEACTIVATE_KEY: 'DEACTIVATE_KEY',
  SET_KEYS: 'SET_KEYS'
}

// ------------------------------------
// Actions
// ------------------------------------

// activateKey :: Key -> Action
export const activateKey = createAction(actionTypes.ACTIVATE_KEY)

// deactivateKey :: Key -> Action
export const deactivateKey = createAction(actionTypes.DEACTIVATE_KEY)

// setKeys :: Keys -> Actions
export const setKeys = createAction(actionTypes.SET_KEYS)

// ------------------------------------
// Reducer
// ------------------------------------

// setActiveProp :: Key -> Key
const setActiveProp = R.set(R.lensProp('active'))

// toggleKey :: Boolean -> State -> KeyCode
const toggleKey = R.curry((active, state, { payload }) =>
  R.map(
    R.when(
      R.compose(R.equals(payload), R.prop('keyCode')),
      setActiveProp(active)
    ),
    state
  )
)

export default handleActions({
  [actionTypes.ACTIVATE_KEY]: toggleKey(true),
  [actionTypes.DEACTIVATE_KEY]: toggleKey(false),
  [actionTypes.SET_KEYS]: (state, { payload }) => payload
}, [])
