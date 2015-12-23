import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import R from 'ramda'
import { actionTypes as calculateActionTypes, actions as calculateActions }
    from './calculate'
import calculations, { actionTypes as calculationsActionTypes,
    actions as calculationsActions } from './calculations'
import input, { actionTypes as inputActionTypes } from './input'
import { actionTypes as keyActionTypes, actions as keyActions }
    from './keyEvents'

const actionTypes = R.mergeAll([
  calculateActionTypes,
  calculationsActionTypes,
  inputActionTypes,
  keyActionTypes
])

const actions = R.mergeAll([
  calculateActions,
  calculationsActions,
  keyActions
])

export default combineReducers({
  calculations,
  input,
  router: routeReducer
})

export {
  actionTypes,
  actions
}
