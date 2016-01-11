import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './modules'
import handleEventsMiddleware from './middleware/handleEvents'
import toggleButtonMiddleware from './middleware/toggleButton'

export default function configureStore(initialState: ?Object) {
  let createStoreWithMiddleware

  const middleware = applyMiddleware(
    handleEventsMiddleware,
    toggleButtonMiddleware
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
