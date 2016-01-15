import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  KEY_CLICKED: 'KEY_CLICKED',
  KEY_PRESSED: 'KEY_PRESSED'
}

// ------------------------------------
// Actions
// ------------------------------------

// keyClicked :: Key -> Action
export const keyClicked = createAction(actionTypes.KEY_CLICKED)

// keyPressed :: Event -> Action
export const keyPressed = createAction(actionTypes.KEY_PRESSED)
