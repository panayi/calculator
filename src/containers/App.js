import React, { Component, PropTypes } from 'react'
import Flex from 'containers/Flex'
import { Theme, connect } from 'helpers/connectAndTheme'

class App extends Component {
  static propTypes = {
    main: PropTypes.element,
    sidebar: PropTypes.element,
    theme: PropTypes.object
  }

  render() {
    const { main, sidebar, theme } = this.props

    return (
      <Flex preset="frame" theme={theme}>
        <Flex preset="box" theme={theme} fullHeight nogrow noshrink width="min-content">
          {sidebar}
        </Flex>
        <Flex preset="box" theme={theme} fullHeight>
          {main}
        </Flex>
      </Flex>
    )
  }
}

App = Theme(App)

export default connect()(App)

export {
  App
}
