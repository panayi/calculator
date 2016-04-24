import { createAction, handleActions } from 'redux-actions'
import R from 'ramda'
import math from 'mathjs'
import { actionTypes as eventsActionTypes } from './events'
import { characterFromKeyCode } from 'helpers/pureFunctions'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  DELETE_CALCULATION: 'DELETE_CALCULATION',
  DONE_CALCULATION: 'DONE_CALCULATION',
  UPDATE_CALCULATION: 'UPDATE_CALCULATION'
}

// ------------------------------------
// Helpers
// ------------------------------------

// calculate :: Input -> Number
const calculate = R.compose(math.eval, R.identity)

// calculation :: Input -> Calculation
const calculation = R.converge(
  R.compose(R.zipObj(['input', 'output']), R.pair),
  [R.identity, calculate]
)

// formatInput :: Input -> Input
const formatInput = R.compose(R.trim, R.concat(''), R.defaultTo(''))

// isValidCalculation :: Calculation -> Boolean
const isValidCalculation = R.converge(R.and, [
  R.compose(R.not, R.isEmpty, formatInput, R.prop('input')),
  R.compose(R.not, R.defaultTo(false), R.prop('isError'))
])

// tryCalculation :: Input -> Calculation
const tryCalculation = (input) => {
  try {
    return R.compose(
      R.set(R.lensProp('isError'), false),
      calculation,
      formatInput
    )(input)
  } catch (error) {
    return {
      input,
      isError: true,
      output: undefined
    }
  }
}

// keyCharacter :: Key -> Character
const keyCharacter = R.compose(
  R.defaultTo(''),
  characterFromKeyCode,
  R.prop('keyCode'),
  R.prop('payload')
)

// lastCalculationInput :: Calculations -> Input
const lastCalculationInput = R.compose(
  R.defaultTo(''),
  R.prop('input'),
  R.last
)

// ------------------------------------
// Actions
// ------------------------------------

// doneCalculation :: Index -> Action
export const deleteCalculation = createAction(actionTypes.DELETE_CALCULATION)

// doneCalculation :: undefined -> Action
export const doneCalculation = createAction(actionTypes.DONE_CALCULATION)

// updateCalculation :: Input -> Action
export const updateCalculation = createAction(
  actionTypes.UPDATE_CALCULATION,
  tryCalculation
)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.DELETE_CALCULATION]: (state, { payload }) =>
    R.remove(payload, 1, state),

  [actionTypes.DONE_CALCULATION]: R.ifElse(
    R.compose(isValidCalculation, R.last),
    R.append({}),
    R.identity
  ),

  [actionTypes.UPDATE_CALCULATION]: R.useWith(R.flip(R.append), [
    R.slice(0, -1),
    R.prop('payload')
  ]),

  [eventsActionTypes.KEY_CLICKED]: R.converge(R.append, [
    R.useWith(R.compose(tryCalculation, R.concat), [
      lastCalculationInput,
      keyCharacter
    ]),
    R.slice(0, -1)
  ])
}, [{}])
