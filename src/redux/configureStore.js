import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './modules'
import calculateMiddleware from './middleware/calculate'
import handleKeyPressEventMiddleware from './middleware/handleKeyPressEvent'
import createToggleButtonMiddleware from './middleware/toggleButton'

export default function configureStore(initialState: ?Object) {
  let createStoreWithMiddleware

  const middleware = applyMiddleware(
    handleKeyPressEventMiddleware,
    calculateMiddleware,
    createToggleButtonMiddleware()
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
