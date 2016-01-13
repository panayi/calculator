import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import calculations from './modules/calculations'
import keys from './modules/keys'
import settings from './modules/settings'
import themes from './modules/themes'

export default combineReducers({
  calculations,
  keys,
  router: routeReducer,
  settings,
  themes
})
