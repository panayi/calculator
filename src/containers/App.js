import React, { Component, PropTypes } from 'react'
import Flex from 'containers/Flex'
import connect from 'helpers/connectAndTheme'
import pureRender from 'helpers/pureRender'

export class App extends Component {
  static propTypes = {
    main: PropTypes.element.isRequired,
    sidebar: PropTypes.element,
    theme: PropTypes.object.isRequired
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

export default connect()(pureRender(App))
