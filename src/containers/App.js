import React, { Component, PropTypes } from 'react'
import { propsChanged } from 'helpers/pureFunctions'
import Flex from 'containers/Flex'
import connect from 'helpers/connectAndTheme'

export class App extends Component {
  static propTypes = {
    main: PropTypes.element.isRequired,
    sidebar: PropTypes.element,
    theme: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['main', 'sidebar', 'theme'], this.props, nextProps)
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

export default connect()(App)
