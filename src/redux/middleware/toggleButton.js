import R from 'ramda'
import { actionTypes as eventsActionTypes } from 'redux/modules/events'
import { actionTypes as keysActionTypes, activateKey, deactivateKey } from 'redux/modules/keys'
import { invokeLater, isActionOfType, dispatch, keyCode } from 'redux/helpers/pureFunctions'

export default function createMiddleware(activeDurationMs = 120) {

  // dispatchActivateKey :: Function -> Function
  const dispatchActivateKey = (keyCodeSelector) =>
    R.compose(dispatch, activateKey, keyCodeSelector, R.prop('payload'))

  // handleAction :: Action -> Store -> Action|TimeoutID|Boolean
  const handleAction = R.cond([
    [isActionOfType(eventsActionTypes.BUTTON_CLICKED),
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
  return R.curry((store, next, action) => {
    handleAction(action)(store)
    return next(action)
  })
}
