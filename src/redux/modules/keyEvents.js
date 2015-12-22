import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  KEY_DOWN: 'KEY_DOWN',
  KEY_PRESS: 'KEY_PRESS'
}

// ------------------------------------
// Actions
// ------------------------------------
const handleKeyDown = createAction(actionTypes.KEY_DOWN)
const handleKeyPress = createAction(actionTypes.KEY_PRESS)

export const actions = {
  handleKeyDown,
  handleKeyPress
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  // This reducer does nothing
  // The above actions are handled internally in '../middlewares/keyHandler',
  // which dispatches new actions as needed.
}, null)
