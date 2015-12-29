import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'containers/App'
import Index from 'containers/Index'
import IndexSidebar from 'containers/IndexSidebar'

export default (
  <Route path="/" component={App}>
    <IndexRoute components={{ main: Index, sidebar: IndexSidebar }} />
  </Route>
)
