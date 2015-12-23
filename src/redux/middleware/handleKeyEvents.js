import R from 'ramda'
import { actionType as _actionType, isControl, character } from 'redux/helpers/key'

export default function createMiddleware(actionTypes) {
  // actionType :: Action -> ActionType
  const actionType = R.compose(_actionType(actionTypes), R.prop('payload'))

  // actionPayload :: Action -> Object
  const actionPayload = R.compose(character, R.prop('payload'))

  // actionMeta :: Action -> String
  const actionMeta = R.compose(R.zipObj(['from']), R.of, R.prop('type'))

  // isKeyDownAction :: Action -> Boolean
  const isKeyDownAction = R.compose(R.equals(actionTypes.KEY_DOWN), R.prop('type'))

  // isKeyPressAction :: Action -> Boolean
  const isKeyPressAction = R.compose(R.equals(actionTypes.KEY_PRESS), R.prop('type'))

  // nonPrintableCharacter :: Action -> Boolean
  const controlCharacter = R.compose(isControl, R.prop('payload'))

  // nonEmptyActionType :: Action -> Boolean
  const nonEmptyActionType = R.compose(R.not, R.isEmpty, actionType)

  // shouldHandleKeyDown :: Action -> Boolean
  const shouldHandleKeyDown = R.allPass([
    isKeyDownAction,
    controlCharacter,
    nonEmptyActionType
  ])

  // shouldHandleKeyPress :: Action -> Boolean
  const shouldHandleKeyPress = R.allPass([
    isKeyPressAction,
    nonEmptyActionType
  ])

  // shouldHandle :: Action -> Boolean
  const shouldHandle = R.anyPass([shouldHandleKeyDown, shouldHandleKeyPress])

  // actionToDispatch :: Action -> Object
  const actionToDispatch = R.converge((type, payload, meta) => {
    return { type, payload, meta }
  }, [actionType, actionPayload, actionMeta])

  return R.curry((store, next, action) => {
    if (shouldHandle(action)) {
      return store.dispatch(actionToDispatch(action))
    } else {
      return next(action)
    }
  })
}
