import { applyMiddleware, compose, createStore } from 'redux'
import handleEventsMiddleware from './middleware/handleEvents'
import toggleButtonMiddleware from './middleware/toggleButton'
import rootReducer from './rootReducer'

export default function configureStore(initialState: ?Object) {
  let createStoreWithMiddleware

  const middleware = applyMiddleware(
    handleEventsMiddleware,
    toggleButtonMiddleware
  )

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      window.devToolsExtension
        ? window.devToolsExtension()
        : require('containers/DevTools').default.instrument()
    )
  } else {
    createStoreWithMiddleware = compose(middleware)
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  )
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer')

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
