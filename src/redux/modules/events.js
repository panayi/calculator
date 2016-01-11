import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  BUTTON_CLICKED: 'BUTTON_CLICKED',
  KEY_PRESSED: 'KEY_PRESSED'
}

// ------------------------------------
// Actions
// ------------------------------------

// buttonClicked :: Key -> Action
export const buttonClicked = createAction(actionTypes.BUTTON_CLICKED)

// keyPressed :: Event -> Action
export const keyPressed = createAction(actionTypes.KEY_PRESSED)
