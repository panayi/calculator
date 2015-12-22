import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import R from 'ramda'
import input, { actionTypes as inputActionTypes } from './input'
import keyEvents, { actionTypes as keyActionTypes } from './keyEvents'

const actionTypes = R.merge(
  inputActionTypes,
  keyActionTypes
)

export default combineReducers({
  input,
  keyEvents,
  router: routeReducer
})

export {
  actionTypes
}
