import R from 'ramda'
import math from 'mathjs'

export default function createMiddleware({ calculateActionType, addCalculation }) {

  // isKeyDownAction :: Action -> Boolean
  const isCalculateAction = R.compose(R.equals(calculateActionType), R.prop('type'))

  // input :: Action -> String
  const input = R.prop('payload')

  // output :: Action -> Number
  const output = R.compose(math.eval, input)

  // createAction :: Action -> Object
  const createAction = R.converge(
      R.compose(addCalculation, R.zipObj(['input', 'output']), R.pair),
      [input, output]
  )

  return R.curry((store, next, action) => {
    if (isCalculateAction(action)) {
      try {
        return store.dispatch(createAction(action))
      } catch (error) {
        return store.dispatch(addCalculation(error))
      }
    } else {
      return next(action)
    }
  })
}
