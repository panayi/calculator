import React from 'react'
import ReactDOM from 'react-dom'
import { createHistory, useBasename } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import initialState from 'initialState'

const history = useBasename(createHistory)({
  basename: __BASENAME__
})
const store = configureStore(initialState)

syncReduxAndRouter(history, store, (state) => state.router)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)

// Log current tag-commit
console.log(`%c 3R Calculator: ${GIT.tag}@${GIT.commit}`, 'color: #2CA127')
