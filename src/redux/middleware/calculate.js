import R from 'ramda'
import math from 'mathjs'
import { actionTypes as eventsActionTypes } from 'redux/modules/events'
import { addCalculation } from 'redux/modules/calculations'
import { keyCode } from 'redux/helpers/pureFunctions'
import { inputSelector } from 'redux/selectors'

const isKeyEventAction = R.compose(
  R.contains(R.__, R.keys(eventsActionTypes)),
  R.prop('type')
)

const isEnterKeyCode = R.compose(R.equals(13), keyCode, R.prop('payload'))

// isEnterEvent :: Action -> Boolean
const isEnterEvent = R.both(isKeyEventAction, isEnterKeyCode)

// input :: Store -> String
const input = R.compose(inputSelector, R.invoker(0, 'getState'))

// output :: Store -> Number
const output = R.compose(math.eval, input)


// createAction :: Action -> Object
const createAction = R.converge(
  R.compose(addCalculation, R.zipObj(['input', 'output']), R.pair),
  [input, output]
)

// calculate :: Store -> Function -> Action -> Action
export default R.curry((store, next, action) => {
  if (isEnterEvent(action)) {
    try {
      store.dispatch(createAction(store))
    } catch (error) {
      store.dispatch(addCalculation(error))
    }
  }

  return next(action)
})
