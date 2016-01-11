import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import calculations from './calculations'
import keys from './keys'
import settings from './settings'
import theme from './theme'

export default combineReducers({
  calculations,
  keys,
  router: routeReducer,
  settings,
  theme
})
