import R from 'ramda'
import { actionTypes } from '../modules'
import { actionType as _actionType, isNonPrintable, character } from '../helpers/key'

export const actionType = _actionType(actionTypes)

const doHandleEvent = R.curry((dispatch, meta, event) => {
  event.preventDefault()
  return dispatch({
    type: actionType(event),
    payload: character(event),
    meta
  })
})

export default store => next => action => {
  if (action.type === actionTypes.KEY_DOWN) {
    return R.when(isNonPrintable, doHandleEvent(
      store.dispatch,
      { from: actionTypes.KEY_DOWN }
    ))(action.payload)
  } else if (action.type === actionTypes.KEY_PRESS) {
    return doHandleEvent(
      store.dispatch,
      { from: actionTypes.KEY_PRESS },
      action.payload
    )
  } else {
    return next(action)
  }
}
