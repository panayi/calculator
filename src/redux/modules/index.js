import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import input from './input'

export default combineReducers({
  input,
  router: routeReducer
})
