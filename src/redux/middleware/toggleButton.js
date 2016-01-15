import R from 'ramda'
import { actionTypes as eventsActionTypes } from 'redux/modules/events'
import { actionTypes as keysActionTypes, activateKey, deactivateKey }
  from 'redux/modules/keys'
import { invokeLater, isActionOfType, dispatch, keyCode }
  from 'helpers/pureFunctions'

const activeDurationMs = 160

// dispatchActivateKey :: Function -> Function
const dispatchActivateKey = (keyCodeSelector) =>
  R.compose(dispatch, activateKey, keyCodeSelector, R.prop('payload'))

// handleAction :: Action -> Store -> Action|TimeoutID|Boolean
const handleAction = R.cond([
  [isActionOfType(eventsActionTypes.KEY_CLICKED),
    dispatchActivateKey(R.prop('keyCode'))],

  [isActionOfType(eventsActionTypes.KEY_PRESSED),
    dispatchActivateKey(keyCode)],

  [isActionOfType(keysActionTypes.ACTIVATE_KEY),
    R.compose(
      invokeLater(2, activeDurationMs, dispatch),
      deactivateKey,
      R.prop('payload')
    )
  ],

  [R.T, R.curryN(2, R.F)]
])

// toggleButton :: Store -> Function -> Action -> Action
export default R.curry((store, next, action) => {
  handleAction(action)(store)
  return next(action)
})
