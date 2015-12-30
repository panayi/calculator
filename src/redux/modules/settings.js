import { handleActions, createAction } from 'redux-actions'
import R from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  SET_SETTING: 'SET_SETTING'
}

// ------------------------------------
// Actions
// ------------------------------------
export const setSetting = createAction(actionTypes.SET_SETTING)

export const actions = {
  setSetting
}

// ------------------------------------
// Initial State
// Doesn't change ATM, i.e., setSetting is not called from anywhere.
// ------------------------------------
const initialState = {
  authorName: 'Panagiotis Panagi',
  authorUrl: 'https://github.com/panayi',
  repoUrl: 'https://github.com/panayi/calculator',
  tweetText: '3R Calculator build with React Redux and Ramda',
  tweetVia: 'ppanagi'
}

export {
  initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.SET_SETTING]: (state, { payload }) => {
    return R.merge(state, payload)
  }
}, initialState)
