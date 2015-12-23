import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer, { actionTypes, actions } from './modules'
import calculateMiddleware from './middleware/calculate'
import handleKeyEventsMiddleware from './middleware/handleKeyEvents'

export default function configureStore(initialState: ?Object) {
  let createStoreWithMiddleware

  const middleware = applyMiddleware(
    handleKeyEventsMiddleware(actionTypes),
    calculateMiddleware({
      calculateActionType: actionTypes.CALCULATE,
      addCalculation: actions.addCalculation
    })
  )

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      require('containers/DevTools').instrument()
    )
  } else {
    createStoreWithMiddleware = compose(
      middleware
    )
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  )
  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules')

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
